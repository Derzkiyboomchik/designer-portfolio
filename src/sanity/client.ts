import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables or fallback default project ID
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || '';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true, // `true` for fast cached public API responses
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

// Helper function to build Sanity image URLs
export function urlFor(source: any) {
  return builder.image(source);
}
