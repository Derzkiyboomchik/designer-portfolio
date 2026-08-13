import React, { useState } from 'react';
import type { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Hybrid parser for aspect ratios: supports 16/9, 16:9, 4/3, 4:3, 1/1, custom ratios
  const getAspectRatioStyle = (ratioStr?: string) => {
    if (!ratioStr) return '4 / 3';
    const normalized = ratioStr.replace(':', '/').trim();
    if (normalized.includes('/')) {
      const [w, h] = normalized.split('/');
      if (w && h && !isNaN(Number(w)) && !isNaN(Number(h))) {
        return `${w.trim()} / ${h.trim()}`;
      }
    }
    return normalized || '4 / 3';
  };

  return (
    <div className="mb-6 break-inside-avoid">
      {/* Outer static container: preserves exact dimension in masonry flow */}
      <div 
        onClick={() => onSelect(project)}
        className="group relative cursor-pointer select-none rounded-sm overflow-visible"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(project);
          }
        }}
      >
        {/* Inner Card that scales smoothly without reflowing parent layout */}
        <div 
          className="relative w-full rounded-sm overflow-hidden bg-[#EFEFEF] dark:bg-[#18181B] border border-[#111111]/10 dark:border-white/10 transition-all duration-300 ease-out group-hover:scale-[1.035] group-hover:z-20 hover-glow-card"
          style={{ aspectRatio: getAspectRatioStyle(project.aspectRatio) }}
        >
          {/* Skeleton Loader placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent animate-pulse" />
          )}

          {/* Project Portfolio Image */}
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Monochromatic Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
            
            {/* Top Row Badges */}
            <div className="flex items-center justify-between transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {project.category && (
                <span className="text-[10px] font-sans tracking-wider px-2.5 py-1 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white uppercase">
                  {project.category}
                </span>
              )}
              {project.year && (
                <span className="text-[10px] font-mono tracking-widest text-white/80">
                  {project.year}
                </span>
              )}
            </div>

            {/* Bottom Project Info */}
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
              <h3 className="font-serif text-2xl font-light tracking-tight text-white">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="font-sans text-xs text-white/80 line-clamp-1 font-light">
                  {project.subtitle}
                </p>
              )}

              {project.client && (
                <div className="pt-2 flex items-center justify-between text-[10px] font-sans text-white/60 border-t border-white/15">
                  <span>{project.client}</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Minimal Label below card */}
        <div className="mt-2.5 flex items-center justify-between text-xs px-0.5">
          <span className="font-serif text-base font-normal tracking-tight text-[#111] dark:text-[#eee] group-hover:opacity-75 transition-opacity">
            {project.title}
          </span>
          {(project.category || project.year) && (
            <span className="font-sans text-[10px] text-[#777] dark:text-[#888] tracking-wider uppercase">
              {project.category}{project.category && project.year ? ' • ' : ''}{project.year}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
