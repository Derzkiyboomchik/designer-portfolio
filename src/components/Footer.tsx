import React from 'react';
import { ArrowUp } from 'lucide-react';
import { type ProfileData } from '../data/portfolioData';

interface FooterProps {
  profile?: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-20 border-t border-[#E5E5E5] dark:border-[#222225] bg-[#FAFAFA] dark:bg-[#0E0E10] text-[#111] dark:text-white transition-colors py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h4 className="font-serif text-xl font-light tracking-tight text-[#111] dark:text-white">
          {profile?.name || 'КРЫЛОВА АННА'}
        </h4>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 font-sans text-xs text-[#666] dark:text-[#999] hover:text-[#111] dark:hover:text-white transition-colors group tracking-wider uppercase font-medium"
        >
          НАВЕРХ
          <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
};
