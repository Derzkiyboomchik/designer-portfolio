import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MasonryGrid } from './components/MasonryGrid';
import { ProfileDrawer } from './components/ProfileDrawer';
import { LightboxModal } from './components/LightboxModal';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { SubwayRunner } from './components/SubwayRunner';
import { PROFILE_DATA, type Project, type ProfileData } from './data/portfolioData';
import { fetchPortfolioProjects, fetchProfileData } from './sanity/sanityService';

export function App() {
  // Theme state defaulting to Dark Mode for high contrast aesthetic
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('swiss_portfolio_theme');
      if (saved !== null) return saved === 'dark';
    }
    return true;
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<ProfileData>(PROFILE_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync dark mode class on HTML document element and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('swiss_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('swiss_portfolio_theme', 'light');
    }
  }, [darkMode]);

  // Fetch portfolio projects and designer profile from Sanity Public API
  useEffect(() => {
    let isMounted = true;
    
    Promise.all([fetchPortfolioProjects(), fetchProfileData()])
      .then(([fetchedProjects, fetchedProfile]) => {
        if (isMounted) {
          setProjects(fetchedProjects);
          setProfile(fetchedProfile);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load data from Sanity:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0E0E10] text-[#111111] dark:text-[#F3F3F3] transition-colors duration-300 flex flex-col font-sans relative selection:bg-[#111] selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* Show Header ONLY when projects exist in Sanity */}
      {projects.length > 0 && (
        <Header
          profile={profile}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {isLoading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto opacity-40"></div>
            <p className="font-mono text-xs text-[#888] uppercase tracking-widest">
              CONNECTING TO SANITY...
            </p>
          </div>
        ) : projects.length > 0 ? (
          <MasonryGrid
            projects={projects}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        ) : (
          /* Render Pixel Art Game when Sanity has 0 projects */
          <SubwayRunner />
        )}
      </main>

      {/* Clean Minimal Footer */}
      <Footer />

      {/* Slide-out Sidebar Drawer */}
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        profile={profile}
      />

      {/* Lightbox Modal */}
      {selectedProject && (
        <LightboxModal
          project={selectedProject}
          allProjects={projects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      )}

      {/* Theme Toggle Button (Fixed Bottom Right) */}
      <ThemeToggle
        darkMode={darkMode}
        onToggle={toggleTheme}
      />

    </div>
  );
}

export default App;
