/// <reference types="cypress" />

describe('Generated Project Page', () => {
  const projectUrls = {
    cs: '/projekty/prvni-projekt',
    en: '/en/projects/first-project',
    incorrect: '/en/projekty/prvni-projekt',
  }

  const pageNotFoundText = 'NOT FOUND'

  it('should successfully load CS project page', () => {
    cy.visit(projectUrls.cs)
      .get('body')
      .should('not.contain.text', pageNotFoundText)
  })

  it('should successfully load EN project page', () =>
    cy
      .visit(projectUrls.en)
      .get('body')
      .should('not.contain.text', pageNotFoundText))

  it('should redirect 404 for mixed page', () => {
    cy.visit(projectUrls.incorrect)
      .get('body')
      .should('contain.text', pageNotFoundText)
  })
})
