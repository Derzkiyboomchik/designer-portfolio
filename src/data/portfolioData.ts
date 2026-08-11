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
  name: "Крылова Анна",
  role: "Principal Visual & Spatial Designer",
  location: "Moscow & Saint Petersburg",
  avatarUrl: "./projects/avatar.jpg",
  bio: "Anna Krylova (b. 1996, Moscow) operates at the intersection of architectural minimalism, brand typography, and digital spatial environments. Her practice explores purity of form, structural rhythm, and tactile typography across print and interactive mediums.",
  manifesto: "Purity of form. Generous white space. Functional clarity without compromise.",
  stats: [],
  clients: [],
  awards: [],
  services: [],
  contact: {
    email: "annadesint@gmail.com",
    phone: "",
    studio: "",
    instagram: "",
    behance: "",
    linkedin: "",
    readcv: "",
    telegram: ""
  }
};

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "MONOLITH",
    subtitle: "Architectural Monographs of Brutalist Facades",
    category: "Editorial",
    year: "2025",
    aspectRatio: "3/4",
    aspectRatioLabel: "3:4 Portrait",
    imageUrl: "./projects/project-1.jpg",
    secondaryImages: [
      "./projects/project-1-a.jpg",
      "./projects/project-1-b.jpg"
    ],
    description: "A 320-page hardcover publication investigating post-war Brutalist architectural landmarks. Features custom grid system, blind debossed cloth cover, and high-density silver ink on uncoated cotton paper.",
    client: "Museum of Modern Art",
    tools: ["InDesign", "Glyphs", "Paper Prototyping", "Specialty Lithography"],
    location: "Moscow, Russia",
    featured: true
  },
  {
    id: "project-2",
    title: "SERENE SPACES",
    subtitle: "Aesop Flagship Retail Pavilion",
    category: "Spatial",
    year: "2025",
    aspectRatio: "16/9",
    aspectRatioLabel: "16:9 Landscape",
    imageUrl: "./projects/project-2.jpg",
    secondaryImages: [
      "./projects/project-2-a.jpg"
    ],
    description: "Spatial direction and tactile interior elements for Aesop's flagship retail store. Utilizing raw quartz, bead-blasted stainless steel, and warm linear lighting to create a meditative sanctuary.",
    client: "Aesop Retail",
    tools: ["AutoCAD", "Rhino 3D", "Material Research", "Lighting Design"],
    location: "Saint Petersburg, Russia",
    featured: true
  }
];
