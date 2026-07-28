import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [zurichTime, setZurichTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setZurichTime(new Intl.DateTimeFormat('de-CH', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-20 border-t border-[#E5E5E5] dark:border-[#222225] bg-[#FAFAFA] dark:bg-[#0E0E10] text-[#111] dark:text-white transition-colors py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-2xl font-light tracking-tight">
              {PROFILE_DATA.name}
            </h4>
            <p className="font-mono text-xs text-[#777] dark:text-[#888] tracking-widest uppercase">
              SWISS MINIMALIST VISUAL & SPATIAL DESIGN PRACTICE
            </p>
          </div>

          {/* Zurich Clock & System Status */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#666] dark:text-[#999]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>ZÜRICH CET: <strong className="text-[#111] dark:text-white font-medium">{zurichTime || '12:00:00'}</strong></span>
            </div>

            <span>•</span>

            <span>PARIS CET</span>

            <span>•</span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#111] dark:hover:text-white transition-colors group"
            >
              BACK TO TOP
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits Line */}
        <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#222225] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#888] dark:text-[#777]">
          <p>© {new Date().getFullYear()} ELENA VANCE STUDIO. ALL RIGHTS RESERVED.</p>
          <p className="tracking-widest uppercase">
            DESIGNED & COOLED UNDER SWISS MINIMALISM PRINCIPLES
          </p>
        </div>

      </div>
    </footer>
  );
};
