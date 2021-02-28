/// <reference types="cypress" />

describe('Highlighted Project', () => {
  it('should successfully load', () => {
    cy.visit('/projekty')
    cy.getByCy('highlighted-project').should('have.length.at.least', 1)
  })
})
