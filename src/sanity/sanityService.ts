import { sanityClient, urlFor, SANITY_PROJECT_ID } from './client';
import { PORTFOLIO_PROJECTS, type Project } from '../data/portfolioData';

// GROQ query to fetch all portfolio projects from Sanity
const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  subtitle,
  category,
  year,
  aspectRatio,
  aspectRatioLabel,
  mainImage,
  secondaryImages,
  description,
  client,
  tools,
  location,
  featured
}`;

export async function fetchPortfolioProjects(): Promise<Project[]> {
  // If no Sanity Project ID is provided, return local fallback data
  if (!SANITY_PROJECT_ID) {
    console.log('[Sanity] No VITE_SANITY_PROJECT_ID provided, using local portfolio data.');
    return PORTFOLIO_PROJECTS;
  }

  try {
    const sanityData = await sanityClient.fetch(PROJECTS_QUERY);
    
    if (!sanityData || sanityData.length === 0) {
      console.warn('[Sanity] Query returned empty array, falling back to local portfolio data.');
      return PORTFOLIO_PROJECTS;
    }

    // Format Sanity document objects to match Project interface
    return sanityData.map((item: any) => ({
      id: item._id || item.id,
      title: item.title,
      subtitle: item.subtitle || '',
      category: item.category || 'Editorial',
      year: item.year || new Date().getFullYear().toString(),
      aspectRatio: item.aspectRatio || '4/3',
      aspectRatioLabel: item.aspectRatioLabel || '4:3 Landscape',
      imageUrl: item.mainImage ? urlFor(item.mainImage).url() : './projects/project-1.jpg',
      secondaryImages: Array.isArray(item.secondaryImages)
        ? item.secondaryImages.map((img: any) => urlFor(img).url())
        : [],
      description: item.description || '',
      client: item.client || '',
      tools: Array.isArray(item.tools) ? item.tools : [],
      location: item.location || '',
      featured: Boolean(item.featured),
    }));
  } catch (error) {
    console.error('[Sanity] Error fetching from Sanity API, using local fallback:', error);
    return PORTFOLIO_PROJECTS;
  }
}
