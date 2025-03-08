/// <reference types="cypress" />
import { SELECTORS } from './selectors';

describe('Modal window test', function () {
  this.beforeEach(function () {
    // Мокируем запрос на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    // Устанавливаем размер окна и открываем страницу
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  // Открытие модального окна при клике на ингредиент в списке
  it('Ingredient modal window is opened', function () {
    // Проверяем, что модальное окно изначально отсутствует
    cy.get(SELECTORS.MODAL).should('not.exist');

    // Кликаем на ингредиент и проверяем, что модальное окно открылось
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Краторная булка N-200i').click();
    cy.get(SELECTORS.MODAL).contains('Краторная булка N-200i').should('exist');
  });

  // Закрытие модального окна при клике на крестик
  it('Ingredient modal window is closed', function () {
    // Открываем модальное окно
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Краторная булка N-200i').click();

    // Закрываем модальное окно и проверяем, что оно исчезло
    cy.get(SELECTORS.CLOSE_ICON).click();
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  // Закрытие модального окна при клике на оверлей
  it('Ingredient modal window is closed by overlay click', function () {
    // Открываем модальное окно
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Краторная булка N-200i').click();

    // Проверяем, что модальное окно и оверлей существуют
    cy.get(SELECTORS.MODAL).should('exist');
    cy.get(SELECTORS.OVERLAY).should('exist');

    // Кликаем на оверлей и проверяем, что модальное окно закрылось
    cy.get(SELECTORS.OVERLAY).click('topRight', { force: true });
    cy.get(SELECTORS.MODAL).should('not.exist');
  });
});