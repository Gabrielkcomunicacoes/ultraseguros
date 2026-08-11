import React, { useState } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  imgClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  imgClassName,
}) => {
  const [imageError, setImageError] = useState(false);

  const textColor = variant === 'dark' ? '#FFFFFF' : '#07172E';
  const subTextColor = variant === 'dark' ? '#94A3B8' : '#475569';

  const defaultImgClasses = "h-20 sm:h-28 md:h-36 max-w-[260px] sm:max-w-[380px] -my-5 sm:-my-9 object-contain transition-transform duration-300 hover:scale-105 origin-left";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {!imageError ? (
        <img
          src="/assets/logotipo.png"
          alt="Ultra Seguros Corretora"
          className={imgClassName || defaultImgClasses}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <>
          {/* Fallback Vector Logo */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <defs>
              <linearGradient id="ultraRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E52B32" />
                <stop offset="100%" stopColor="#C21C23" />
              </linearGradient>
              <linearGradient id="ultraGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5B51B" />
                <stop offset="100%" stopColor="#D89A08" />
              </linearGradient>
            </defs>
            <path
              d="M 50 10 L 88 50 L 72 50 L 50 28 L 28 50 L 12 50 Z"
              fill="url(#ultraRedGrad)"
            />
            <path
              d="M 50 32 L 72 54 L 60 54 L 50 44 L 40 54 L 28 54 Z"
              fill="url(#ultraGoldGrad)"
            />
            <path
              d="M 50 90 L 12 52 L 28 52 L 50 74 L 72 52 L 88 52 Z"
              fill="url(#ultraRedGrad)"
              opacity="0.9"
            />
          </svg>

          <div className="flex flex-col justify-center leading-none">
            <span
              className="font-extrabold tracking-wider text-xl uppercase font-heading"
              style={{ color: textColor }}
            >
              ULTRA
            </span>
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5"
              style={{ color: subTextColor }}
            >
              SEGUROS CORRETORA
            </span>
          </div>
        </>
      )}
    </div>
  );
};
