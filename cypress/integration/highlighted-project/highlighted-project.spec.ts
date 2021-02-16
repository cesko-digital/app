/// <reference types="cypress" />

describe('Projects', () => {
  it('should successfully load', () => {
    cy.visit('/projekty')
    cy.getByCy('highlighted-project').should('have.length.at.least', 1)
  })
})
