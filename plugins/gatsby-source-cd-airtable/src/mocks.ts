import { Project, Tag, Volunteer, Event, Partner, Opportunity } from './types'
import { notEmpty } from './utils'
import {
  transformEvent,
  transformPartners,
  transformProjects,
  transformTags,
  transformVolunteers,
  transformOpportunity,
} from './transformers'

import events from '../samples/events.json'
import volunteers from '../samples/volunteers.json'
import partners from '../samples/partners.json'
import tags from '../samples/tags.json'
import projects from '../samples/projects.json'
import opportunities from '../samples/opportunities.json'

export const getMockVolunteers: () => Volunteer[] = () =>
  transformVolunteers(volunteers.records)

export const getMockTags: () => Tag[] = () => transformTags(tags.records)

export const getMockPartners: () => Partner[] = () =>
  transformPartners(partners.records)

export const getMockProjects: () => Project[] = () =>
  transformProjects(projects.records)

export const getMockEvents: () => Event[] = () =>
  events.records.map(transformEvent).filter(notEmpty)

export const getMockOpportunities: () => Opportunity[] = () =>
  opportunities.records.map(transformOpportunity).filter(notEmpty)
