import { URL } from "./create-login-file.cy";

describe('Save ingredients to fixture', () => {
  it('Should save ingredients to fixture', function () {
    // Шаг 1: Запрос на получение списка ингредиентов
    cy.request({
      method: 'GET',
      url: `${URL}/ingredients`,
    }).then((response) => {
      // Проверяем статус ответа
      expect(response.status).to.eq(200); 

      // Шаг 2: Формируем данные в нужном формате
      const ingredientsData = {
        success: true,
        data: response.body.data,
      };

      // Шаг 3: Сохранение данных в файл
      cy.writeFile('cypress/fixtures/ingredients.json', ingredientsData);
    });
  });
});