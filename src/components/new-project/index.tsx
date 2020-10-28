import React from 'react'

export interface NewProjectProps {
  name: string
  description: string
  icon: string
  linkToSlack: string
}

export const NewProject: React.FC<NewProjectProps> = ({
  name,
  description,
  icon,
  linkToSlack,
}: NewProjectProps) => (
  <div>
    <span>{name}</span>
    <span>{description}</span>
    <span>{icon}</span>
    <span>{linkToSlack}</span>
  </div>
)
