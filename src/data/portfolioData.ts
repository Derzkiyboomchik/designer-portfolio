export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Spatial' | 'Editorial' | 'Typography' | 'Branding' | 'Digital' | 'Product';
  year: string;
  aspectRatio: string; // CSS aspect ratio or class
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
  name: "KRYLOVA ANNA",
  role: "Principal Visual & Spatial Designer",
  location: "Moscow & Saint Petersburg",
  avatarUrl: "./projects/avatar.jpg",
  bio: "Anna Krylova (b. 1996, Moscow) operates at the intersection of architectural minimalism, brand typography, and digital spatial environments. Her practice explores purity of form, structural rhythm, and tactile typography across print and interactive mediums.",
  manifesto: "Purity of form. Generous white space. Functional clarity without compromise.",
  stats: [
    { label: "Projects", value: "48" },
    { label: "Awards", value: "14" },
    { label: "Experience", value: "8+ Yrs" },
    { label: "Location", value: "Moscow" }
  ],
  clients: [
    "Garage Museum of Contemporary Art",
    "Strelka Institute",
    "Bang & Olufsen",
    "Aesop",
    "Acne Studios",
    "Vitra SA"
  ],
  awards: [
    { year: "2025", title: "Russian Design Award — Spatial Category", organization: "Design Center" },
    { year: "2024", title: "TDC New York Certificate of Typographic Excellence", organization: "Type Directors Club" },
    { year: "2023", title: "Red Dot: Best of the Best", organization: "Red Dot Design Museum" },
    { year: "2022", title: "100 Beste Plakate — Winner", organization: "100 Beste Plakate e.V." }
  ],
  services: [
    "Spatial & Exhibition Architecture",
    "Editorial & Monograph Design",
    "Brand System & Typography",
    "Digital Interfaces & Spatial Motion",
    "Creative Direction & Curation"
  ],
  contact: {
    email: "krylova.anna@studio-design.ru",
    phone: "+7 495 892 10 44",
    studio: "Tverskaya St 14, Moscow, Russia",
    instagram: "instagram.com/krylova.anna.studio",
    behance: "behance.net/krylova-anna",
    linkedin: "linkedin.com/in/krylova-anna",
    readcv: "read.cv/krylova.anna"
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
  },
  {
    id: "project-3",
    title: "NEUE FORM",
    subtitle: "Variable Neo-Grotesque Typeface Specimen",
    category: "Typography",
    year: "2024",
    aspectRatio: "1/1",
    aspectRatioLabel: "1:1 Square",
    imageUrl: "./projects/project-3.jpg",
    secondaryImages: [
      "./projects/project-3-a.jpg"
    ],
    description: "A geometric neo-grotesque variable font designed specifically for high-contrast poster layouts and high-density digital displays. Includes 18 weights and comprehensive extended glyphs.",
    client: "Type Foundry",
    tools: ["Glyphs 3", "Python Scripts", "Specimen Poster Print"],
    location: "Moscow, Russia"
  },
  {
    id: "project-4",
    title: "VERTIGO VOID",
    subtitle: "Photographic Study of High-Rise Negative Space",
    category: "Editorial",
    year: "2024",
    aspectRatio: "2/5",
    aspectRatioLabel: "2:5 Tall Vertical",
    imageUrl: "./projects/project-4.jpg",
    secondaryImages: [
      "./projects/project-4-a.jpg"
    ],
    description: "Extensive architectural photography project capturing stark geometric skyward perspectives during peak noon sun.",
    client: "Design Magazine",
    tools: ["Large Format Hasselblad", "Monochrome Processing", "Silver Halide Printing"],
    location: "Moscow, Russia"
  },
  {
    id: "project-5",
    title: "HORIZON SOUND PAVILION",
    subtitle: "Acoustic Reflection Structure",
    category: "Spatial",
    year: "2024",
    aspectRatio: "21/9",
    aspectRatioLabel: "21:9 Wide Panoramic",
    imageUrl: "./projects/project-5.jpg",
    secondaryImages: [
      "./projects/project-5-a.jpg"
    ],
    description: "Temporary installation pavilion engineered for deep listening experiences. Seamless curved birch plywood sound reflectors disperse natural ambient echoes with zero electronic amplification.",
    client: "Vitra Design Museum",
    tools: ["Grasshopper", "Acoustic Simulation", "CNC Timber Milling"],
    location: "Moscow, Russia",
    featured: true
  },
  {
    id: "project-6",
    title: "KINETIC SHADOWS",
    subtitle: "Generative Algorithmic Poster Series",
    category: "Digital",
    year: "2024",
    aspectRatio: "9/16",
    aspectRatioLabel: "9:16 Portrait",
    imageUrl: "./projects/project-6.jpg",
    secondaryImages: [
      "./projects/project-6-a.jpg"
    ],
    description: "Screen printed dynamic posters created via custom real-time GLSL shader algorithms that translate solar elevation data into precise geometric shadow gradients.",
    client: "Art Biennale",
    tools: ["TouchDesigner", "GLSL", "Silkscreen Print", "Pantone Metallic Inks"],
    location: "Moscow, Russia"
  },
  {
    id: "project-7",
    title: "CHRONOS CHRONOGRAPH",
    subtitle: "Minimalist Horology Brand Identity",
    category: "Branding",
    year: "2023",
    aspectRatio: "4/3",
    aspectRatioLabel: "4:3 Landscape",
    imageUrl: "./projects/project-7.jpg",
    secondaryImages: [
      "./projects/project-7-a.jpg"
    ],
    description: "Brand ecosystem, micro-engraving typography, tactile box packaging, and digital flagship portal for an avant-garde independent watchmaker.",
    client: "Chronos Workshop SA",
    tools: ["Figma", "Micro-Typography", "Aluminum Anodizing", "Debossing"],
    location: "Moscow, Russia"
  },
  {
    id: "project-8",
    title: "VOID & STRUCTURE",
    subtitle: "Exhibition Architecture Catalogue",
    category: "Editorial",
    year: "2023",
    aspectRatio: "2/3",
    aspectRatioLabel: "2:3 Portrait",
    imageUrl: "./projects/project-8.jpg",
    secondaryImages: [
      "./projects/project-8-a.jpg"
    ],
    description: "Exhibition design system and accompanying catalog celebrating architectural drawings. Printed on fedrigoni cotton papers.",
    client: "Art Foundation",
    tools: ["InDesign", "Grid Architecture", "Foil Stamping"],
    location: "Saint Petersburg, Russia"
  },
  {
    id: "project-9",
    title: "SILENCE MONOLITH",
    subtitle: "Modular Acoustic Wall Partition System",
    category: "Product",
    year: "2023",
    aspectRatio: "1/3",
    aspectRatioLabel: "1:3 Ultra Tall",
    imageUrl: "./projects/project-9.jpg",
    secondaryImages: [
      "./projects/project-9-a.jpg"
    ],
    description: "Sound-absorbing vertical partitions crafted from recycled high-density felt and hidden magnetic structural connectors for open gallery spaces.",
    client: "Modular Furniture",
    tools: ["SolidWorks", "Acoustic Testing", "Felt Processing"],
    location: "Moscow, Russia"
  },
  {
    id: "project-10",
    title: "ECHO SOUNDSCAPE",
    subtitle: "Spatial Audio Interaction Interface",
    category: "Digital",
    year: "2023",
    aspectRatio: "3/2",
    aspectRatioLabel: "3:2 Landscape",
    imageUrl: "./projects/project-10.jpg",
    secondaryImages: [
      "./projects/project-10-a.jpg"
    ],
    description: "Interactive canvas app and desktop player designed for spatial audio mixing. Uses pure black canvas, ultra-fine 1px vector lines, and fluid haptic feedback.",
    client: "Bang & Olufsen",
    tools: ["Framer", "React", "WebAudio API", "UI Prototyping"],
    location: "Moscow, Russia"
  },
  {
    id: "project-11",
    title: "LUMEN RIG",
    subtitle: "Anodized Aluminum Linear Light System",
    category: "Product",
    year: "2023",
    aspectRatio: "5/3",
    aspectRatioLabel: "5:3 Panoramic",
    imageUrl: "./projects/project-11.jpg",
    secondaryImages: [
      "./projects/project-11-a.jpg"
    ],
    description: "Suspended architectural illumination element engineered from 3-meter seamless extruded aluminum beams with touch-sensitive dimming zones.",
    client: "Belux Lighting",
    tools: ["Industrial Design", "LED Prototyping", "CNC Anodizing"],
    location: "Moscow, Russia"
  },
  {
    id: "project-12",
    title: "APEX OBSERVATORY",
    subtitle: "High-Altitude Celestial Cabin",
    category: "Spatial",
    year: "2022",
    aspectRatio: "3/4",
    aspectRatioLabel: "3:4 Portrait",
    imageUrl: "./projects/project-12.jpg",
    secondaryImages: [
      "./projects/project-12-a.jpg"
    ],
    description: "Extreme environment observatory shell built to withstand winter conditions with minimal environmental footprint.",
    client: "Research Institute",
    tools: ["Parametric Architecture", "Zinc Cladding", "Thermal Modeling"],
    location: "Sochi, Russia"
  }
];
