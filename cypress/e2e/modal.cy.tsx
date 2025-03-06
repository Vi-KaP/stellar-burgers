/// <reference types="cypress" />
import { SELECTORS } from './selectors';

const TIMEOUTS = {
  MODAL: 15000,
  ORDER_NUMBER: 10000
};

describe('Order test', () => {
  beforeEach(() => {
    // Мокируем запросы
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'sucessOrder.json' }).as(
      'createOrder'
    );

    // Устанавливаем токены для авторизации
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    // Открываем страницу
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.get('body').should('be.visible'); // Ждем загрузки страницы
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Create success order test', () => {
    // Добавляем ингредиенты
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.MAIN_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.SOUCE_INGREDIENTS).contains('Добавить').click();

    // Проверяем, что ингредиенты добавлены в конструктор
    cy.get(SELECTORS.CONSTRUCTOR).should('contain', 'Краторная булка N-200i');
    cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR).should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );

    // Проверяем, что кнопка "Оформить заказ" активна
    cy.get(SELECTORS.ORDER_BUTTON).should('not.be.disabled');

    // Клик на кнопку заказа
    cy.get(SELECTORS.ORDER_BUTTON).click();

    // Ожидаем выполнения запроса на создание заказа
    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

    // Проверка открытия модального окна
    cy.get(SELECTORS.MODAL, { timeout: TIMEOUTS.MODAL }).should('be.visible');

    // Проверка номера заказа
    cy.get(SELECTORS.ORDER_NUMBER, { timeout: TIMEOUTS.ORDER_NUMBER }).should(
      'contain',
      '2128506'
    );

    // Закрываем модальное окно
    cy.get(SELECTORS.CLOSE_ICON).click();
    cy.get(SELECTORS.MODAL).should('not.exist');

    // Проверка очищения конструктора
    cy.get(SELECTORS.CONSTRUCTOR).should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR).should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
});
