interface LinkProps {
  locale: string
  translations: {
    projects: string
    czech: string
    english: string
    blog: string
    contribute: string
  }
}

export const getLinks = ({
  locale,
  translations,
}: LinkProps): Array<{ link: string; label: string; locale?: string }> => {
  const { projects, czech, blog, contribute, english } = translations
  const projectsItem = {
    link: '/projects',
    label: projects,
  }

  if (locale === 'en') {
    return [
      projectsItem,
      {
        link: '/',
        locale: 'cs',
        label: czech,
      },
    ]
  }

  return [
    projectsItem,
    {
      link: 'https://blog.cesko.digital',
      label: blog,
    },
    {
      link: '#',
      label: contribute,
    },

    {
      link: '/',
      locale: 'en',
      label: english,
    },
  ]
}
