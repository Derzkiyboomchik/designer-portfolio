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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [project]);

  const allImages = project ? [project.imageUrl, ...(project.secondaryImages || [])] : [];

  const handleNextImage = () => {
    if (allImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    if (allImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || allImages.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    // Minimum swipe threshold of 40px
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextImage(); // Swiped left -> Next Image
      } else {
        handlePrevImage(); // Swiped right -> Previous Image
      }
    }
    setTouchStartX(null);
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, activeImageIndex, allImages.length, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);

  const handleNextProject = () => {
    const nextIdx = (currentIndex + 1) % allProjects.length;
    onSelectProject(allProjects[nextIdx]);
  };

  const handlePrevProject = () => {
    const prevIdx = (currentIndex - 1 + allProjects.length) % allProjects.length;
    onSelectProject(allProjects[prevIdx]);
  };

  const currentImage = allImages[activeImageIndex] || project.imageUrl;

  const hasSpecs = Boolean(project.client || project.year || project.location || (project.tools && project.tools.length > 0));

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
          
          {/* Heavy Backdrop Blur Overlay */}
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
            aria-label="Закрыть просмотр"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Lightbox Modal Content Box */}
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
              <div 
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative group bg-[#EFEFEF] dark:bg-[#0A0A0B] rounded-lg overflow-hidden flex items-center justify-center min-h-[300px] max-h-[65vh] select-none"
              >
                <img
                  src={currentImage}
                  alt={project.title}
                  className={`object-contain transition-all duration-500 max-h-[62vh] w-auto ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Zoom Toggle (Top Left) */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 hover:bg-black/60 transition-colors"
                    title={isZoomed ? 'Уменьшить' : 'Увеличить'}
                  >
                    {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  </button>
                </div>

                {/* Desktop Side Arrows for Switching Images Inside Card */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hidden sm:flex items-center justify-center shadow-lg"
                      aria-label="Предыдущее фото"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hidden sm:flex items-center justify-center shadow-lg"
                      aria-label="Следующее фото"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Dots Indicator */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/20 z-10">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          activeImageIndex === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Фото ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Detailed Project Text Block */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
                
                {/* Main Text Details (Left 2 Columns) */}
                <div className="lg:col-span-2 space-y-4">
                  {project.category && (
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-sans tracking-wider uppercase text-blue-600 dark:text-blue-400 font-medium">
                        {project.category}
                      </span>
                    </div>
                  )}

                  {/* Title in Elegant Serif Font */}
                  {project.title && (
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#111] dark:text-white">
                      {project.title}
                    </h2>
                  )}

                  {project.subtitle && (
                    <p className="font-sans text-base text-[#444] dark:text-[#bbb] font-light leading-relaxed">
                      {project.subtitle}
                    </p>
                  )}

                  {project.description && (
                    <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#222225]">
                      <p className="font-sans text-sm text-[#333] dark:text-[#ccc] leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Metadata Sidebar (Right 1 Column) */}
                {hasSpecs && (
                  <div className="space-y-4 p-5 rounded-lg border border-[#E5E5E5] dark:border-[#222225] bg-[#F4F4F4] dark:bg-[#18181C]">
                    <h3 className="font-sans text-xs tracking-wider uppercase text-[#777] dark:text-[#888] border-b border-[#E5E5E5] dark:border-[#28282E] pb-2 font-medium">
                      СПЕЦИФИКАЦИЯ
                    </h3>

                    <div className="space-y-3 text-xs">
                      {project.client && (
                        <div>
                          <span className="font-sans text-[10px] text-[#777] dark:text-[#888] uppercase block">
                            ЗАКАЗЧИК / КЛИЕНТ
                          </span>
                          <span className="font-sans font-medium text-[#111] dark:text-white">
                            {project.client}
                          </span>
                        </div>
                      )}

                      {project.year && (
                        <div>
                          <span className="font-sans text-[10px] text-[#777] dark:text-[#888] uppercase block flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            ГОД РЕАЛИЗАЦИИ
                          </span>
                          <span className="font-mono text-[#111] dark:text-white">
                            {project.year}
                          </span>
                        </div>
                      )}

                      {project.location && (
                        <div>
                          <span className="font-sans text-[10px] text-[#777] dark:text-[#888] uppercase block flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            ЛОКАЦИЯ
                          </span>
                          <span className="font-sans text-[#111] dark:text-white">
                            {project.location}
                          </span>
                        </div>
                      )}

                      {project.tools && project.tools.length > 0 && (
                        <div>
                          <span className="font-sans text-[10px] text-[#777] dark:text-[#888] uppercase block flex items-center gap-1 mb-1.5">
                            <Wrench className="w-3 h-3" />
                            ИНСТРУМЕНТЫ И ТЕХНОЛОГИИ
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tools.map((tool, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 text-[10px] font-sans bg-white dark:bg-[#222226] border border-[#E0E0E0] dark:border-[#333] rounded text-[#444] dark:text-[#bbb]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Project Index Counter & Quick Nav */}
                    <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#28282E] flex items-center justify-between text-[11px] font-sans text-[#777] dark:text-[#888]">
                      <span>ПРОЕКТ {currentIndex + 1} ИЗ {allProjects.length}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={handlePrevProject} className="hover:text-[#111] dark:hover:text-white uppercase font-medium">НАЗАД</button>
                        <span>/</span>
                        <button onClick={handleNextProject} className="hover:text-[#111] dark:hover:text-white uppercase font-medium">ВПЕРЕД</button>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
