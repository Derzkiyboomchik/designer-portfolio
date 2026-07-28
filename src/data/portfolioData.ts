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
  };
}

export const PROFILE_DATA: ProfileData = {
  name: "ELENA VANCE",
  role: "Principal Visual & Spatial Designer",
  location: "Zurich & Paris",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  bio: "Elena Vance (b. 1994, Zurich) operates at the intersection of architectural minimalism, brand typography, and digital spatial environments. Former Senior Art Director at Studio Müller, her practice explores purity of form, structural rhythm, and tactile typography across print and interactive mediums.",
  manifesto: "Purity of form. Generous white space. Functional clarity without compromise.",
  stats: [
    { label: "Projects", value: "48" },
    { label: "Awards", value: "14" },
    { label: "Experience", value: "8+ Yrs" },
    { label: "Location", value: "Zurich" }
  ],
  clients: [
    "Vitra",
    "Le Corbusier Foundation",
    "Bang & Olufsen",
    "Neue Zürcher Zeitung",
    "Aesop",
    "Acne Studios",
    "Pro Helvetia"
  ],
  awards: [
    { year: "2025", title: "Swiss Design Award — Spatial Category", organization: "Federal Office of Culture" },
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
    email: "elena.vance@studio-swiss.ch",
    phone: "+41 44 892 10 44",
    studio: "Gotthardstrasse 26, 8002 Zürich, Switzerland",
    instagram: "instagram.com/elena.vance.studio",
    behance: "behance.net/elena-vance",
    linkedin: "linkedin.com/in/elena-vance",
    readcv: "read.cv/elena.vance"
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
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "A 320-page hardcover publication investigating post-war Brutalist architectural landmarks across Basel and Zurich. Features custom grid system, blind debossed cloth cover, and high-density silver ink on uncoated cotton paper.",
    client: "Kunsthalle Zurich",
    tools: ["InDesign", "Glyphs", "Paper Prototyping", "Specialty Lithography"],
    location: "Zurich, Switzerland",
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
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85"
    ],
    description: "Spatial direction and tactile interior elements for Aesop's retail concept store in Geneva. Utilizing raw Swiss Valser quartz, bead-blasted stainless steel, and warm linear lighting to create a meditative sanctuary.",
    client: "Aesop Switzerland",
    tools: ["AutoCAD", "Rhino 3D", "Material Research", "Lighting Design"],
    location: "Geneva, Switzerland",
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
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "A geometric neo-grotesque variable font designed specifically for high-contrast Swiss poster layouts and high-density digital displays. Includes 18 weights and comprehensive extended Latin glyphs.",
    client: "Niggli Type Foundry",
    tools: ["Glyphs 3", "Python Scripts", "Specimen Poster Print"],
    location: "Basel, Switzerland"
  },
  {
    id: "project-4",
    title: "VERTIGO VOID",
    subtitle: "Photographic Study of High-Rise Negative Space",
    category: "Editorial",
    year: "2024",
    aspectRatio: "2/5",
    aspectRatioLabel: "2:5 Tall Vertical",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Extensive architectural photography project capturing the stark geometric skyward perspectives in Zurich's financial core during peak noon sun.",
    client: "NZZ Folio Magazine",
    tools: ["Large Format Hasselblad", "Monochrome Processing", "Silver Halide Printing"],
    location: "Zurich, Switzerland"
  },
  {
    id: "project-5",
    title: "HORIZON SOUND PAVILION",
    subtitle: "Acoustic Reflection Structure on Vitra Campus",
    category: "Spatial",
    year: "2024",
    aspectRatio: "21/9",
    aspectRatioLabel: "21:9 Wide Panoramic",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
    ],
    description: "Temporary installation pavilion engineered for deep listening experiences. Seamless curved birch plywood sound reflectors disperse natural ambient echoes with zero electronic amplification.",
    client: "Vitra Design Museum",
    tools: ["Grasshopper", "Acoustic Simulation", "CNC Timber Milling"],
    location: "Weil am Rhein, Germany",
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
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Screen printed dynamic posters created via custom real-time GLSL shader algorithms that translate solar elevation data into precise geometric shadow gradients.",
    client: "Art Basel",
    tools: ["TouchDesigner", "GLSL", "Silkscreen Print", "Pantone Metallic Inks"],
    location: "Basel, Switzerland"
  },
  {
    id: "project-7",
    title: "CHRONOS CHRONOGRAPH",
    subtitle: "Minimalist Horology Brand Identity",
    category: "Branding",
    year: "2023",
    aspectRatio: "4/3",
    aspectRatioLabel: "4:3 Landscape",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Brand ecosystem, micro-engraving typography, tactile box packaging, and digital flagship portal for an avant-garde independent Swiss watchmaker.",
    client: "Chronos Workshop SA",
    tools: ["Figma", "Micro-Typography", "Aluminum Anodizing", "Debossing"],
    location: "La Chaux-de-Fonds, Switzerland"
  },
  {
    id: "project-8",
    title: "VOID & STRUCTURE",
    subtitle: "Le Corbusier Exhibition Catalogue",
    category: "Editorial",
    year: "2023",
    aspectRatio: "2/3",
    aspectRatioLabel: "2:3 Portrait",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Exhibition design system and accompanying catalog celebrating 100 years of Le Corbusier's architectural drawings. Printed on Swiss fedrigoni cotton papers.",
    client: "Le Corbusier Foundation",
    tools: ["InDesign", "Grid Architecture", "Foil Stamping"],
    location: "Paris, France"
  },
  {
    id: "project-9",
    title: "SILENCE MONOLITH",
    subtitle: "Modular Acoustic Wall Partition System",
    category: "Product",
    year: "2023",
    aspectRatio: "1/3",
    aspectRatioLabel: "1:3 Ultra Tall",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85"
    ],
    description: "Sound-absorbing vertical partitions crafted from recycled high-density Swiss felt and hidden magnetic structural connectors for open gallery spaces.",
    client: "USM Modular Furniture",
    tools: ["SolidWorks", "Acoustic Testing", "Felt Processing"],
    location: "Bern, Switzerland"
  },
  {
    id: "project-10",
    title: "ECHO SOUNDSCAPE",
    subtitle: "Spatial Audio Interaction Interface",
    category: "Digital",
    year: "2023",
    aspectRatio: "3/2",
    aspectRatioLabel: "3:2 Landscape",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Interactive canvas app and desktop player designed for spatial audio mixing. Uses pure black canvas, ultra-fine 1px vector lines, and fluid haptic feedback.",
    client: "Bang & Olufsen",
    tools: ["Framer", "React", "WebAudio API", "UI Prototyping"],
    location: "Copenhagen, Denmark"
  },
  {
    id: "project-11",
    title: "LUMEN RIG",
    subtitle: "Anodized Aluminum Linear Light System",
    category: "Product",
    year: "2023",
    aspectRatio: "5/3",
    aspectRatioLabel: "5:3 Panoramic",
    imageUrl: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1400&q=85"
    ],
    description: "Suspended architectural illumination element engineered from 3-meter seamless extruded aluminum beams with touch-sensitive dimming zones.",
    client: "Belux Lighting",
    tools: ["Industrial Design", "LED Prototyping", "CNC Anodizing"],
    location: "Zurich, Switzerland"
  },
  {
    id: "project-12",
    title: "APEX OBSERVATORY",
    subtitle: "High-Altitude Celestial Cabin",
    category: "Spatial",
    year: "2022",
    aspectRatio: "3/4",
    aspectRatioLabel: "3:4 Portrait",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Extreme environment observatory shell in the Engadin valley, built to withstand alpine winter conditions with minimal environmental footprint.",
    client: "Alpine Research Institute",
    tools: ["Parametric Architecture", "Zinc Cladding", "Thermal Modeling"],
    location: "St. Moritz, Switzerland"
  }
];
