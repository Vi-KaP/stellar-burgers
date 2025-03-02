///<reference types="cypress"/>


describe('Constructor page test', function () {
  this.beforeEach(function() {
      cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
      cy.viewport(1300, 800);
      cy.visit('/');
  })
//тест добавления булки в конструктор при клике на кнопку
  it('Test of adding bun', function () {
      cy.get('[data-cy=bun_1_constructor]').contains('Краторная булка N-200i').should('not.exist');
      cy.get('[data-cy=bun_2_constructor]').contains('Краторная булка N-200i').should('not.exist');
      cy.get('[data-cy=bun_ingredients]').contains('Добавить').click();
      cy.get('[data-cy=bun_1_constructor]').contains('Краторная булка N-200i').should('exist');
      cy.get('[data-cy=bun_2_constructor]').contains('Краторная булка N-200i').should('exist');
  })

//тест добавления ингредиентов в конструктор при клике на кнопку
  it('Test of adding main ingredients', function () {
      cy.get('[data-cy=ingredient_constructor]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
      cy.get('[data-cy=ingredient_constructor]').contains('Краторная булка N-200i').should('not.exist');
      cy.get('[data-cy=main_ingredients]').contains('Добавить').click();
      cy.get('[data-cy=ingredient_constructor]').contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.get('[data-cy=souce_ingredients]').contains('Добавить').click();
      cy.get('[data-cy=ingredient_constructor]').contains('Соус Spicy-X').should('exist');
  })
})
