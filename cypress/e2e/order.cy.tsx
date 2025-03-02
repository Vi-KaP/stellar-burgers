describe('Order test', function () {
  this.beforeEach(function () {
    // Мокируем запросы
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'sucessOrder.json' }).as('createOrder');

    // Устанавливаем токены для авторизации
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');

    // Открываем страницу
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.get('body').should('be.visible'); // Ждем загрузки страницы
  });

  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Create success order test', function () {
    // Добавляем ингредиенты
    cy.get('[data-cy=bun_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=souce_ingredients]').contains('Добавить').click();

    // Проверяем, что кнопка "Оформить заказ" активна
    cy.get('[data-cy=order_button]').should('not.be.disabled');

    // Клик на кнопку заказа
    cy.get('[data-cy=order_button]').click();

    // Ожидаем выполнения запроса на создание заказа
    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

    // Проверка открытия модального окна
    cy.get('[data-cy=modal]', { timeout: 15000 }).should('be.visible');

    // Проверка номера заказа
    cy.get('[data-cy=order_number]', { timeout: 10000 }).contains('2128506').should('exist');

    // Закрываем модальное окно
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    // Проверка очищения конструктора
    cy.get('[data-cy=constructor]').should('not.contain', 'Краторная булка N-200i');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Биокотлета из марсианской Магнолии');
  });
});