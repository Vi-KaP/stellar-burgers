/// <reference types="cypress" />
import { SELECTORS } from './selectors';

describe('Modal window test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.get('body').should('be.visible'); // Ждем загрузки страницы
  });

  // Открытие модального окна при клике на ингредиент в списке
  it('Ingredient modal window is opened', () => {
    cy.get(SELECTORS.MODAL).should('not.exist');
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Краторная булка N-200i').click();
    cy.get(SELECTORS.MODAL).should('exist').and('contain', 'Краторная булка N-200i');
  });

  // Закрытие модального окна при клике на крестик
  it('Ingredient modal window is closed', () => {
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Краторная булка N-200i').click();
    cy.get(SELECTORS.CLOSE_ICON).click();
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  // Закрытие модального окна при клике на оверлей
  it('Ingredient modal window is closed by overlay click', () => {
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Краторная булка N-200i').click();
    cy.get(SELECTORS.MODAL).should('exist');
    cy.get(SELECTORS.OVERLAY).should('exist').click('topRight', { force: true });
    cy.get(SELECTORS.MODAL).should('not.exist');
  });
});