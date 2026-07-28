import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/portfolioData';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Wrench, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectProject
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [project]);

  // Handle Keyboard Navigation
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, allProjects, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allProjects.length;
    onSelectProject(allProjects[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allProjects.length) % allProjects.length;
    onSelectProject(allProjects[prevIdx]);
  };

  const allImages = [project.imageUrl, ...(project.secondaryImages || [])];
  const currentImage = allImages[activeImageIndex] || project.imageUrl;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
          
          {/* Heavy Backdrop Blur Overlay (Frosted Glass Effect) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-xl"
          />

          {/* Top Right Close Button */}
          <button
            onClick={onClose}
            className="fixed top-5 right-5 z-50 p-3 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-white/40 dark:hover:bg-white/20 transition-all shadow-lg group"
            aria-label="Close project view"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md text-white border border-white/15 hover:bg-white/30 transition-all hidden md:block"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md text-white border border-white/15 hover:bg-white/30 transition-all hidden md:block"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Modal Content Box (70-80% Viewport Width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-40 w-full max-w-5xl bg-[#FAFAFA] dark:bg-[#121214] text-[#111111] dark:text-[#F3F3F3] border border-[#E5E5E5] dark:border-[#222225] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            
            {/* Scrollable Container for Image + Content */}
            <div className="overflow-y-auto max-h-[92vh] p-4 sm:p-8 space-y-6">
              
              {/* Top Image Viewer Section */}
              <div className="relative group bg-[#EFEFEF] dark:bg-[#0A0A0B] rounded-lg overflow-hidden flex items-center justify-center min-h-[300px] max-h-[65vh]">
                <img
                  src={currentImage}
                  alt={project.title}
                  className={`object-contain transition-all duration-500 max-h-[62vh] w-auto ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Aspect Ratio Badge & Zoom Toggle */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/40 text-white backdrop-blur-md rounded-full border border-white/20">
                    {project.aspectRatioLabel}
                  </span>
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 hover:bg-black/60 transition-colors"
                    title={isZoomed ? 'Zoom out' : 'Zoom in'}
                  >
                    {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Multiple Images Gallery Switcher */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          activeImageIndex === idx ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`View thumbnail ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Detailed Project Text Block (Serif Title, Sans-Serif Body) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
                
                {/* Main Text Details (Left 2 Columns) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono tracking-widest uppercase text-blue-600 dark:text-blue-400">
                      {project.category}
                    </span>
                    <span className="text-[#CCC] dark:text-[#333]">|</span>
                    <span className="text-xs font-mono text-[#777] dark:text-[#888]">
                      PROJECT N° {project.id.replace('project-', '0')}
                    </span>
                  </div>

                  {/* Title in Elegant Serif Font */}
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#111] dark:text-white">
                    {project.title}
                  </h2>

                  <p className="font-sans text-base text-[#444] dark:text-[#bbb] font-light leading-relaxed">
                    {project.subtitle}
                  </p>

                  <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#222225]">
                    <p className="font-sans text-sm text-[#333] dark:text-[#ccc] leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Metadata Sidebar (Right 1 Column) */}
                <div className="space-y-4 p-5 rounded-lg border border-[#E5E5E5] dark:border-[#222225] bg-[#F4F4F4] dark:bg-[#18181C]">
                  <h3 className="font-mono text-xs tracking-widest uppercase text-[#777] dark:text-[#888] border-b border-[#E5E5E5] dark:border-[#28282E] pb-2">
                    SPECIFICATIONS
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-[#777] dark:text-[#888] uppercase block">
                        CLIENT / COMMISSIONER
                      </span>
                      <span className="font-sans font-medium text-[#111] dark:text-white">
                        {project.client}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-[#777] dark:text-[#888] uppercase block flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        YEAR OF EXECUTION
                      </span>
                      <span className="font-mono text-[#111] dark:text-white">
                        {project.year}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-[#777] dark:text-[#888] uppercase block flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        LOCATION
                      </span>
                      <span className="font-sans text-[#111] dark:text-white">
                        {project.location}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-[#777] dark:text-[#888] uppercase block flex items-center gap-1 mb-1.5">
                        <Wrench className="w-3 h-3" />
                        TOOLS & MEDIUMS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-[#222226] border border-[#E0E0E0] dark:border-[#333] rounded text-[#444] dark:text-[#bbb]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Index Counter & Quick Nav */}
                  <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#28282E] flex items-center justify-between text-[11px] font-mono text-[#777] dark:text-[#888]">
                    <span>WORK {currentIndex + 1} OF {allProjects.length}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={handlePrev} className="hover:text-[#111] dark:hover:text-white">PREV</button>
                      <span>/</span>
                      <button onClick={handleNext} className="hover:text-[#111] dark:hover:text-white">NEXT</button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
