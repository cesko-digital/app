import {
  Event,
  Maybe,
  Project,
  Tag,
  Volunteer,
} from '../../generated/graphql-types'

export type PortalEvent = { __typename?: 'Event' } & Pick<
  Event,
  | 'competenceMap'
  | 'description'
  | 'endTime'
  | 'id'
  | 'name'
  | 'rowId'
  | 'startTime'
  | 'status'
  | 'summary'
  | 'rsvpUrl'
  | 'slug'
> & {
    project: Maybe<
      { __typename?: 'Project' } & Pick<
        Project,
        'logoUrl' | 'name' | 'id' | 'coverUrl' | 'url' | 'rowId'
      >
    >
    owner: Maybe<
      { __typename?: 'Volunteer' } & Pick<Volunteer, 'id' | 'name' | 'rowId'>
    >
    tags: Maybe<
      Array<
        Maybe<
          { __typename?: 'Tag' } & Pick<
            Tag,
            'id' | 'lang' | 'name' | 'rowId' | 'slug'
          >
        >
      >
    >
  }
