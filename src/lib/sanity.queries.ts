import { groq } from 'next-sanity';

export const postFields = `
  _id,
  title,
  publishedAt,
  excerpt,
  mainImage,
  slug,
  author->{name, slug, image},
  categories[]->{title, description}
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body,
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body,
  }
`;

export const projectFields = `
  _id,
  title,
  description,
  mainImage,
  technologies,
  liveUrl,
  githubUrl,
  slug,
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    ${projectFields}
  }
`;

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields},
    body,
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
