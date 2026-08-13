import { sanityClient, urlFor, SANITY_PROJECT_ID } from './client';
import { PROFILE_DATA, PORTFOLIO_PROJECTS, type Project, type ProfileData } from '../data/portfolioData';

// GROQ query to fetch all portfolio projects from Sanity
const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  subtitle,
  category,
  year,
  aspectRatio,
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
  email,
  phone,
  studioAddress,
  instagram,
  telegram,
  services,
  clients,
  awards
}`;

export async function fetchPortfolioProjects(): Promise<Project[]> {
  if (!SANITY_PROJECT_ID) {
    return PORTFOLIO_PROJECTS;
  }

  try {
    const sanityData = await sanityClient.fetch(PROJECTS_QUERY);
    
    if (!sanityData || sanityData.length === 0) {
      console.log('[Sanity] Projects query returned 0 documents.');
      return [];
    }

    return sanityData.map((item: any) => ({
      id: item._id || item.id,
      title: item.title || '',
      subtitle: item.subtitle || '',
      category: item.category || '',
      year: item.year || '',
      aspectRatio: item.aspectRatio || '4/3',
      imageUrl: item.mainImage ? urlFor(item.mainImage).url() : '',
      secondaryImages: Array.isArray(item.secondaryImages)
        ? item.secondaryImages.map((img: any) => urlFor(img).url()).filter(Boolean)
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
      name: data.name || '',
      role: data.role || '',
      location: data.location || '',
      avatarUrl: data.avatar ? urlFor(data.avatar).url() : '',
      bio: data.bio || '',
      manifesto: data.manifesto || '',
      stats: [],
      services: Array.isArray(data.services) ? data.services : [],
      clients: Array.isArray(data.clients) ? data.clients : [],
      awards: Array.isArray(data.awards) 
        ? data.awards.map((a: any) => ({
            year: a.year || '',
            title: a.title || '',
            organization: a.organization || '',
          })) 
        : [],
      contact: {
        email: data.email || '',
        phone: data.phone || '',
        studio: data.studioAddress || '',
        instagram: data.instagram || '',
        behance: '',
        linkedin: '',
        readcv: '',
        telegram: data.telegram || '',
      },
    };
  } catch (error) {
    console.error('[Sanity] Error fetching profile from Sanity API:', error);
    return PROFILE_DATA;
  }
}
