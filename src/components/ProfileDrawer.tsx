import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA, type ProfileData } from '../data/portfolioData';
import { X, Copy, Check, ArrowUpRight, Award, Layers } from 'lucide-react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: ProfileData;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, profile = PROFILE_DATA }) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-md"
          />

          {/* Slide-out Drawer Sidebar Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FAFAFA] dark:bg-[#121214] text-[#111111] dark:text-[#F3F3F3] shadow-2xl border-l border-[#E5E5E5] dark:border-[#222225] flex flex-col h-full overflow-y-auto glass-panel relative"
            >
              
              {/* Header inside Drawer */}
              <div className="p-6 border-b border-[#E5E5E5] dark:border-[#222225] flex items-center justify-between sticky top-0 bg-[#FAFAFA]/90 dark:bg-[#121214]/90 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="font-mono text-xs tracking-widest uppercase text-[#555] dark:text-[#aaa]">
                    DESIGNER DOSSIER
                  </span>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#EFEFEF] dark:hover:bg-[#222226] text-[#111] dark:text-white transition-colors"
                  aria-label="Close profile drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Main Scrollable Content */}
              <div className="p-6 sm:p-8 space-y-8 flex-1">
                
                {/* Avatar & Title Header */}
                <div className="flex items-center gap-5">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover border border-[#111]/20 dark:border-white/30 p-0.5"
                  />
                  <div>
                    <h2 className="font-serif text-2xl font-normal tracking-tight text-[#111] dark:text-white">
                      {profile.name}
                    </h2>
                    <p className="font-mono text-xs text-[#666] dark:text-[#999] tracking-wider uppercase mt-0.5">
                      {profile.role}
                    </p>
                    <p className="font-mono text-[11px] text-[#888] tracking-widest uppercase mt-1">
                      {profile.location}
                    </p>
                  </div>
                </div>

                {/* Detailed Bio & Manifesto */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs tracking-widest uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2">
                    BIOGRAPHY & PRACTICE
                  </h3>
                  <p className="font-sans text-sm font-light text-[#333] dark:text-[#ccc] leading-relaxed">
                    {profile.bio}
                  </p>
                  <blockquote className="pl-3 border-l-2 border-[#111] dark:border-white text-xs font-serif italic text-[#555] dark:text-[#aaa] py-1">
                    "{profile.manifesto}"
                  </blockquote>
                </div>

                {/* Services List */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs tracking-widest uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    SERVICES & EXPERTISE
                  </h3>
                  <ul className="space-y-2">
                    {profile.services.map((service, idx) => (
                      <li key={idx} className="font-sans text-xs text-[#333] dark:text-[#ddd] flex items-center gap-2">
                        <span className="text-xs text-[#888] font-mono">0{idx + 1}.</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selected Clients */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs tracking-widest uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2">
                    SELECT CLIENTELE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.clients.map((client, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-mono border border-[#E0E0E0] dark:border-[#2A2A30] rounded text-[#444] dark:text-[#bbb]"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Awards & Recognition */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs tracking-widest uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5" />
                    RECOGNITION
                  </h3>
                  <div className="space-y-2.5">
                    {profile.awards.map((award, idx) => (
                      <div key={idx} className="text-xs flex justify-between gap-4">
                        <div>
                          <p className="font-sans font-medium text-[#222] dark:text-[#eee]">{award.title}</p>
                          <p className="font-mono text-[10px] text-[#777] dark:text-[#888]">{award.organization}</p>
                        </div>
                        <span className="font-mono text-[11px] text-[#888] shrink-0">{award.year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Social Links */}
                <div className="space-y-4 pt-4 border-t border-[#E5E5E5] dark:border-[#222225]">
                  <h3 className="font-mono text-xs tracking-widest uppercase text-[#888] dark:text-[#777]">
                    DIRECT INQUIRIES
                  </h3>
                  
                  {/* Email row with Copy Button */}
                  <div className="flex items-center justify-between p-3 border border-[#E5E5E5] dark:border-[#28282E] rounded-lg bg-white/50 dark:bg-[#17171A]">
                    <span className="font-mono text-xs text-[#222] dark:text-[#eee] truncate mr-2">
                      {profile.contact.email}
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded hover:bg-[#EFEFEF] dark:hover:bg-[#25252A] text-[#666] dark:text-[#aaa] transition-colors shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Social Links List */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <a
                      href={`https://${profile.contact.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 border border-[#E5E5E5] dark:border-[#28282E] rounded flex items-center justify-between text-[#444] dark:text-[#ccc] hover:border-[#111] dark:hover:border-white transition-colors"
                    >
                      INSTAGRAM
                      <ArrowUpRight className="w-3 h-3 text-[#888]" />
                    </a>
                    <a
                      href={`https://${profile.contact.behance}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 border border-[#E5E5E5] dark:border-[#28282E] rounded flex items-center justify-between text-[#444] dark:text-[#ccc] hover:border-[#111] dark:hover:border-white transition-colors"
                    >
                      BEHANCE
                      <ArrowUpRight className="w-3 h-3 text-[#888]" />
                    </a>
                    <a
                      href={`https://${profile.contact.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 border border-[#E5E5E5] dark:border-[#28282E] rounded flex items-center justify-between text-[#444] dark:text-[#ccc] hover:border-[#111] dark:hover:border-white transition-colors"
                    >
                      LINKEDIN
                      <ArrowUpRight className="w-3 h-3 text-[#888]" />
                    </a>
                    <a
                      href={`https://${profile.contact.readcv}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 border border-[#E5E5E5] dark:border-[#28282E] rounded flex items-center justify-between text-[#444] dark:text-[#ccc] hover:border-[#111] dark:hover:border-white transition-colors"
                    >
                      READ.CV
                      <ArrowUpRight className="w-3 h-3 text-[#888]" />
                    </a>
                  </div>

                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-[#E5E5E5] dark:border-[#222225] bg-[#FAFAFA]/90 dark:bg-[#121214]/90 text-[10px] font-mono text-[#888] dark:text-[#777] flex items-center justify-between">
                <span>© {new Date().getFullYear()} STUDIO KRYLOVA</span>
                <span>{profile.location.toUpperCase()}</span>
              </div>

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
};
