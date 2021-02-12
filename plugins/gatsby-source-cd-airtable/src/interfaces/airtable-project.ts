export interface AirTableProject {
  id: string
  fields: {
    csName: string
    enName: string
    csSlug: string
    enSlug: string
    csTagline: string
    enTagline: string
    highlighted?: boolean
    tags: string[]
    logoUrl: string
    coverUrl: string
  }
}

export interface AirTableTag {
  id: string
  fields: {
    csName: string
    enName: string
    csSlug: string
    enSlug: string
  }
}
