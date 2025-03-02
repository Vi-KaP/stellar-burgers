describe('Create login.json file from API response', () => {
  it('Should create login.json file with data from API', function () {
    // Шаг 1: Выполнение запроса к API
    cy.request({
      method: 'POST',
      url: 'https://norma.nomoreparties.space/api/auth/login',
      body: {
        email: 'test120@mail.ru', 
        password: '1234test' 
      },
      failOnStatusCode: false
    }).then((response) => {
      // Проверка успешного ответа
      expect(response.status).to.eq(200);

      // Шаг 2: Сохранение ответа в файл
      cy.writeFile('cypress/fixtures/login.json', response.body);
    });
  });
});