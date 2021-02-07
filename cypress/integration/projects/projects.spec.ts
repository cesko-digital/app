/// <reference types="cypress" />

import { getMockProjects } from '../../../plugins/gatsby-source-cd-airtable/src/mocks/mock-projects'

describe('Projects', () => {
  it('should successfully load', () => {
    cy.visit('/projekty')
    const projects = getMockProjects()
    cy.getByCy('project').should('have.length', projects.length - 1) // consider the first is highlighted
  })
})
