import { URL } from "./create-login-file.cy"

describe('Save user data to fixture', () => {
  it('Should save user data to fixture', function () {
    // Шаг 1: Авторизация и получение данных пользователя
    cy.request({
      method: 'POST',
      url: `${URL}/auth/login`,
      body: {
        email: 'test120@mail.ru',
        password: '1234test' 
      }
    }).then((response) => {
      // Проверяем, что запрос успешен
      expect(response.status).to.eq(200);

      const userData = {
        success: true,
        user: {
          email: response.body.user.email,
          name: response.body.user.name
        }
      };

      // Сохраняем данные в файл fixtures/userData.json
      cy.writeFile('cypress/fixtures/userData.json', userData);
    });
  });
});
