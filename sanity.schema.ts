import { SchemaTypeDefinition } from 'sanity';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      name: 'author',
      title: 'Author',
      type: 'document',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'bio',
          title: 'Bio',
          type: 'array',
          of: [
            {
              title: 'Block',
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
            },
          ],
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
      ],
    },
    {
      name: 'post',
      title: 'Post',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: { type: 'author' },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'mainImage',
          title: 'Main image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [{ type: 'reference', to: { type: 'category' } }],
        },
        {
          name: 'publishedAt',
          title: 'Published at',
          type: 'datetime',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'excerpt',
          title: 'Excerpt',
          type: 'text',
          validation: (Rule) => Rule.max(200),
        },
        {
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [
            {
              title: 'Block',
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [{ title: 'Bullet', value: 'bullet' }],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Code', value: 'code' },
                ],
                annotations: [
                  {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [
                      {
                        title: 'URL',
                        name: 'href',
                        type: 'url',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'image',
              options: { hotspot: true },
            },
            {
              type: 'code',
              title: 'Code Block',
              options: {
                withFilename: true,
              },
            },
          ],
        },
      ],
      preview: {
        select: {
          title: 'title',
          author: 'author.name',
          media: 'mainImage',
        },
        prepare(selection) {
          const { author } = selection;
          return Object.assign({}, selection, {
            subtitle: author && `by ${author}`,
          });
        },
      },
    },
    {
      name: 'project',
      title: 'Project',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'mainImage',
          title: 'Main image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'technologies',
          title: 'Technologies',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'liveUrl',
          title: 'Live URL',
          type: 'url',
        },
        {
          name: 'githubUrl',
          title: 'GitHub URL',
          type: 'url',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [
            {
              title: 'Block',
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [{ title: 'Bullet', value: 'bullet' }],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Code', value: 'code' },
                ],
                annotations: [
                  {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [
                      {
                        title: 'URL',
                        name: 'href',
                        type: 'url',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
  ],
};
