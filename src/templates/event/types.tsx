import {
  Event,
  Maybe,
  Project,
  Tag,
  Volunteer,
} from '../../generated/graphql-types'

export type PortalDetailEvent = { __typename?: 'Event' } & Pick<
  Event,
  | 'competenceMap'
  | 'description'
  | 'endTime'
  | 'id'
  | 'name'
  | 'rowId'
  | 'rsvpUrl'
  | 'slug'
  | 'startTime'
  | 'status'
  | 'summary'
  | 'locationTitle'
  | 'locationUrl'
  | 'rsvpTitle'
> & {
    owner: Maybe<
      { __typename?: 'Volunteer' } & Pick<
        Volunteer,
        'id' | 'name' | 'rowId' | 'profilePictureUrl' | 'email'
      >
    >
    project: Maybe<
      { __typename?: 'Project' } & Pick<
        Project,
        | 'coverUrl'
        | 'description'
        | 'finished'
        | 'githubUrl'
        | 'id'
        | 'lang'
        | 'logoUrl'
        | 'name'
        | 'rowId'
        | 'slackChannelName'
        | 'slackChannelUrl'
        | 'slug'
        | 'tagline'
        | 'trelloUrl'
        | 'url'
        | 'silent'
      > & {
          tags: Maybe<
            Array<
              Maybe<
                { __typename?: 'Tag' } & Pick<
                  Tag,
                  'name' | 'rowId' | 'slug' | 'lang' | 'id'
                >
              >
            >
          >
        }
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
