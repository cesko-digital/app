/// <reference types="cypress" />

import { getMockProjects } from '../../../plugins/gatsby-source-cd-airtable/src/mocks/mock-projects'

describe('Projects', () => {
  it('should successfully load', () => {
    cy.visit('/projects')
    const projects = getMockProjects()
    cy.getByCy('project').each(($project, i) => {
      cy.wrap($project)
        .getByCy('project__name')
        .should('contain.text', projects[i].name)
        .getByCy('project__tagline')
        .should(
          projects[i].tagline === null ? 'be.empty' : 'contain.text',
          projects[i].tagline
        )
    })
  })
})
