import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity.schema';

export default defineConfig({
  name: 'default',
  title: 'Osama Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [visionTool()],
  schema,
  basePath: '/studio',
});
