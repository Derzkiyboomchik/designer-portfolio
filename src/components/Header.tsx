import React from 'react';
import { PROFILE_DATA, type ProfileData } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { ShieldText } from './ShieldText';

interface HeaderProps {
  onOpenDrawer: () => void;
  profile?: ProfileData;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDrawer, profile = PROFILE_DATA }) => {
  return (
    <header className="w-full pt-10 pb-8 px-4 sm:px-8 border-b border-[#E5E5E5] dark:border-[#222225] transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Profile Header Row */}
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          
          {/* Avatar Button with Thin Border */}
          <div className="relative group shrink-0">
            <button 
              onClick={onOpenDrawer}
              className="relative block w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 border border-[#111111]/20 dark:border-white/30 hover:border-[#111111] dark:hover:border-white transition-all duration-300 group-hover:scale-[1.03]"
              aria-label="Open designer profile drawer"
            >
              <img 
                src={profile.avatarUrl} 
                alt={profile.name}
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </button>
            
            {/* Online Status Dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-[#0E0E10] rounded-full shadow-sm" title="Available for Select Projects (2025/26)"></span>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-widest uppercase font-mono text-[#666] dark:text-[#999]">
              View Bio ✦
            </div>
          </div>

          {/* Profile Text Block */}
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#111111] dark:text-white">
                <ShieldText>{profile.name}</ShieldText>
              </h1>
            </div>

            <p className="font-mono text-xs text-[#666] dark:text-[#999] tracking-wider uppercase">
              {profile.role}
            </p>

            <p className="font-sans text-sm text-[#444] dark:text-[#bbb] leading-relaxed max-w-2xl font-light">
              <ShieldText>{profile.bio}</ShieldText>
            </p>

            {/* Action Links */}
            <div className="pt-1 flex flex-wrap items-center gap-5 text-xs font-mono tracking-widest">
              <button
                onClick={onOpenDrawer}
                className="group flex items-center gap-1.5 text-[#111] dark:text-white underline underline-offset-4 hover:opacity-70 transition-opacity uppercase font-medium"
              >
                Designer Profile
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>

              <span className="text-[#CCC] dark:text-[#333]">|</span>

              <a 
                href={`mailto:${profile.contact.email}`}
                className="text-[#666] dark:text-[#999] hover:text-[#111] dark:hover:text-white transition-colors"
              >
                {profile.contact.email}
              </a>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
