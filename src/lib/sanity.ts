import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
// Fix the API version format to either '1' or exact 'YYYY-MM-DD' format
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  // Use a valid API version
  apiVersion: '2023-05-03',
  useCdn: false, // We'll use the API CDN
  token: process.env.SANITY_API_TOKEN,
});

export const previewClient = createClient({
  projectId,
  dataset,
  // Use a valid API version
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
});

export const getClient = (preview: boolean = false) => (preview ? previewClient : client);

const builder = imageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
