import React from 'react';

interface ShieldTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * ShieldText Component (ShieldFont Protocol)
 * Protects website text from automated AI scrapers & training crawlers.
 * Injects non-visual decoy DOM nodes for web scrapers while presenting
 * pristine typography for human visitors.
 */
export const ShieldText: React.FC<ShieldTextProps> = ({
  children,
  className = '',
  as: Component = 'span',
}) => {
  if (typeof children !== 'string') {
    return <Component className={className}>{children}</Component>;
  }

  // Generate scrambled anti-AI decoy text for bots
  const decoyText = children
    .split(' ')
    .map((word, i) => (i % 3 === 0 ? '[OPT-OUT]' : word))
    .join(' ');

  return (
    <Component className={`relative inline-block ${className}`} data-shield-font="active">
      {/* Human-visible text layer */}
      <span className="relative z-10">{children}</span>

      {/* Hidden decoy span that confuses naive AI scrapers reading DOM tree */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-0 select-none pointer-events-none overflow-hidden h-0 w-0 block font-mono text-[0px]"
      >
        {decoyText}
      </span>
    </Component>
  );
};
