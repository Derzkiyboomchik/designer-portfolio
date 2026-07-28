import React, { useState } from 'react';
import type { Project } from '../data/portfolioData';
import { Maximize2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Map aspect ratio string to CSS aspect ratio property
  const getAspectRatioStyle = (ratioStr: string) => {
    switch (ratioStr) {
      case '3/4': return '3 / 4';
      case '16/9': return '16 / 9';
      case '1/1': return '1 / 1';
      case '2/5': return '2 / 5';
      case '21/9': return '21 / 9';
      case '9/16': return '9 / 16';
      case '4/3': return '4 / 3';
      case '2/3': return '2 / 3';
      case '1/3': return '1 / 3';
      case '3/2': return '3 / 2';
      case '5/3': return '5 / 3';
      default: return '4 / 3';
    }
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
              <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white uppercase">
                {project.category}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-white/80">
                {project.year}
              </span>
            </div>

            {/* Bottom Project Info */}
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-light tracking-tight text-white">
                  {project.title}
                </h3>
                <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <p className="font-sans text-xs text-white/80 line-clamp-1 font-light">
                {project.subtitle}
              </p>

              <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/60 border-t border-white/15">
                <span>{project.client}</span>
                <span className="uppercase">{project.aspectRatioLabel}</span>
              </div>
            </div>

          </div>

          {/* Subtly persistent bottom info line for mobile & non-hover state */}
        </div>

        {/* Minimal Label below card for Swiss clarity */}
        <div className="mt-2.5 flex items-center justify-between text-xs px-0.5">
          <span className="font-serif text-base font-normal tracking-tight text-[#111] dark:text-[#eee] group-hover:opacity-75 transition-opacity">
            {project.title}
          </span>
          <span className="font-mono text-[10px] text-[#777] dark:text-[#888] tracking-widest uppercase">
            {project.category} • {project.year}
          </span>
        </div>

      </div>
    </div>
  );
};
