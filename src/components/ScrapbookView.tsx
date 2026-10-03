import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Sparkles, X, MessageSquareHeart, Maximize2, LayoutGrid, HeartHandshake } from 'lucide-react';
import { BouquetData, CollagePhoto } from '../types.ts';
import { PastelDoodleStars, CuteBunny, ConversationHeart } from './CuteDoodles.tsx';
import { cuteAudio } from '../utils/audio.ts';

interface ScrapbookViewProps {
  bouquet: BouquetData;
  allBouquets: BouquetData[];
  onSelectBouquet: (bouquet: BouquetData) => void;
  onBackToBouquets: () => void;
  onOpenGuestbook: () => void;
  onOpenAdmin: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

export const ScrapbookView: React.FC<ScrapbookViewProps> = ({
  bouquet,
  allBouquets,
  onSelectBouquet,
  onBackToBouquets,
  onOpenGuestbook,
  onOpenAdmin,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CollagePhoto | null>(null);
  const [pocketActive, setPocketActive] = useState(false);
  const [forceHeartView, setForceHeartView] = useState(bouquet.theme === 'heart-collage');

  const currentIdx = allBouquets.findIndex((b) => b.id === bouquet.id);

  const goToNextBouquet = () => {
    cuteAudio.playPop(550);
    const nextIdx = (currentIdx + 1) % allBouquets.length;
    onSelectBouquet(allBouquets[nextIdx]);
  };

  const goToPrevBouquet = () => {
    cuteAudio.playPop(550);
    const prevIdx = (currentIdx - 1 + allBouquets.length) % allBouquets.length;
    onSelectBouquet(allBouquets[prevIdx]);
  };

  const openPhotoModal = (photo: CollagePhoto) => {
    cuteAudio.playPop(680);
    setSelectedPhoto(photo);
  };

  // Helper for dynamic fly-in animation classes
  const getFlyInClass = (index: number) => {
    const patterns = [
      'anim-fly-top-left',
      'anim-fly-top-right',
      'anim-fly-bottom-left',
      'anim-fly-bottom-right',
      'anim-fly-center',
    ];
    return patterns[index % patterns.length];
  };

  const isHeartTheme = bouquet.theme === 'heart-collage' || forceHeartView;

  return (
    <div
      key={bouquet.id} // forces clean animation re-trigger when switching bouquets
      className={`relative min-h-screen flex flex-col justify-between p-3 sm:p-6 select-none transition-colors duration-500 overflow-x-hidden ${
        bouquet.theme === 'denim-letter' && !forceHeartView
          ? 'denim-scrapbook-bg text-slate-100'
          : 'bg-pastel-stripes text-slate-800'
      }`}
    >
      {(!bouquet.theme || bouquet.theme !== 'denim-letter' || forceHeartView) && <PastelDoodleStars count={12} />}

      {/* Top Scrapbook Navigation Bar */}
      <header className="relative z-30 w-full max-w-6xl mx-auto flex items-center justify-between py-2 px-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-pink-200">
        <button
          onClick={() => {
            cuteAudio.playPop(480);
            onBackToBouquets();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bouquets</span>
        </button>

        {/* Bouquet Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {allBouquets.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => {
                cuteAudio.playPop(520);
                onSelectBouquet(b);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                b.id === bouquet.id
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>{idx + 1}. {b.flowerType.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Heart Shape Toggle */}
          <button
            onClick={() => {
              cuteAudio.playPop(500);
              setForceHeartView(!forceHeartView);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
              isHeartTheme
                ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                : 'bg-white text-rose-600 border-pink-200 hover:bg-pink-50'
            }`}
            title="Toggle Heart Shaped Collage"
          >
            <Heart className={`w-3.5 h-3.5 ${isHeartTheme ? 'fill-white' : 'fill-rose-500'}`} />
            <span className="hidden sm:inline">{isHeartTheme ? 'Heart Mode' : 'Make Heart'}</span>
          </button>

          <button
            onClick={onOpenGuestbook}
            className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Guest Book</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-6xl mx-auto my-auto py-6">
        {/* ========================================================= */}
        {/* THEME: HEART-SHAPED COLLAGE (Requested by User) */}
        {/* ========================================================= */}
        {isHeartTheme && (
          <div className="relative flex flex-col items-center">
            {/* Header banner */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-600 font-bubble text-xs font-bold rounded-full mb-1">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                <span>Our Heart Shaped Memory Wall</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bubble text-pink-600 font-bold">
                {bouquet.title}
              </h2>
              <p className="text-pink-400 font-handwriting text-xl sm:text-2xl mt-1">
                &ldquo;{bouquet.quote || 'You hold all the pieces of my heart.'}&rdquo;
              </p>
            </div>

            {/* HEART SHAPED FORMATION CONTAINER */}
            <div className="relative w-full max-w-4xl min-h-[520px] sm:min-h-[640px] flex items-center justify-center p-2">
              {/* Subtle Glowing Heart Outline Graphic in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-lg">
                  <path
                    d="M 50,28 C 50,28 32,8 15,16 C -2,25 0,48 22,68 C 34,79 50,90 50,90 C 50,90 66,79 78,68 C 100,48 102,25 85,16 C 68,8 50,28 50,28 Z"
                    fill="none"
                    stroke="#F43F5E"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>

              {/* Heart Formation Slots: photos fly in together from outside and lock into heart positions */}
              {/* Desktop / Tablet Heart Formation */}
              <div className="relative w-full max-w-2xl h-[560px] sm:h-[620px] hidden md:block">
                {/* Center token in the heart */}
                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-3xl border-2 border-pink-300 shadow-lg transform rotate-2 animate-pulse">
                    <span className="text-3xl block">💖</span>
                    <span className="font-bubble font-bold text-xs text-pink-600 block mt-1">
                      Forever Yours
                    </span>
                  </div>
                </div>

                {bouquet.photos.slice(0, 9).map((photo, pIdx) => {
                  // Parametric Heart coordinates [left%, top%, rotate deg]
                  const heartSlots = [
                    { left: '22%', top: '8%', rot: -12 },  // Top-left curve
                    { left: '78%', top: '8%', rot: 12 },   // Top-right curve
                    { left: '50%', top: '6%', rot: 0 },    // Top-center dip
                    { left: '10%', top: '30%', rot: -18 }, // Far left lobe
                    { left: '90%', top: '30%', rot: 18 },  // Far right lobe
                    { left: '18%', top: '56%', rot: -14 }, // Lower left curve
                    { left: '82%', top: '56%', rot: 14 },  // Lower right curve
                    { left: '32%', top: '78%', rot: -8 },  // Bottom left taper
                    { left: '50%', top: '88%', rot: 0 },   // Bottom V-tip point!
                  ];

                  const slot = heartSlots[pIdx] || heartSlots[pIdx % heartSlots.length];
                  const flyClass = getFlyInClass(pIdx);

                  return (
                    <div
                      key={photo.id}
                      onClick={() => openPhotoModal(photo)}
                      className={`absolute w-36 sm:w-40 polaroid-card cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${flyClass}`}
                      style={
                        {
                          left: slot.left,
                          top: slot.top,
                          '--target-rot': `${slot.rot}deg`,
                          animationDelay: `${0.1 + pIdx * 0.12}s`,
                          zIndex: 10 + pIdx,
                        } as React.CSSProperties
                      }
                      title="Click photo to enlarge"
                    >
                      <div className="relative w-full aspect-square bg-pink-100 overflow-hidden rounded-sm">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-1 right-1 p-1 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="pt-2 pb-0.5 text-center">
                        <p className="text-[11px] font-bold text-slate-800 font-bubble truncate">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Responsive Heart Grid */}
              <div className="md:hidden flex flex-col items-center gap-3 w-full">
                {/* Row 1: Top 2 Lobes */}
                <div className="flex justify-center gap-4 w-full">
                  {bouquet.photos.slice(0, 2).map((photo, idx) => (
                    <div
                      key={photo.id}
                      onClick={() => openPhotoModal(photo)}
                      className="polaroid-card w-36 cursor-pointer"
                      style={{ transform: `rotate(${idx === 0 ? -8 : 8}deg)` }}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-sm bg-pink-100">
                        <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-800 font-bubble mt-1.5 truncate text-center">
                        {photo.caption}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Row 2: Heart Center with Sweet Note */}
                <div className="my-1 text-center bg-white/95 px-4 py-2 rounded-2xl border-2 border-pink-300 shadow-sm animate-pulse">
                  <span className="text-xl">💖</span>
                  <span className="text-xs font-bold text-pink-600 block font-bubble">
                    Every Photo, A Piece of My Heart
                  </span>
                </div>

                {/* Row 3: Middle Curve */}
                <div className="flex justify-center gap-3 w-full">
                  {bouquet.photos.slice(2, 5).map((photo, idx) => (
                    <div
                      key={photo.id}
                      onClick={() => openPhotoModal(photo)}
                      className="polaroid-card w-28 cursor-pointer"
                      style={{ transform: `rotate(${idx === 0 ? -12 : idx === 2 ? 12 : 0}deg)` }}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-sm bg-pink-100">
                        <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[9px] font-bold text-slate-800 font-bubble mt-1 truncate text-center">
                        {photo.caption}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Row 4: Lower Taper */}
                <div className="flex justify-center gap-4 w-full mt-1">
                  {bouquet.photos.slice(5, 7).map((photo, idx) => (
                    <div
                      key={photo.id}
                      onClick={() => openPhotoModal(photo)}
                      className="polaroid-card w-32 cursor-pointer"
                      style={{ transform: `rotate(${idx === 0 ? -8 : 8}deg)` }}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-sm bg-pink-100">
                        <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-800 font-bubble mt-1 truncate text-center">
                        {photo.caption}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Row 5: Tip of the Heart */}
                {bouquet.photos[7] && (
                  <div
                    onClick={() => openPhotoModal(bouquet.photos[7])}
                    className="polaroid-card w-36 cursor-pointer mt-1"
                  >
                    <div className="w-full aspect-square overflow-hidden rounded-sm bg-pink-100">
                      <img src={bouquet.photos[7].url} alt={bouquet.photos[7].caption} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-800 font-bubble mt-1 truncate text-center">
                      {bouquet.photos[7].caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Conversation Heart sticker & Cute Bunny */}
            <div className="flex flex-wrap items-center justify-between w-full max-w-4xl mt-6 px-4">
              <div className="flex items-center gap-3">
                <CuteBunny className="w-28 h-28 sm:w-36 sm:h-36" holding="heart" />
                <div className="relative bg-white border-2 border-pink-300 rounded-2xl px-3 py-1.5 text-pink-600 font-bubble font-bold text-xs shadow-md animate-bounce">
                  <span>My Whole Heart! 💕</span>
                </div>
              </div>
              <div className="transform rotate-6 hover:scale-110 transition-transform">
                <ConversationHeart text="LOVE IS WHEREVER YOU ARE" className="w-24 h-24 sm:w-28 sm:h-28" />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* THEME 1: Denim Pocket & "Dear Love" Letter (Matching Image 5) */}
        {/* ========================================================= */}
        {!isHeartTheme && bouquet.theme === 'denim-letter' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Denim Pocket with photos sticking out (Matching Image 5) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="relative w-72 sm:w-80 h-96 cursor-pointer group"
                onClick={() => setPocketActive(!pocketActive)}
                title="Click pocket to pull photos!"
              >
                {/* 3 Polaroid photos poking out of the jeans pocket with fly-in animation */}
                {bouquet.photos.slice(0, 3).map((photo, pIdx) => {
                  const offsets = [
                    { left: '4%', top: '-18%', rotate: -8, z: 12 },
                    { left: '32%', top: '-24%', rotate: 4, z: 14 },
                    { left: '55%', top: '-14%', rotate: 10, z: 13 },
                  ];
                  const pos = offsets[pIdx] || offsets[0];
                  const flyClass = getFlyInClass(pIdx);

                  return (
                    <div
                      key={photo.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openPhotoModal(photo);
                      }}
                      className={`absolute w-36 sm:w-40 polaroid-card cursor-pointer transform transition-all duration-300 ${flyClass} ${
                        pocketActive ? 'translate-y-[-16px] scale-105' : ''
                      }`}
                      style={
                        {
                          left: pos.left,
                          top: pos.top,
                          '--target-rot': `${pos.rotate}deg`,
                          animationDelay: `${0.1 + pIdx * 0.15}s`,
                          zIndex: pos.z,
                        } as React.CSSProperties
                      }
                    >
                      <div className="w-full aspect-square bg-slate-200 overflow-hidden rounded-sm">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-2 text-[10px] text-slate-700 font-handwriting text-center truncate">
                        {photo.caption}
                      </p>
                    </div>
                  );
                })}

                {/* Denim Pocket graphic */}
                <div className="absolute bottom-0 left-0 right-0 h-64 z-20 rounded-b-3xl border-4 border-[#1e293b] shadow-2xl overflow-hidden bg-[#243548]">
                  <img
                    src="/src/assets/images/denim_scrapbook_pocket_1791037920367.jpg"
                    alt="Denim Pocket"
                    className="w-full h-full object-cover opacity-90 contrast-125"
                  />
                  <div className="absolute top-0 inset-x-0 h-4 border-b-2 border-dashed border-amber-400 bg-[#1e293b]/70" />
                  <div className="absolute -top-4 left-3 z-30">
                    <svg viewBox="0 0 60 70" className="w-12 h-14 drop-shadow-md">
                      <path
                        d="M 30,5 C 45,5 55,18 55,30 C 55,45 35,58 30,62 C 25,58 5,45 5,30 C 5,18 15,5 30,5 Z"
                        fill="#60A5FA"
                        stroke="#2563EB"
                        strokeWidth="2"
                      />
                      <ellipse cx="22" cy="18" rx="5" ry="8" fill="#93C5FD" opacity="0.75" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 inset-x-0 text-center z-30">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs font-bold text-blue-200 font-bubble">
                      Tap photos to view enlarged 📸
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: "Dear Love" Handwritten Love Letter (Matching Image 5) */}
            <div className="lg:col-span-7">
              <div className="relative bg-white text-slate-800 p-6 sm:p-10 rounded-2xl shadow-2xl border-4 border-blue-200 transform sm:rotate-1 animate-scaleIn">
                <div className="absolute -top-5 -right-4 z-20">
                  <svg viewBox="0 0 50 50" className="w-12 h-12 text-blue-300 drop-shadow-md">
                    <polygon
                      points="25,2 32,18 49,19 36,31 40,48 25,38 10,48 14,31 1,19 18,18"
                      fill="#93C5FD"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="absolute -bottom-4 -right-3 z-20 pointer-events-none">
                  <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-md">
                    <path
                      d="M 40,35 C 20,15 5,35 25,48 C 35,52 40,38 40,35 Z"
                      fill="#BFDBFE"
                      stroke="#60A5FA"
                      strokeWidth="2"
                    />
                    <path
                      d="M 40,35 C 60,15 75,35 55,48 C 45,52 40,38 40,35 Z"
                      fill="#BFDBFE"
                      stroke="#60A5FA"
                      strokeWidth="2"
                    />
                    <circle cx="40" cy="36" r="6" fill="#3B82F6" />
                    <path d="M 38,40 Q 30,65 15,75" stroke="#60A5FA" strokeWidth="3" fill="none" />
                    <path d="M 42,40 Q 50,65 65,75" stroke="#60A5FA" strokeWidth="3" fill="none" />
                  </svg>
                </div>

                <div className="border-b-2 border-blue-400 pb-2 mb-4">
                  <h2 className="text-3xl sm:text-5xl font-handwriting text-blue-900 font-bold tracking-wide">
                    {bouquet.letterTitle}
                  </h2>
                </div>

                <div
                  className="font-handwriting text-lg sm:text-2xl text-slate-700 leading-relaxed space-y-4 whitespace-pre-line"
                  style={{
                    backgroundImage: 'linear-gradient(transparent 95%, rgba(147, 197, 253, 0.3) 95%)',
                    backgroundSize: '100% 2.2rem',
                    lineHeight: '2.2rem',
                  }}
                >
                  <p>{bouquet.letterContent}</p>
                </div>

                <div className="mt-6 text-right font-handwriting text-2xl sm:text-3xl text-blue-800 font-bold">
                  <span>{bouquet.letterSignOff}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* THEME 2: Pastel Photo Mosaic & Cute Bunny (Matching Image 6) */}
        {/* ========================================================= */}
        {!isHeartTheme && bouquet.theme === 'pastel-grid' && (
          <div className="relative">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-bubble text-pink-600 font-bold">
                {bouquet.title}
              </h2>
              <p className="text-pink-400 font-handwriting text-xl sm:text-2xl mt-1">
                &ldquo;{bouquet.quote}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-center max-w-5xl mx-auto px-4">
              {bouquet.photos.map((photo, idx) => {
                const rotations = [-4, 5, -3, 6, -5, 4];
                const rot = photo.rotation || rotations[idx % rotations.length];
                const flyClass = getFlyInClass(idx);

                return (
                  <div
                    key={photo.id}
                    onClick={() => openPhotoModal(photo)}
                    className={`polaroid-card cursor-pointer group transform transition-all duration-300 ${flyClass}`}
                    style={
                      {
                        '--target-rot': `${rot}deg`,
                        animationDelay: `${0.1 + idx * 0.12}s`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="relative w-full aspect-square bg-pink-100 overflow-hidden rounded-sm">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 p-1.5 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="pt-3 pb-1 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 font-bubble">
                        {photo.caption}
                      </p>
                      {photo.date && (
                        <p className="text-[11px] text-pink-500 font-handwriting mt-0.5">
                          {photo.date}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between mt-8 px-6">
              <div className="flex items-center gap-3">
                <CuteBunny className="w-32 h-32 sm:w-40 sm:h-40" holding="heart" />
                <div className="relative bg-white border-2 border-pink-300 rounded-2xl px-4 py-2 text-pink-600 font-bubble font-bold text-sm shadow-md animate-bounce">
                  <span>how cute! 💕</span>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-r-8 border-r-white border-b-6 border-b-transparent" />
                </div>
              </div>
              <div className="transform rotate-6 hover:scale-110 transition-transform">
                <ConversationHeart text="LOVE IS WHEREVER YOU ARE" className="w-28 h-28 sm:w-32 sm:h-32" />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* THEME 3: Polaroid Fairy Lights & Love Coupons */}
        {/* ========================================================= */}
        {!isHeartTheme && bouquet.theme === 'polaroid-lights' && (
          <div className="relative">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-bubble text-pink-600 font-bold">
                {bouquet.title}
              </h2>
              <p className="text-pink-400 font-handwriting text-xl sm:text-2xl mt-1">
                &ldquo;{bouquet.quote}&rdquo;
              </p>
            </div>

            <div className="relative w-full max-w-4xl mx-auto mb-8">
              <div className="h-0.5 w-full bg-amber-300 shadow-[0_0_10px_#fde047]" />
              <div className="flex justify-between items-center -mt-2 px-6">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_12px_#facc15] animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 mb-10">
              {bouquet.photos.map((photo, idx) => {
                const flyClass = getFlyInClass(idx);
                const rot = idx % 2 === 0 ? -3 : 4;

                return (
                  <div
                    key={photo.id}
                    onClick={() => openPhotoModal(photo)}
                    className={`relative polaroid-card cursor-pointer group ${flyClass}`}
                    style={
                      {
                        '--target-rot': `${rot}deg`,
                        animationDelay: `${0.1 + idx * 0.15}s`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-rose-200/90 border border-rose-300 transform -rotate-2 z-20 shadow-sm" />
                    <div className="relative w-full aspect-square bg-pink-50 overflow-hidden rounded-sm">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="pt-3 pb-1 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 font-bubble">
                        {photo.caption}
                      </p>
                      <p className="text-[11px] text-pink-500 font-handwriting mt-0.5">
                        {photo.date || 'Sweet moment'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-md border-2 border-pink-200">
              <h3 className="text-xl font-bubble text-pink-600 font-bold text-center mb-4 flex items-center justify-center gap-2">
                <span>🎟️ Special Boyfriend Day Coupons 🎟️</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: '1,000 Kisses & Cuddles',
                    desc: 'Redeemable anytime, no expiry date!',
                    color: 'bg-pink-50 border-pink-300 text-pink-700',
                  },
                  {
                    title: 'Dinner Date of Your Choice',
                    desc: 'You pick whatever delicious food you want!',
                    color: 'bg-amber-50 border-amber-300 text-amber-800',
                  },
                  {
                    title: 'Late Night Gaming & Snacks',
                    desc: 'I bring you snacks and cheer for you!',
                    color: 'bg-purple-50 border-purple-300 text-purple-800',
                  },
                ].map((coupon, cIdx) => (
                  <div
                    key={cIdx}
                    className={`p-4 rounded-2xl border-2 border-dashed ${coupon.color} relative overflow-hidden`}
                  >
                    <div className="font-bubble font-bold text-sm mb-1">{coupon.title}</div>
                    <div className="text-xs font-medium opacity-80">{coupon.desc}</div>
                    <div className="mt-3 text-[10px] uppercase font-bold tracking-widest text-right opacity-60">
                      VALID FOREVER
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation between bouquets */}
      <footer className="relative z-30 w-full max-w-6xl mx-auto flex items-center justify-between py-3 px-4 mt-6">
        <button
          onClick={goToPrevBouquet}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-pink-600 font-bubble text-xs sm:text-sm font-bold rounded-2xl shadow-sm border border-pink-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Bouquet</span>
        </button>

        <span className="text-xs text-pink-500 font-bold font-bubble">
          {currentIdx + 1} of {allBouquets.length}
        </span>

        <button
          onClick={goToNextBouquet}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-pink-600 font-bubble text-xs sm:text-sm font-bold rounded-2xl shadow-sm border border-pink-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Next Bouquet</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* Lightbox Photo Zoom Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl p-4 sm:p-6 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full aspect-[4/3] sm:aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center">
              <h4 className="text-lg sm:text-xl font-bold font-bubble text-slate-800">
                {selectedPhoto.caption}
              </h4>
              {selectedPhoto.date && (
                <p className="text-sm font-handwriting text-2xl text-pink-500 mt-1">
                  {selectedPhoto.date}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
