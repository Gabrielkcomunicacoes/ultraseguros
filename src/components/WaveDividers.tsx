import React from 'react';

// 1. Hero (#07172E) to Pain (#102A50) - Asymmetrical High Left Wave
export const WaveHeroToPain: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#07172E]">
    <svg
      className="relative block w-full h-[60px] sm:h-[90px] md:h-[130px]"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,60 C320,160 640,20 960,110 C1200,170 1360,90 1440,50 L1440,180 L0,180 Z"
        fill="#102A50"
      />
      {/* Subtle Red/Gold Accent Stroke following wave contour */}
      <path
        d="M0,60 C320,160 640,20 960,110 C1200,170 1360,90 1440,50"
        stroke="#E52B32"
        strokeWidth="2.5"
        strokeOpacity="0.4"
        fill="none"
      />
    </svg>
  </div>
);

// 2. Pain (#102A50) to Target Audience (#F7F4EE) - Asymmetrical Double Curve
export const WavePainToAudience: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#102A50]">
    <svg
      className="relative block w-full h-[65px] sm:h-[100px] md:h-[140px]"
      viewBox="0 0 1440 190"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,130 C280,30 560,160 840,40 C1120,-60 1320,80 1440,120 L1440,190 L0,190 Z"
        fill="#F7F4EE"
      />
      <path
        d="M0,115 C280,15 560,145 840,25 C1120,-75 1320,65 1440,105"
        stroke="#F5B51B"
        strokeWidth="2"
        strokeOpacity="0.5"
        fill="none"
      />
    </svg>
  </div>
);

// 3. Audience (#F7F4EE) to Timeline (#07172E) - Deep Sweeping Curve Right-Heavy
export const WaveAudienceToTimeline: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#F7F4EE]">
    <svg
      className="relative block w-full h-[70px] sm:h-[110px] md:h-[150px]"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,30 C400,180 800,20 1200,160 C1320,200 1400,120 1440,80 L1440,200 L0,200 Z"
        fill="#07172E"
      />
    </svg>
  </div>
);

// 4. Timeline (#07172E) to RH Pain (#FFFFFF) - Smooth Organic Crest
export const WaveTimelineToRH: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#07172E]">
    <svg
      className="relative block w-full h-[65px] sm:h-[95px] md:h-[135px]"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,100 C360,0 720,180 1080,40 C1260,-30 1380,50 1440,90 L1440,180 L0,180 Z"
        fill="#FFFFFF"
      />
      <path
        d="M0,100 C360,0 720,180 1080,40"
        stroke="#234E9A"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="none"
      />
    </svg>
  </div>
);

// 5. RH Pain (#FFFFFF) to Cost Analysis (#102A50) - Fluid Downward Slope
export const WaveRHToCost: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#FFFFFF]">
    <svg
      className="relative block w-full h-[60px] sm:h-[90px] md:h-[130px]"
      viewBox="0 0 1440 170"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,40 C240,140 480,10 720,110 C960,210 1200,30 1440,90 L1440,170 L0,170 Z"
        fill="#102A50"
      />
    </svg>
  </div>
);

// 6. Cost (#102A50) to How It Works (#07172E) - Asymmetrical S-Shape
export const WaveCostToHow: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#102A50]">
    <svg
      className="relative block w-full h-[65px] sm:h-[95px] md:h-[130px]"
      viewBox="0 0 1440 170"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,110 C480,10 960,160 1440,40 L1440,170 L0,170 Z"
        fill="#07172E"
      />
      <path
        d="M0,110 C480,10 960,160 1440,40"
        stroke="#E52B32"
        strokeWidth="2"
        strokeOpacity="0.4"
        fill="none"
      />
    </svg>
  </div>
);

// 7. How It Works (#07172E) to Main Form (#F7F4EE) - Organic Deep Wave Entrance
export const WaveHowToForm: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#07172E]">
    <svg
      className="relative block w-full h-[75px] sm:h-[110px] md:h-[160px]"
      viewBox="0 0 1440 210"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,80 C320,180 640,10 960,150 C1200,220 1360,110 1440,60 L1440,210 L0,210 Z"
        fill="#F7F4EE"
      />
    </svg>
  </div>
);

// 8. Main Form (#F7F4EE) to Authority (#07172E) - Smooth Wave
export const WaveFormToAuth: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#F7F4EE]">
    <svg
      className="relative block w-full h-[65px] sm:h-[95px] md:h-[130px]"
      viewBox="0 0 1440 170"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,30 C360,150 720,20 1080,130 C1260,185 1380,95 1440,45 L1440,170 L0,170 Z"
        fill="#07172E"
      />
    </svg>
  </div>
);

// 9. Authority (#07172E) to FAQ (#F7F4EE) - Flowing Crest
export const WaveAuthToFAQ: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#07172E]">
    <svg
      className="relative block w-full h-[65px] sm:h-[95px] md:h-[135px]"
      viewBox="0 0 1440 175"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,120 C280,20 560,160 840,50 C1120,-50 1320,90 1440,130 L1440,175 L0,175 Z"
        fill="#F7F4EE"
      />
    </svg>
  </div>
);

// 10. FAQ (#F7F4EE) to Final CTA (#07172E) - Dynamic Asymmetrical Sweep
export const WaveFAQToFinalCTA: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none z-10 bg-[#F7F4EE]">
    <svg
      className="relative block w-full h-[75px] sm:h-[115px] md:h-[160px]"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,50 C400,200 800,10 1200,160 C1320,210 1400,120 1440,70 L1440,200 L0,200 Z"
        fill="#07172E"
      />
      <path
        d="M0,50 C400,200 800,10 1200,160"
        stroke="#E52B32"
        strokeWidth="2.5"
        strokeOpacity="0.5"
        fill="none"
      />
    </svg>
  </div>
);
