/// <reference types="cypress" />

describe('Header', () => {
  describe('cs', () => {
    before(() => {
      cy.visit('/')
    })

    it('should contain link to homepage', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/"]')
      })
    })

    it('should contain link to projects page', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/projekty"]')
      })
    })
  })
})
