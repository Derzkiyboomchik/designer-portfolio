import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-white/80 dark:bg-[#18181B]/80 text-[#111111] dark:text-white border border-[#111111]/15 dark:border-white/20 shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 font-sans text-xs tracking-wider uppercase group select-none font-medium"
      aria-label="Переключить тему оформления"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {darkMode ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </div>
      
      <span className="font-sans text-[11px] font-medium tracking-wider">
        {darkMode ? 'СВЕТЛАЯ' : 'ТЁМНАЯ'}
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-amber-400 opacity-60"></span>
    </button>
  );
};
