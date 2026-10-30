import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#25392B]';
  const subColor = isLight ? 'text-emerald-100/80' : 'text-[#5C685D]';
  const strokeColor = isLight ? '#FFFFFF' : '#25392B';

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Mountain & Cabin Emblem */}
      <svg
        width={36 * scale}
        height={34 * scale}
        viewBox="0 0 60 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105"
      >
        {/* Mountain Peaks Silhouette */}
        <path
          d="M30 4L44 26L40 28L54 44H6L18 28L23 34L30 4Z"
          fill={isLight ? '#38523F' : '#E8E4DA'}
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Snow Peaks Highlights */}
        <path
          d="M30 4L34 14L30 17L26 13L30 4Z"
          fill={isLight ? '#FFFFFF' : '#25392B'}
        />
        <path
          d="M18 28L21 31L18 33L15 31L18 28Z"
          fill={isLight ? '#FFFFFF' : '#25392B'}
        />
        <path
          d="M44 26L47 31L44 33L41 30L44 26Z"
          fill={isLight ? '#FFFFFF' : '#25392B'}
        />
        {/* Cozy Alpine Hut / Cabin */}
        <path
          d="M26 36L30 31L34 36V44H26V36Z"
          fill={isLight ? '#213025' : '#FFFFFF'}
          stroke={strokeColor}
          strokeWidth="2"
        />
        {/* Cabin Door */}
        <rect
          x="28.5"
          y="38"
          width="3"
          height="6"
          fill={strokeColor}
        />
        {/* Base Ground Line */}
        <path
          d="M3 45H57"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-serif tracking-tight font-bold ${textColor} ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
            }`}
          >
            Ghar
          </span>
          <span
            className={`font-serif italic font-normal text-xs md:text-sm ${
              isLight ? 'text-emerald-100/90' : 'text-[#4A5D4E]'
            }`}
          >
            by the Mountains
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[9px] uppercase tracking-[0.2em] font-medium pt-0.5 ${subColor}`}
          >
            Dharamkot · Himachal
          </span>
        )}
      </div>
    </div>
  );
};
