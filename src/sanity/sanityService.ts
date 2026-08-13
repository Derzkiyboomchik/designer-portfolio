import { sanityClient, urlFor, SANITY_PROJECT_ID } from './client';
import { PROFILE_DATA, type Project, type ProfileData } from '../data/portfolioData';

const CACHE_PROJECTS_KEY = 'sanity_cached_projects_v2';
const CACHE_PROFILE_KEY = 'sanity_cached_profile_v2';

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
    return getValidCachedProjects();
  }

  try {
    const sanityData = await sanityClient.fetch(PROJECTS_QUERY);
    
    if (Array.isArray(sanityData) && sanityData.length > 0) {
      const parsedProjects: Project[] = sanityData.map((item: any) => ({
        id: item._id || item.id,
        title: item.title || '',
        subtitle: item.subtitle || '',
        category: item.category || '',
        year: item.year || '',
        aspectRatio: item.aspectRatio || '4:3',
        imageUrl: item.mainImage && item.mainImage.asset ? urlFor(item.mainImage).url() : '',
        secondaryImages: Array.isArray(item.secondaryImages)
          ? item.secondaryImages.map((img: any) => (img && img.asset ? urlFor(img).url() : '')).filter(Boolean)
          : [],
        description: item.description || '',
        client: item.client || '',
        tools: Array.isArray(item.tools) ? item.tools : [],
        location: item.location || '',
        featured: Boolean(item.featured),
      }));

      // Cache real fetched projects to localStorage
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_PROJECTS_KEY, JSON.stringify(parsedProjects));
        }
      } catch (e) {
        console.warn('Could not cache projects to localStorage', e);
      }

      return parsedProjects;
    }

    // If Sanity returned empty array, check if we have previously cached projects
    return getValidCachedProjects();
  } catch (error) {
    console.warn('[Sanity API] Request failed or timed out. Checking local cache...', error);
    return getValidCachedProjects();
  }
}

function getValidCachedProjects(): Project[] {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_PROJECTS_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log('[Sanity] Restored projects from valid local cache:', parsed.length);
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading projects cache:', e);
    }
  }
  // Return empty array if no valid cache exists -> triggers SubwayRunner fallback game!
  return [];
}

export async function fetchProfileData(): Promise<ProfileData> {
  if (!SANITY_PROJECT_ID) {
    return getValidCachedProfile();
  }

  try {
    const data = await sanityClient.fetch(PROFILE_QUERY);
    if (data && typeof data === 'object') {
      const parsedProfile: ProfileData = {
        name: data.name || '',
        role: data.role || '',
        location: data.location || '',
        avatarUrl: data.avatar && data.avatar.asset ? urlFor(data.avatar).url() : '',
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

      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_PROFILE_KEY, JSON.stringify(parsedProfile));
        }
      } catch (e) {
        console.warn('Could not cache profile to localStorage', e);
      }

      return parsedProfile;
    }

    return getValidCachedProfile();
  } catch (error) {
    console.warn('[Sanity API] Profile request failed. Checking local cache...', error);
    return getValidCachedProfile();
  }
}

function getValidCachedProfile(): ProfileData {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_PROFILE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading profile cache:', e);
    }
  }
  return PROFILE_DATA;
}
