/// <reference types="cypress" />

describe('Generated Project Page', () => {
  const projectUrls = {
    cs: '/projekty/prvni-projekt',
    incorrect: '/en/projekty/prvni-projekt',
  }

  const pageNotFoundText = '404'

  it('should successfully load CS project page', () => {
    cy.visit(projectUrls.cs)
      .get('body')
      .should('not.contain.text', pageNotFoundText)
  })

  it('should redirect 404 for mixed page', () => {
    cy.visit(projectUrls.incorrect)
      .get('body')
      .should('contain.text', pageNotFoundText)
  })
})
