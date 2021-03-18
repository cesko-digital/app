/// <reference types="cypress" />

// cy.intercept('POST', '/api/newsletter').as('newsletter-submit')

describe('Newsletter', () => {
  describe('cs', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should not submit invalid value', () => {
      cy.get('footer form').within(() => {
        cy.get('input').type('invalid email').type('{enter}')
        cy.get("[data-test-id='newsletter-submit-error']").should('be.visible')
      })
    })

    it('should display error message if the API call fails', () => {
      cy.intercept('newsletter', {
        statusCode: 500,
      })

      cy.get('footer form').within(() => {
        cy.get('input').type('test@cesko.digital').type('{enter}')
        cy.get("[data-test-id='newsletter-submit-error']").should('be.visible')
      })
    })

    it.only('should display confirm message if the API succeeds', () => {
      cy.intercept('newsletter', {
        statusCode: 200,
      }).as('newsletter-submit')

      cy.get('footer form').within(() => {
        cy.get('input').type('test@cesko.digital').type('{enter}')
      })

      cy.wait('@newsletter-submit')
      cy.get("[data-test-id='newsletter-submit-success']").should('be.visible')
    })
  })
})
