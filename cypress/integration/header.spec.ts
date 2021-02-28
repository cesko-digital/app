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

    it('should contain link to english version', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/en"]')
      })
    })
  })

  describe('en', () => {
    before(() => {
      cy.visit('/en')
    })

    it('should contain link to homepage', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/en"]')
      })
    })

    it('should contain link to projects page', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/en/projects"]')
      })
    })

    it('should contain link to czech version', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/"]')
      })
    })
  })
})
