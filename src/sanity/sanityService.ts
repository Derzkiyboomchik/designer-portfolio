import { sanityClient, urlFor, SANITY_PROJECT_ID } from './client';
import { PROFILE_DATA, type Project, type ProfileData } from '../data/portfolioData';

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

// GROQ query to fetch single profile document from Sanity
const PROFILE_QUERY = `*[_type == "profile"][0] {
  name,
  role,
  location,
  avatar,
  bio,
  manifesto,
  email
}`;

export async function fetchPortfolioProjects(): Promise<Project[]> {
  if (!SANITY_PROJECT_ID) {
    return [];
  }

  try {
    const sanityData = await sanityClient.fetch(PROJECTS_QUERY);
    
    if (!sanityData || sanityData.length === 0) {
      console.log('[Sanity] Projects query returned empty array (0 documents).');
      return [];
    }

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
    console.error('[Sanity] Error fetching projects from Sanity API:', error);
    return [];
  }
}

export async function fetchProfileData(): Promise<ProfileData> {
  if (!SANITY_PROJECT_ID) {
    return PROFILE_DATA;
  }

  try {
    const data = await sanityClient.fetch(PROFILE_QUERY);
    if (!data) return PROFILE_DATA;

    return {
      ...PROFILE_DATA,
      name: data.name || PROFILE_DATA.name,
      role: data.role || PROFILE_DATA.role,
      location: data.location || PROFILE_DATA.location,
      avatarUrl: data.avatar ? urlFor(data.avatar).url() : PROFILE_DATA.avatarUrl,
      bio: data.bio || PROFILE_DATA.bio,
      manifesto: data.manifesto || PROFILE_DATA.manifesto,
      contact: {
        ...PROFILE_DATA.contact,
        email: data.email || PROFILE_DATA.contact.email,
      },
    };
  } catch (error) {
    console.error('[Sanity] Error fetching profile from Sanity API:', error);
    return PROFILE_DATA;
  }
}
