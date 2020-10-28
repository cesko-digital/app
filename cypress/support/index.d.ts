// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getByCy('heading')
     */
    getByCy(value: string): Chainable<Element>
  }
}
