import React from 'react';

// Doodled pink stars that scatter in the background (as in Image 1, 2, 3, 4)
export const PastelDoodleStars: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const starPositions = [
    { top: '6%', left: '8%', size: 28, rotate: 12, opacity: 0.65 },
    { top: '15%', right: '10%', size: 34, rotate: -15, opacity: 0.7 },
    { top: '35%', left: '5%', size: 38, rotate: 25, opacity: 0.6 },
    { top: '48%', right: '8%', size: 32, rotate: -8, opacity: 0.65 },
    { top: '70%', left: '12%', size: 36, rotate: 18, opacity: 0.7 },
    { top: '75%', right: '14%', size: 40, rotate: -22, opacity: 0.65 },
    { top: '88%', left: '7%', size: 30, rotate: 8, opacity: 0.6 },
    { top: '22%', left: '22%', size: 24, rotate: -10, opacity: 0.5 },
    { top: '18%', right: '28%', size: 26, rotate: 14, opacity: 0.5 },
    { top: '82%', right: '35%', size: 28, rotate: -16, opacity: 0.55 },
    { top: '42%', left: '18%', size: 22, rotate: 30, opacity: 0.45 },
    { top: '62%', right: '22%', size: 25, rotate: -25, opacity: 0.45 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {starPositions.slice(0, count).map((star, idx) => (
        <svg
          key={idx}
          viewBox="0 0 50 50"
          className="absolute animate-pulse transition-transform"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            width: star.size,
            height: star.size,
            transform: `rotate(${star.rotate}deg)`,
            opacity: star.opacity,
            animationDuration: `${3 + (idx % 3)}s`,
          }}
        >
          <polygon
            points="25,2 32,18 49,19 36,31 40,48 25,38 10,48 14,31 1,19 18,18"
            fill="#F497B0"
            stroke="#EA6B8D"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
};

// Cute happy kitty holding a big pink heart (from Image 1: "PLEASE ACCEPT THE GIFT")
export const CuteHappyCat: React.FC<{ className?: string }> = ({ className = 'w-56 h-56' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 65,115 
             C 65,65 72,50 85,38 
             C 95,30 102,42 110,50 
             C 120,48 130,48 140,50 
             C 148,42 155,30 165,38 
             C 178,50 185,65 185,115 
             C 185,170 180,195 160,205 
             C 152,208 145,198 140,198 
             C 135,198 128,208 120,208 
             C 112,208 105,198 100,198 
             C 95,198 88,208 80,205 
             C 65,195 65,170 65,115 Z"
          fill="#FFFFFF"
          stroke="#1E1E1E"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line x1="125" y1="52" x2="125" y2="70" stroke="#9E9E9E" strokeWidth="5" strokeLinecap="round" />
        <line x1="113" y1="55" x2="113" y2="69" stroke="#9E9E9E" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="137" y1="55" x2="137" y2="69" stroke="#9E9E9E" strokeWidth="4.5" strokeLinecap="round" />

        <line x1="50" y1="92" x2="68" y2="92" stroke="#1E1E1E" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="48" y1="108" x2="68" y2="105" stroke="#1E1E1E" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="182" y1="92" x2="200" y2="92" stroke="#1E1E1E" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="182" y1="105" x2="202" y2="108" stroke="#1E1E1E" strokeWidth="5.5" strokeLinecap="round" />

        <ellipse cx="98" cy="94" rx="4" ry="5.5" fill="#1E1E1E" />
        <ellipse cx="152" cy="94" rx="4" ry="5.5" fill="#1E1E1E" />

        <ellipse cx="88" cy="102" rx="7" ry="4" fill="#FFB7C5" opacity="0.85" />
        <ellipse cx="162" cy="102" rx="7" ry="4" fill="#FFB7C5" opacity="0.85" />

        <path
          d="M 115,97 Q 120,103 125,97 Q 130,103 135,97"
          stroke="#1E1E1E"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
          <path
            d="M 125,128 
               C 125,128 100,105 82,120 
               C 65,134 72,158 98,178 
               C 112,189 125,200 125,200 
               C 125,200 138,189 152,178 
               C 178,158 185,134 168,120 
               C 150,105 125,128 125,128 Z"
            fill="#F8A5BA"
            stroke="#1E1E1E"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 88,128 C 82,136 82,146 88,154"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <circle cx="85" cy="144" r="8" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="5" />
          <circle cx="165" cy="144" r="8" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
};

// Cute crying kitty in a puddle of tears (from Image 2: "WHY DID YOU CLICK NO!")
export const CuteCryingCat: React.FC<{ className?: string }> = ({ className = 'w-64 h-64' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50,185 
             C 25,185 20,215 55,225 
             C 85,235 175,238 215,222 
             C 245,210 240,182 205,178 
             C 175,175 140,180 115,178 
             C 80,176 65,185 50,185 Z"
          fill="#BAE6FD"
          stroke="#7DD3FC"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse cx="90" cy="205" rx="35" ry="8" fill="#E0F2FE" opacity="0.8" />
        <ellipse cx="170" cy="210" rx="40" ry="9" fill="#E0F2FE" opacity="0.8" />

        <path
          d="M 85,178 
             C 70,165 65,130 75,100 
             C 82,75 92,60 105,52 
             C 115,46 122,58 130,62 
             C 142,62 148,46 158,52 
             C 170,60 180,80 185,110 
             C 190,140 185,168 175,178 
             C 155,185 105,185 85,178 Z"
          fill="#FFFFFF"
          stroke="#1E1E1E"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line x1="128" y1="62" x2="128" y2="76" stroke="#9E9E9E" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="116" y1="66" x2="116" y2="76" stroke="#9E9E9E" strokeWidth="4" strokeLinecap="round" />
        <line x1="140" y1="66" x2="140" y2="76" stroke="#9E9E9E" strokeWidth="4" strokeLinecap="round" />

        <line x1="68" y1="120" x2="84" y2="125" stroke="#1E1E1E" strokeWidth="5" strokeLinecap="round" />
        <line x1="66" y1="135" x2="84" y2="135" stroke="#1E1E1E" strokeWidth="5" strokeLinecap="round" />
        <line x1="176" y1="125" x2="192" y2="120" stroke="#1E1E1E" strokeWidth="5" strokeLinecap="round" />
        <line x1="176" y1="135" x2="194" y2="135" stroke="#1E1E1E" strokeWidth="5" strokeLinecap="round" />

        <path d="M 100,118 Q 108,108 116,118" stroke="#1E1E1E" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M 144,118 Q 152,108 160,118" stroke="#1E1E1E" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M 122,138 Q 130,130 138,138" stroke="#1E1E1E" strokeWidth="5" strokeLinecap="round" fill="none" />

        <path
          d="M 104,122 Q 95,150 85,185"
          stroke="#38BDF8"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="4 2"
        />
        <path
          d="M 156,122 Q 165,150 175,185"
          stroke="#38BDF8"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="4 2"
        />
      </svg>
    </div>
  );
};

// Cute white bunny with textured ears and pink cheeks (from Image 4 & 6)
export const CuteBunny: React.FC<{ className?: string; holding?: 'flower' | 'heart' }> = ({
  className = 'w-40 h-40',
  holding = 'flower',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 180 180"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50,90 C 40,50 45,15 62,15 C 75,15 76,55 70,90 Z"
          fill="#FFFFFF"
          stroke="#2D3748"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 54,80 C 48,50 50,25 60,25 C 68,25 68,52 64,80 Z"
          fill="#FED7E2"
          stroke="#F687B3"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <path
          d="M 110,90 C 104,55 105,15 118,15 C 135,15 140,50 130,90 Z"
          fill="#FFFFFF"
          stroke="#2D3748"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 116,80 C 112,52 112,25 120,25 C 132,25 132,50 126,80 Z"
          fill="#FED7E2"
          stroke="#F687B3"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <circle cx="90" cy="115" r="48" fill="#FFFFFF" stroke="#2D3748" strokeWidth="4.5" />
        <ellipse cx="62" cy="122" rx="8" ry="5" fill="#FBB6CE" opacity="0.85" />
        <ellipse cx="118" cy="122" rx="8" ry="5" fill="#FBB6CE" opacity="0.85" />
        <circle cx="72" cy="112" r="3.8" fill="#1A202C" />
        <circle cx="108" cy="112" r="3.8" fill="#1A202C" />
        <polygon points="90,118 86,115 94,115" fill="#F472B6" />
        <path d="M 86,122 Q 90,126 94,122" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" fill="none" />

        {holding === 'flower' ? (
          <g transform="translate(100, 115)">
            <path d="M 12,20 Q 15,35 18,48" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <ellipse cx="14" cy="32" rx="6" ry="3" fill="#34D399" transform="rotate(-30 14 32)" />
            <circle cx="12" cy="14" r="10" fill="#F43F5E" />
            <circle cx="6" cy="10" r="7" fill="#FB7185" />
            <circle cx="18" cy="10" r="7" fill="#FB7185" />
            <circle cx="12" cy="6" r="7" fill="#FDA4AF" />
            <circle cx="12" cy="12" r="5" fill="#FECDD3" />
            <circle cx="0" cy="26" r="6" fill="#FFFFFF" stroke="#2D3748" strokeWidth="3" />
            <circle cx="16" cy="28" r="6" fill="#FFFFFF" stroke="#2D3748" strokeWidth="3" />
          </g>
        ) : (
          <g transform="translate(65, 125)">
            <path
              d="M 25,12 C 25,12 12,0 3,8 C -5,17 0,28 15,38 C 22,43 25,48 25,48 C 25,48 28,43 35,38 C 50,28 55,17 47,8 C 38,0 25,12 25,12 Z"
              fill="#F472B6"
              stroke="#DB2777"
              strokeWidth="2.5"
            />
            <circle cx="5" cy="24" r="6" fill="#FFFFFF" stroke="#2D3748" strokeWidth="3" />
            <circle cx="45" cy="24" r="6" fill="#FFFFFF" stroke="#2D3748" strokeWidth="3" />
          </g>
        )}
      </svg>
    </div>
  );
};

// Conversation Candy Heart ("LOVE IS WHEREVER YOU ARE") from Image 6
export const ConversationHeart: React.FC<{ text?: string; className?: string }> = ({
  text = 'LOVE IS WHEREVER YOU ARE',
  className = 'w-24 h-24',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 100 95" className="w-full h-full drop-shadow-md" fill="none">
        <path
          d="M 50,28 
             C 50,28 32,8 15,16 
             C -2,25 0,48 22,68 
             C 34,79 50,90 50,90 
             C 50,90 66,79 78,68 
             C 100,48 102,25 85,16 
             C 68,8 50,28 50,28 Z"
          fill="#FBCFE8"
          stroke="#F472B6"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <foreignObject x="15" y="24" width="70" height="50">
          <div className="h-full flex items-center justify-center text-center px-1">
            <span className="text-[8px] sm:text-[9px] font-bold text-pink-700 uppercase tracking-tighter leading-tight font-bubble">
              {text}
            </span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

// ==========================================
// 100% TRANSPARENT CUTOUT CARTOON BOUQUETS (MATCHING PICTURE 3)
// ==========================================

// Bouquet 1: Cartoon Red Roses in newspaper wrap with black/white Dior-style ribbon
export const CutoutBouquetRoses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 280 400" className="w-full h-full filter drop-shadow-2xl" fill="none">
        {/* Outer Die-Cut White Sticker Outline Backing (Matches Picture 3) */}
        <path
          d="M 140,55 
             C 165,52 190,62 208,76 
             C 224,90 236,110 236,132 
             C 236,150 228,166 218,178 
             C 224,188 226,202 216,215 
             C 205,225 192,230 182,236 
             C 172,255 162,290 152,340 
             C 150,355 146,380 144,388 
             C 142,392 138,392 136,388 
             C 134,380 130,355 128,340 
             C 118,290 108,255 98,236 
             C 88,230 75,225 64,215 
             C 54,202 56,188 62,178 
             C 52,166 44,150 44,132 
             C 44,110 56,90 72,76 
             C 90,62 115,52 140,55 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="14"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Wrapping Paper Back Flap (angled newspaper wrap) */}
        <polygon points="50,150 140,320 230,150 140,80" fill="#F8FAFC" stroke="#334155" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="40,160 140,330 240,160 140,90" fill="#F1F5F9" opacity="0.9" />

        {/* Newspaper Text Mock Lines */}
        <line x1="80" y1="180" x2="130" y2="240" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
        <line x1="150" y1="240" x2="200" y2="180" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
        <line x1="90" y1="200" x2="130" y2="260" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />

        {/* Green Eucalyptus & Rose Leaves */}
        <ellipse cx="85" cy="130" rx="18" ry="10" fill="#4ADE80" stroke="#166534" strokeWidth="3" transform="rotate(-30 85 130)" />
        <ellipse cx="195" cy="130" rx="18" ry="10" fill="#4ADE80" stroke="#166534" strokeWidth="3" transform="rotate(30 195 130)" />
        <ellipse cx="140" cy="70" rx="12" ry="20" fill="#22C55E" stroke="#166534" strokeWidth="3" />
        <ellipse cx="60" cy="160" rx="16" ry="9" fill="#15803D" stroke="#14532D" strokeWidth="2.5" transform="rotate(-40 60 160)" />
        <ellipse cx="220" cy="160" rx="16" ry="9" fill="#15803D" stroke="#14532D" strokeWidth="2.5" transform="rotate(40 220 160)" />

        {/* 7 Lush Cartoon Red Roses with spiral petal layers */}
        {/* Rose Top Center */}
        <g transform="translate(140, 95)">
          <circle cx="0" cy="0" r="28" fill="#DC2626" stroke="#991B1B" strokeWidth="3.5" />
          <path d="M -15,-6 C -10,-18 10,-18 15,-6 C 18,6 10,16 -2,16 C -14,16 -18,4 -15,-6 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
          <path d="M -6,-2 Q 0,-8 6,-2 Q 6,6 -2,6 Q -8,4 -6,-2" fill="#F87171" stroke="#991B1B" strokeWidth="2" />
        </g>

        {/* Rose Left */}
        <g transform="translate(95, 120)">
          <circle cx="0" cy="0" r="26" fill="#DC2626" stroke="#991B1B" strokeWidth="3.5" />
          <path d="M -12,-6 C -8,-16 8,-16 12,-6 C 16,4 8,14 -2,14 C -12,14 -15,4 -12,-6 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
          <path d="M -5,-2 Q 0,-6 5,-2 Q 5,5 -2,5" fill="#F87171" stroke="#991B1B" strokeWidth="2" />
        </g>

        {/* Rose Right */}
        <g transform="translate(185, 120)">
          <circle cx="0" cy="0" r="26" fill="#DC2626" stroke="#991B1B" strokeWidth="3.5" />
          <path d="M -12,-6 C -8,-16 8,-16 12,-6 C 16,4 8,14 -2,14 C -12,14 -15,4 -12,-6 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
          <path d="M -5,-2 Q 0,-6 5,-2 Q 5,5 -2,5" fill="#F87171" stroke="#991B1B" strokeWidth="2" />
        </g>

        {/* Rose Center Middle */}
        <g transform="translate(140, 145)">
          <circle cx="0" cy="0" r="30" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="3.5" />
          <path d="M -16,-8 C -10,-20 10,-20 16,-8 C 20,6 12,18 -2,18 C -16,18 -20,4 -16,-8 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          <path d="M -8,-2 Q 0,-10 8,-2 Q 8,8 -2,8" fill="#F87171" stroke="#991B1B" strokeWidth="2" />
        </g>

        {/* Rose Bottom Left */}
        <g transform="translate(90, 175)">
          <circle cx="0" cy="0" r="24" fill="#DC2626" stroke="#991B1B" strokeWidth="3.5" />
          <path d="M -10,-4 C -6,-12 6,-12 10,-4 C 12,4 6,10 -2,10 C -10,10 -12,2 -10,-4 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
        </g>

        {/* Rose Bottom Right */}
        <g transform="translate(190, 175)">
          <circle cx="0" cy="0" r="24" fill="#DC2626" stroke="#991B1B" strokeWidth="3.5" />
          <path d="M -10,-4 C -6,-12 6,-12 10,-4 C 12,4 6,10 -2,10 C -10,10 -12,2 -10,-4 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
        </g>

        {/* Rose Bottom Center */}
        <g transform="translate(140, 195)">
          <circle cx="0" cy="0" r="25" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
          <path d="M -10,-4 C -6,-12 6,-12 10,-4 C 12,4 6,10 -2,10 C -10,10 -12,2 -10,-4 Z" fill="#F87171" stroke="#991B1B" strokeWidth="2" />
        </g>

        {/* Front Folding Wrap Flaps (White newspaper style cone) */}
        <path d="M 60,190 L 140,335 L 125,230 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 220,190 L 140,335 L 155,230 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 90,210 L 140,340 L 190,210 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round" />

        {/* Wrapping Fold Crease & Paper Rim */}
        <path d="M 80,210 Q 140,230 200,210" stroke="#94A3B8" strokeWidth="3" fill="none" />

        {/* Stems poking from bottom */}
        <line x1="135" y1="340" x2="132" y2="375" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
        <line x1="140" y1="340" x2="140" y2="380" stroke="#166534" strokeWidth="6" strokeLinecap="round" />
        <line x1="145" y1="340" x2="148" y2="375" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />

        {/* Dior-style Black Satin Ribbon with White Trim */}
        <g transform="translate(140, 260)">
          {/* Ribbon Bow Left */}
          <path d="M 0,0 C -30,-20 -55,-5 -25,15 C -10,20 0,5 0,0 Z" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
          {/* Ribbon Bow Right */}
          <path d="M 0,0 C 30,-20 55,-5 25,15 C 10,20 0,5 0,0 Z" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
          {/* Ribbon Center Knot */}
          <circle cx="0" cy="0" r="9" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
          {/* Ribbon Tails hanging down */}
          <path d="M -5,5 Q -25,40 -20,80 L -8,75 Q -15,40 0,5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M 5,5 Q 25,40 20,80 L 8,75 Q 15,40 0,5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

// Bouquet 2: Cartoon Spring Meadow Pastel Bouquet (Matching Picture 3 Center)
export const CutoutBouquetSpring: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 280 400" className="w-full h-full filter drop-shadow-2xl" fill="none">
        {/* Outer Die-Cut White Sticker Outline Backing */}
        <path
          d="M 140,55 
             C 165,52 195,62 214,78 
             C 228,92 236,112 234,135 
             C 232,154 224,170 215,182 
             C 220,192 220,205 212,216 
             C 200,226 188,232 178,238 
             C 168,255 158,290 150,340 
             C 148,355 145,380 143,388 
             C 141,392 137,392 135,388 
             C 133,380 130,355 128,340 
             C 120,290 110,255 100,238 
             C 90,232 78,226 66,216 
             C 58,205 58,192 63,182 
             C 54,170 46,154 44,135 
             C 42,112 50,92 64,78 
             C 83,62 113,52 140,55 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="14"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Wrapping Paper Back Flap */}
        <polygon points="55,140 140,325 225,140 140,75" fill="#F8FAFC" stroke="#475569" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="45,150 140,335 235,150 140,85" fill="#F1F5F9" opacity="0.8" />

        {/* Baby's breath / chamomile sprigs */}
        <circle cx="90" cy="90" r="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="110" cy="80" r="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="170" cy="80" r="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="190" cy="90" r="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Green Foliage */}
        <ellipse cx="80" cy="120" rx="16" ry="10" fill="#86EFAC" stroke="#16A34A" strokeWidth="3" transform="rotate(-35 80 120)" />
        <ellipse cx="200" cy="120" rx="16" ry="10" fill="#86EFAC" stroke="#16A34A" strokeWidth="3" transform="rotate(35 200 120)" />

        {/* Pastel Pink Peony (Top Center) */}
        <g transform="translate(140, 100)">
          <circle cx="0" cy="0" r="26" fill="#F472B6" stroke="#BE185D" strokeWidth="3" />
          <circle cx="-6" cy="-4" r="14" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2" />
          <circle cx="6" cy="-4" r="14" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2" />
          <circle cx="0" cy="6" r="14" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="#FDE047" />
        </g>

        {/* Chamomile Daisy Left */}
        <g transform="translate(90, 135)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse key={i} cx="0" cy="-16" rx="6" ry="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" transform={`rotate(${angle})`} />
          ))}
          <circle cx="0" cy="0" r="10" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
        </g>

        {/* Lavender Hydrangea Cluster (Right) */}
        <g transform="translate(185, 135)">
          <circle cx="-10" cy="-10" r="12" fill="#C084FC" stroke="#7E22CE" strokeWidth="2" />
          <circle cx="10" cy="-10" r="12" fill="#E9D5FF" stroke="#7E22CE" strokeWidth="2" />
          <circle cx="-10" cy="10" r="12" fill="#E9D5FF" stroke="#7E22CE" strokeWidth="2" />
          <circle cx="10" cy="10" r="12" fill="#C084FC" stroke="#7E22CE" strokeWidth="2" />
          <circle cx="0" cy="0" r="10" fill="#A855F7" stroke="#6B21A8" strokeWidth="2" />
        </g>

        {/* Soft Peach Rose (Center) */}
        <g transform="translate(140, 160)">
          <circle cx="0" cy="0" r="28" fill="#FDBA74" stroke="#C2410C" strokeWidth="3" />
          <path d="M -12,-6 C -8,-16 8,-16 12,-6 C 16,4 8,14 -2,14 C -12,14 -15,4 -12,-6 Z" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <circle cx="0" cy="0" r="8" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5" />
        </g>

        {/* Pastel Daisy Bottom */}
        <g transform="translate(100, 195)">
          <circle cx="0" cy="0" r="18" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="8" fill="#F59E0B" />
        </g>

        {/* Baby Blue Flower Bottom Right */}
        <g transform="translate(180, 190)">
          <circle cx="0" cy="0" r="20" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="7" fill="#FFFFFF" />
        </g>

        {/* White Newspaper/Magazine Art Paper Wrap */}
        <path d="M 65,190 L 140,335 L 125,230 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 215,190 L 140,335 L 155,230 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 90,215 L 140,340 L 190,215 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round" />

        {/* Stems */}
        <line x1="134" y1="340" x2="130" y2="375" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
        <line x1="140" y1="340" x2="140" y2="380" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
        <line x1="146" y1="340" x2="150" y2="375" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />

        {/* Satin Pink Ribbon Bow */}
        <g transform="translate(140, 265)">
          <path d="M 0,0 C -30,-18 -55,-5 -25,15 C -10,20 0,5 0,0 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 C 30,-18 55,-5 25,15 C 10,20 0,5 0,0 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="8" fill="#EC4899" stroke="#9D174D" strokeWidth="2.5" />
          <path d="M -4,5 Q -20,35 -15,70" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 4,5 Q 20,35 15,70" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};

