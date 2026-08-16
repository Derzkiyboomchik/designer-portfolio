import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA, type ProfileData } from '../data/portfolioData';
import { X, Copy, Check, ArrowUpRight, Award, Layers, Send } from 'lucide-react';

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
    if (!profile.contact.email) return;
    navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to format social URLs
  const formatUrl = (input: string, prefix: string) => {
    if (!input) return '';
    if (input.startsWith('http://') || input.startsWith('https://')) return input;
    if (input.startsWith('@')) return `${prefix}${input.slice(1)}`;
    return `https://${input}`;
  };

  const socialLinks = [
    { label: 'INSTAGRAM', url: formatUrl(profile.contact.instagram, 'https://instagram.com/'), key: 'ig' },
    { label: 'TELEGRAM', url: formatUrl(profile.contact.telegram || '', 'https://t.me/'), key: 'tg', icon: Send },
  ].filter(link => Boolean(link.url));

  const hasServices = Array.isArray(profile.services) && profile.services.length > 0;
  const hasClients = Array.isArray(profile.clients) && profile.clients.length > 0;
  const hasAwards = Array.isArray(profile.awards) && profile.awards.length > 0;
  const hasSocials = socialLinks.length > 0;

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
                  <span className="font-sans text-xs tracking-wider uppercase text-[#555] dark:text-[#aaa] font-medium">
                    ПРОФИЛЬ
                  </span>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#EFEFEF] dark:hover:bg-[#222226] text-[#111] dark:text-white transition-colors"
                  aria-label="Закрыть профиль"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Main Scrollable Content */}
              <div className="p-6 sm:p-8 space-y-8 flex-1">
                
                {/* Avatar & Title Header */}
                <div className="flex items-center gap-5">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name || 'Аватар'}
                      className="w-20 h-20 rounded-full object-cover border border-[#111]/20 dark:border-white/30 p-0.5"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#E5E5E5] dark:bg-[#222226] flex items-center justify-center font-serif text-2xl">
                      {profile.name ? profile.name.charAt(0) : '✦'}
                    </div>
                  )}
                  <div>
                    {profile.name && (
                      <h2 className="font-serif text-2xl font-normal tracking-tight text-[#111] dark:text-white">
                        {profile.name}
                      </h2>
                    )}
                    {profile.role && (
                      <p className="font-sans text-xs text-[#666] dark:text-[#999] tracking-wide uppercase mt-0.5">
                        {profile.role}
                      </p>
                    )}
                    {profile.location && (
                      <p className="font-sans text-[11px] text-[#888] tracking-wider uppercase mt-1">
                        {profile.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Detailed Bio & Manifesto */}
                {(profile.bio || profile.manifesto) && (
                  <div className="space-y-3">
                    <h3 className="font-sans text-xs tracking-wider uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2 font-medium">
                      БИОГРАФИЯ И ПРАКТИКА
                    </h3>
                    {profile.bio && (
                      <p className="font-sans text-sm font-light text-[#333] dark:text-[#ccc] leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                    {profile.manifesto && (
                      <blockquote className="pl-3 border-l-2 border-[#111] dark:border-white text-base font-serif italic text-[#444] dark:text-[#bbb] py-1 leading-relaxed">
                        "{profile.manifesto}"
                      </blockquote>
                    )}
                  </div>
                )}

                {/* Services List */}
                {hasServices && (
                  <div className="space-y-3">
                    <h3 className="font-sans text-xs tracking-wider uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2 flex items-center gap-2 font-medium">
                      <Layers className="w-3.5 h-3.5" />
                      УСЛУГИ И НАПРАВЛЕНИЯ
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
                )}

                {/* Selected Clients */}
                {hasClients && (
                  <div className="space-y-3">
                    <h3 className="font-sans text-xs tracking-wider uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2 font-medium">
                      КЛИЕНТЫ
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.clients.map((client, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] font-sans border border-[#E0E0E0] dark:border-[#2A2A30] rounded text-[#444] dark:text-[#bbb]"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Awards & Recognition */}
                {hasAwards && (
                  <div className="space-y-3">
                    <h3 className="font-sans text-xs tracking-wider uppercase text-[#888] dark:text-[#777] border-b border-[#E5E5E5] dark:border-[#222225] pb-2 flex items-center gap-2 font-medium">
                      <Award className="w-3.5 h-3.5" />
                      НАГРАДЫ
                    </h3>
                    <div className="space-y-2.5">
                      {profile.awards.map((award, idx) => (
                        <div key={idx} className="text-xs flex justify-between gap-4">
                          <div>
                            <p className="font-sans font-medium text-[#222] dark:text-[#eee]">{award.title}</p>
                            <p className="font-sans text-[11px] text-[#777] dark:text-[#888]">{award.organization}</p>
                          </div>
                          <span className="font-mono text-[11px] text-[#888] shrink-0">{award.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact & Social Links */}
                {(profile.contact.email || hasSocials) && (
                  <div className="space-y-4 pt-4 border-t border-[#E5E5E5] dark:border-[#222225]">
                    <h3 className="font-sans text-xs tracking-wider uppercase text-[#888] dark:text-[#777] font-medium">
                      КОНТАКТЫ
                    </h3>
                    
                    {/* Email row */}
                    {profile.contact.email && (
                      <div className="flex items-center justify-between p-3 border border-[#E5E5E5] dark:border-[#28282E] rounded-lg bg-white/50 dark:bg-[#17171A]">
                        <span className="font-sans text-xs text-[#222] dark:text-[#eee] truncate mr-2">
                          {profile.contact.email}
                        </span>
                        <button
                          onClick={handleCopyEmail}
                          className="p-1.5 rounded hover:bg-[#EFEFEF] dark:hover:bg-[#25252A] text-[#666] dark:text-[#aaa] transition-colors shrink-0"
                          title="Скопировать email"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    )}

                    {/* Social Links List */}
                    {hasSocials && (
                      <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                        {socialLinks.map((item) => (
                          <a
                            key={item.key}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 border border-[#E5E5E5] dark:border-[#28282E] rounded flex items-center justify-between text-[#444] dark:text-[#ccc] hover:border-[#111] dark:hover:border-white transition-colors"
                          >
                            {item.label}
                            <ArrowUpRight className="w-3 h-3 text-[#888]" />
                          </a>
                        ))}
                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-[#E5E5E5] dark:border-[#222225] bg-[#FAFAFA]/90 dark:bg-[#121214]/90 text-[10px] font-sans text-[#888] dark:text-[#777] flex items-center justify-between">
                <span>© {new Date().getFullYear()} {profile.name ? `СТУДИЯ ${profile.name.split(' ')[0]}` : 'ПОРТФОЛИО'}</span>
                {profile.location && <span>{profile.location.toUpperCase()}</span>}
              </div>

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
};
