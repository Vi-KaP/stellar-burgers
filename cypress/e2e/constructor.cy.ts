/// <reference types="cypress" />
import { SELECTORS } from './selectors';

describe('Constructor page test', () => {
  beforeEach(() => {
    // Мокируем запрос на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  // Тест добавления булки в конструктор при клике на кнопку
  it('Test of adding bun', () => {
    // Проверяем, что булки изначально отсутствуют в конструкторе
    cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR).should(
      'not.contain',
      'Краторная булка N-200i'
    );

    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Добавить').click();

    // Проверяем, что булки добавлены в конструктор
    [SELECTORS.BUN_1_CONSTRUCTOR, SELECTORS.BUN_2_CONSTRUCTOR].forEach(
      (selector) => {
        cy.get(selector).should('contain', 'Краторная булка N-200i');
      }
    );
  });

  // Тест добавления ингредиентов в конструктор при клике на кнопку
  it('Test of adding main ingredients', () => {
    // Проверяем, что ингредиенты изначально отсутствуют в конструкторе
    cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR).should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR).should(
      'not.contain',
      'Соус Spicy-X'
    );

    cy.get(SELECTORS.MAIN_INGREDIENTS).contains('Добавить').click();

    // Проверяем, что основной ингредиент добавлен в конструктор
    cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR).should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );

    cy.get(SELECTORS.SOUCE_INGREDIENTS).contains('Добавить').click();

    // Проверяем, что соус добавлен в конструктор
    cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR).should('contain', 'Соус Spicy-X');
  });
});