// Bouquet 3: Cartoon Pink Stargazer Lilies in Kraft Paper Wrap (Matching Picture 3 Right)
export const CutoutBouquetLilies: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 280 400" className="w-full h-full filter drop-shadow-2xl" fill="none">
        {/* Outer Die-Cut White Sticker Outline Backing */}
        <path
          d="M 140,25 
             C 165,22 198,35 218,55 
             C 235,74 246,98 244,125 
             C 242,146 232,165 220,178 
             C 225,188 226,202 216,215 
             C 205,226 190,232 180,240 
             C 170,260 160,300 150,350 
             C 148,365 145,390 143,398 
             C 141,402 137,402 135,398 
             C 133,390 130,365 128,350 
             C 118,300 108,260 98,240 
             C 88,232 73,226 62,215 
             C 52,202 53,188 58,178 
             C 46,165 36,146 34,125 
             C 32,98 43,74 60,55 
             C 80,35 113,22 140,25 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="14"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Brown Kraft Paper Back Cone */}
        <polygon points="60,140 140,335 220,140 140,80" fill="#D97706" opacity="0.9" stroke="#78350F" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="50,150 140,345 230,150 140,90" fill="#B45309" opacity="0.6" />

        {/* Long Lily Stems & Leaves */}
        <path d="M 100,100 Q 80,60 60,70 Q 75,95 100,110" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
        <path d="M 180,100 Q 200,60 220,70 Q 205,95 180,110" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
        <path d="M 140,70 Q 140,30 135,20 Q 145,40 140,70" fill="#16A34A" stroke="#14532D" strokeWidth="2" />

        {/* Lily 1: Top Center Pink Stargazer */}
        <g transform="translate(140, 95)">
          {/* 6 Pointed Lily Petals */}
          <path d="M 0,0 Q -10,-40 0,-50 Q 10,-40 0,0" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M 0,0 Q 35,-30 45,-25 Q 35,-10 0,0" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M 0,0 Q 35,20 40,30 Q 20,25 0,0" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M 0,0 Q -10,35 0,45 Q 10,35 0,0" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M 0,0 Q -35,20 -40,30 Q -20,25 0,0" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M 0,0 Q -35,-30 -45,-25 Q -35,-10 0,0" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.5" />
          {/* Inner spots and yellow pistils */}
          <circle cx="0" cy="0" r="7" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="-5" cy="-8" r="1.5" fill="#9F1239" />
          <circle cx="5" cy="-8" r="1.5" fill="#9F1239" />
          <circle cx="-8" cy="4" r="1.5" fill="#9F1239" />
          <circle cx="8" cy="4" r="1.5" fill="#9F1239" />
        </g>

        {/* Lily 2: Left Pink Lily */}
        <g transform="translate(95, 140)">
          <path d="M 0,0 Q -10,-35 0,-42 Q 10,-35 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q 30,-20 38,-15 Q 28,-5 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q 25,20 30,28 Q 15,20 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q -8,30 0,38 Q 8,30 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q -25,20 -30,28 Q -15,20 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q -30,-20 -38,-15 Q -28,-5 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="6" fill="#FDE047" />
        </g>

        {/* Lily 3: Right Pink Lily */}
        <g transform="translate(185, 140)">
          <path d="M 0,0 Q -10,-35 0,-42 Q 10,-35 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q 30,-20 38,-15 Q 28,-5 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q 25,20 30,28 Q 15,20 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q -8,30 0,38 Q 8,30 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q -25,20 -30,28 Q -15,20 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M 0,0 Q -30,-20 -38,-15 Q -28,-5 0,0" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="6" fill="#FDE047" />
        </g>

        {/* Center Lily Bud */}
        <g transform="translate(140, 175)">
          <circle cx="0" cy="0" r="16" fill="#FB7185" stroke="#9F1239" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="7" fill="#FDE047" />
        </g>

        {/* Rustic Brown Kraft Paper Wrapping (Cone shape) */}
        <path d="M 70,185 L 140,345 L 120,230 Z" fill="#D97706" stroke="#78350F" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 210,185 L 140,345 L 160,230 Z" fill="#B45309" stroke="#78350F" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 90,210 L 140,350 L 190,210 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="3.5" strokeLinejoin="round" />

        {/* Paper creases */}
        <line x1="110" y1="230" x2="140" y2="330" stroke="#78350F" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="170" y1="230" x2="140" y2="330" stroke="#78350F" strokeWidth="2" strokeDasharray="3 3" />

        {/* Bottom Stems */}
        <line x1="135" y1="350" x2="132" y2="385" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
        <line x1="140" y1="350" x2="140" y2="390" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
        <line x1="145" y1="350" x2="148" y2="385" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />

        {/* Natural Twine/Raffia Ribbon Bow */}
        <g transform="translate(140, 275)">
          <ellipse cx="-20" cy="-6" rx="18" ry="8" fill="none" stroke="#78350F" strokeWidth="3.5" transform="rotate(-15 -20 -6)" />
          <ellipse cx="20" cy="-6" rx="18" ry="8" fill="none" stroke="#78350F" strokeWidth="3.5" transform="rotate(15 20 -6)" />
          <circle cx="0" cy="0" r="5" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
          <path d="M -3,4 Q -15,30 -12,65" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 3,4 Q 15,30 12,65" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};
