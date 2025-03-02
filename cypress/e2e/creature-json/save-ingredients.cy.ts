describe('Save ingredients to fixture', () => {
  it('Should save ingredients to fixture', function () {
    // Шаг 1: Запрос на получение списка ингредиентов
    cy.request({
      method: 'GET',
      url: 'https://norma.nomoreparties.space/api/ingredients', // Убедитесь, что это правильный эндпоинт
    }).then((response) => {
      // Проверяем статус ответа
      expect(response.status).to.eq(200); // Убедитесь, что запрос успешен

      // Шаг 2: Формируем данные в нужном формате
      const ingredientsData = {
        success: true,
        data: response.body.data, // Предполагаем, что API возвращает данные в поле `data`
      };

      // Шаг 3: Сохранение данных в файл
      cy.writeFile('cypress/fixtures/ingredients.json', ingredientsData);
    });
  });
});