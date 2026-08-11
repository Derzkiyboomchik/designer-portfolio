export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Spatial' | 'Editorial' | 'Typography' | 'Branding' | 'Digital' | 'Product' | string;
  year: string;
  aspectRatio: string;
  aspectRatioLabel: string;
  imageUrl: string;
  secondaryImages?: string[];
  description: string;
  client: string;
  tools: string[];
  location: string;
  featured?: boolean;
}

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  bio: string;
  manifesto: string;
  stats: { label: string; value: string }[];
  clients: string[];
  awards: { year: string; title: string; organization: string }[];
  services: string[];
  contact: {
    email: string;
    phone: string;
    studio: string;
    instagram: string;
    behance: string;
    linkedin: string;
    readcv: string;
    telegram?: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: "",
  role: "",
  location: "",
  avatarUrl: "",
  bio: "",
  manifesto: "",
  stats: [],
  clients: [],
  awards: [],
  services: [],
  contact: {
    email: "",
    phone: "",
    studio: "",
    instagram: "",
    behance: "",
    linkedin: "",
    readcv: "",
    telegram: ""
  }
};

export const PORTFOLIO_PROJECTS: Project[] = [];
