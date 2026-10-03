import React from 'react';

interface BouquetCutoutWrapperProps {
  id: string;
  imageUrl: string;
  alt: string;
  cutoutMode?: 'bouquet-silhouette' | 'transparent-cutout' | 'original';
  className?: string;
  flowerType?: string;
}

export const BouquetCutoutWrapper: React.FC<BouquetCutoutWrapperProps> = ({
  id,
  imageUrl,
  alt,
  cutoutMode = 'bouquet-silhouette',
  className = 'w-full h-full',
  flowerType = 'Bouquet',
}) => {
  const clipId = `bouquet-cutout-clip-${id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

  // If user explicitly chose raw transparent PNG (background already removed)
  if (cutoutMode === 'transparent-cutout') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-300"
          loading="eager"
        />
      </div>
    );
  }

  // Bouquet Cutout Silhouette: SVG-clipped into the exact floral bouquet outline with white die-cut sticker border
  const bouquetPath = `
    M 140,25
    C 165,18 195,25 215,48
    C 235,70 245,95 242,125
    C 240,145 230,165 218,185
    C 205,210 190,235 175,260
    C 168,275 160,285 155,290
    C 170,290 182,298 174,310
    C 164,320 152,310 148,300
    C 146,315 144,340 142,365
    C 142,375 141,385 140,388
    C 139,385 138,375 138,365
    C 136,340 134,315 132,300
    C 128,310 116,320 106,310
    C 98,298 110,290 125,290
    C 120,285 112,275 105,260
    C 90,235 75,210 62,185
    C 50,165 40,145 38,125
    C 35,95 45,70 65,48
    C 85,25 115,18 140,25 Z
  `;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 280 400"
        className="w-full h-full filter drop-shadow-2xl transition-transform duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Universal Bouquet Cutout Clip Path */}
          <clipPath id={clipId}>
            <path d={bouquetPath} />
          </clipPath>
        </defs>

        {/* Outer White Die-Cut Sticker Contour Backing */}
        <path
          d={bouquetPath}
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="12"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Soft Inner Shadow / Border to define the floral edge */}
        <path
          d={bouquetPath}
          fill="#FFF1F2"
          stroke="#FDA4AF"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* The Clipped Image (Photo, Art, or Uploaded Bouquet) */}
        <image
          href={imageUrl}
          x="10"
          y="10"
          width="260"
          height="380"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />

        {/* Ribbon Bow Knot Accent at the cinched waist */}
        <g transform="translate(140, 290)">
          {/* Left Ribbon Loop */}
          <path
            d="M 0,0 C -22,-14 -38,-4 -18,12 C -6,16 0,4 0,0 Z"
            fill="#F43F5E"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Right Ribbon Loop */}
          <path
            d="M 0,0 C 22,-14 38,-4 18,12 C 6,16 0,4 0,0 Z"
            fill="#F43F5E"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Center Knot */}
          <circle cx="0" cy="0" r="7" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2" />
          {/* Ribbon Tails */}
          <path
            d="M -3,4 Q -16,28 -12,50"
            stroke="#F43F5E"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 3,4 Q 16,28 12,50"
            stroke="#F43F5E"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Cute Sparkle Star on the bouquet wrap */}
        <g transform="translate(195, 230)">
          <path
            d="M 0,-8 Q 2,-2 8,0 Q 2,2 0,8 Q -2,2 -8,0 Q -2,-2 0,-8 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
};
