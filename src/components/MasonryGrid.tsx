import React from 'react';
import type { Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

interface MasonryGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ projects, onSelectProject }) => {
  if (projects.length === 0) {
    return (
      <div className="py-24 text-center space-y-4">
        <p className="font-serif text-2xl font-light text-[#777] dark:text-[#888]">
          Проекты не найдены.
        </p>
        <p className="font-sans text-xs text-[#999] uppercase tracking-wider">
          Добавьте проекты через Sanity Studio.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Responsive CSS Masonry Column Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
