import groq from 'groq'

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    slug,
    category,
    subtitle,
    year,
    role,
    tools,
    tags,
    featured,
    cover,
    sections,
    galleryGroups
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc){
    _id,
    title,
    slug,
    category,
    subtitle,
    year,
    role,
    tools,
    tags,
    featured,
    cover
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    category,
    subtitle,
    year,
    role,
    tools,
    tags,
    featured,
    cover,
    sections[]{
      heading,
      body
    },
    galleryGroups[]{
      title,
      images[]{
        asset,
        alt
      }
    }
  }
`