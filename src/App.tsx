import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MasonryGrid } from './components/MasonryGrid';
import { ProfileDrawer } from './components/ProfileDrawer';
import { LightboxModal } from './components/LightboxModal';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { PORTFOLIO_PROJECTS, type Project } from './data/portfolioData';

export function App() {
  // Theme state defaulting to Dark Mode for high contrast aesthetic
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('swiss_portfolio_theme');
      if (saved !== null) return saved === 'dark';
    }
    return true;
  });

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

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0E0E10] text-[#111111] dark:text-[#F3F3F3] transition-colors duration-300 flex flex-col font-sans relative selection:bg-[#111] selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* Simplified Top Header Row */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Main Content Masonry Grid */}
      <main className="flex-1">
        <MasonryGrid
          projects={PORTFOLIO_PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      </main>

      {/* Footer with Live Clock */}
      <Footer />

      {/* Slide-out Sidebar Drawer for Profile & Contract PDF */}
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Lightbox Modal for Grid Item Details */}
      <LightboxModal
        project={selectedProject}
        allProjects={PORTFOLIO_PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Theme Toggle Button (Fixed Bottom Right) */}
      <ThemeToggle
        darkMode={darkMode}
        onToggle={toggleTheme}
      />

    </div>
  );
}

export default App;
