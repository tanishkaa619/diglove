import React, { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, Volume2, VolumeX, Settings, RotateCcw } from 'lucide-react';
import { BouquetData } from '../types.ts';
import { PastelDoodleStars, CutoutBouquetRoses, CutoutBouquetSpring, CutoutBouquetLilies } from './CuteDoodles.tsx';
import { BouquetCutoutWrapper } from './BouquetCutoutWrapper.tsx';
import { cuteAudio } from '../utils/audio.ts';

interface BouquetSelectScreenProps {
  bouquets: BouquetData[];
  onSelectBouquet: (bouquet: BouquetData) => void;
  onOpenGuestbook: () => void;
  onOpenAdmin: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onResetBouquetCutout?: (bouquetId: string) => void;
}

export const BouquetSelectScreen: React.FC<BouquetSelectScreenProps> = ({
  bouquets,
  onSelectBouquet,
  onOpenGuestbook,
  onOpenAdmin,
  isMusicPlaying,
  onToggleMusic,
  onResetBouquetCutout,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleBouquetClick = (bouquet: BouquetData) => {
    cuteAudio.playPop(620);
    onSelectBouquet(bouquet);
  };

  const nextSlide = () => {
    cuteAudio.playPop(480);
    setActiveSlide((prev) => (prev + 1) % bouquets.length);
  };

  const prevSlide = () => {
    cuteAudio.playPop(480);
    setActiveSlide((prev) => (prev - 1 + bouquets.length) % bouquets.length);
  };

  // Render user's custom uploaded bouquet image or authentic transparent cutout cartoon bouquet
  const renderCutoutBouquet = (bouquet: BouquetData, idx: number) => {
    // If the user uploaded their own bouquet picture in the admin dashboard, ALWAYS apply the bouquet cutout silhouette!
    if (bouquet.customImage) {
      return (
        <BouquetCutoutWrapper
          id={bouquet.id}
          imageUrl={bouquet.customImage}
          alt={bouquet.title}
          cutoutMode={bouquet.cutoutMode || 'bouquet-silhouette'}
          flowerType={bouquet.flowerType}
        />
      );
    }

    // Default authentic cutout cartoon vectors with white die-cut sticker outlines
    if (bouquet.id === 'roses' || idx === 0) {
      return <CutoutBouquetRoses className="w-full h-full drop-shadow-2xl" />;
    }
    if (bouquet.id === 'spring' || idx === 1) {
      return <CutoutBouquetSpring className="w-full h-full drop-shadow-2xl" />;
    }
    if (bouquet.id === 'lilies' || idx === 2) {
      return <CutoutBouquetLilies className="w-full h-full drop-shadow-2xl" />;
    }

    // Fallback image wrapped with cutout silhouette mask
    return (
      <BouquetCutoutWrapper
        id={bouquet.id}
        imageUrl={bouquet.image}
        alt={bouquet.title}
        cutoutMode="bouquet-silhouette"
        flowerType={bouquet.flowerType}
      />
    );
  };

  const hasAnyCustomImage = bouquets.some((b) => !!b.customImage);

  return (
    <div className="relative min-h-screen bg-pastel-stripes flex flex-col justify-between p-4 sm:p-8 overflow-hidden select-none">
      <PastelDoodleStars count={12} />

      {/* Top Header Navigation */}
      <div className="w-full flex items-center justify-between z-20 max-w-6xl mx-auto py-2">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">💐</span>
          <span className="font-bubble text-pink-600 font-bold text-sm sm:text-base tracking-wide hidden xs:inline">
            Boyfriend&apos;s Day Flower Stand
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick button to restore cartoon cutouts if custom images were uploaded */}
          {hasAnyCustomImage && onResetBouquetCutout && (
            <button
              onClick={() => {
                bouquets.forEach((b) => onResetBouquetCutout(b.id));
                cuteAudio.playPop(520);
              }}
              className="px-3 py-1.5 bg-white/95 hover:bg-white text-rose-600 border border-pink-200 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer"
              title="Switch all back to hand-drawn cartoon cutout bouquets"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Use Cartoon Cutouts</span>
            </button>
          )}

          <button
            onClick={onToggleMusic}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isMusicPlaying
                ? 'bg-pink-500 text-white border-pink-400 shadow-md animate-pulse'
                : 'bg-white text-slate-500 border-pink-200 hover:text-pink-600'
            }`}
            title={isMusicPlaying ? 'Mute Music' : 'Play Music'}
          >
            {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenGuestbook}
            className="px-3.5 py-1.5 bg-white/95 hover:bg-white text-pink-600 border border-pink-200 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
          >
            <span>💌</span>
            <span>Guest Book</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-pink-600 rounded-full border border-pink-200 transition-all hover:scale-105 cursor-pointer"
            title="Admin Dashboard"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Section: Title & 3 Cutout Bouquets */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-6xl mx-auto text-center px-2">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bubble text-bubble-pink tracking-wide uppercase flex items-center justify-center gap-3">
            <span>CLICK ON ANY BOUQUET TO OPEN</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-medium text-pink-500 font-handwriting text-xl sm:text-2xl">
            Each bouquet holds a secret collage &amp; scrapbook chapter of us! ✨
          </p>
        </div>

        {/* Bouquets Row */}
        <div className="relative w-full flex items-center justify-center">
          {/* Mobile Prev Arrow */}
          <button
            onClick={prevSlide}
            className="md:hidden absolute left-0 z-30 p-2 bg-white/90 text-pink-600 rounded-full shadow-lg border border-pink-200 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous bouquet"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Bouquet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 w-full max-w-4xl px-8 md:px-0">
            {bouquets.map((bouquet, idx) => {
              const isMobileActive = activeSlide === idx;
              const entranceClass =
                idx === 0
                  ? 'anim-bouquet-left'
                  : idx === 1
                  ? 'anim-bouquet-top'
                  : 'anim-bouquet-right';

              return (
                <div
                  key={bouquet.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleBouquetClick(bouquet)}
                  className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    !isMobileActive ? 'hidden md:flex' : 'flex'
                  } ${entranceClass}`}
                >
                  {/* Cutout Container: 100% ORGANIC CUTOUT SILHOUETTE, NO SQUARE BOX */}
                  <div className="relative w-56 sm:w-60 md:w-64 h-80 sm:h-92 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-y-3 group-hover:scale-105">
                    {/* Soft aura on hover only */}
                    <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Cutout Illustration or Custom Uploaded Cutout Bouquet */}
                    {renderCutoutBouquet(bouquet, idx)}

                    {/* Sparkle badge on hover */}
                    <div className="absolute top-2 right-4 z-20 bg-white/95 text-pink-500 rounded-full p-2 shadow-md border border-pink-200 opacity-0 group-hover:opacity-100 transform group-hover:rotate-12 transition-all">
                      <Sparkles className="w-4 h-4 fill-pink-400" />
                    </div>
                  </div>

                  {/* Bouquet Label / Name */}
                  <div className="mt-2 text-center flex flex-col items-center">
                    <span className="inline-block px-4 py-1.5 bg-white/95 text-slate-800 font-bubble text-sm sm:text-base font-bold rounded-full shadow-sm border border-pink-200 group-hover:border-pink-400 group-hover:text-pink-600 transition-colors">
                      {bouquet.flowerType}
                    </span>

                    {/* If custom image uploaded, provide a quick one-tap button to switch to cartoon cutout */}
                    {bouquet.customImage && onResetBouquetCutout && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onResetBouquetCutout(bouquet.id);
                          cuteAudio.playPop(420);
                        }}
                        className="mt-1 text-[11px] font-bold text-rose-600 bg-white/90 hover:bg-white px-2.5 py-0.5 rounded-full border border-pink-200 shadow-xs flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer"
                        title="Reset to cartoon vector bouquet cutout"
                      >
                        <span>🌸</span>
                        <span>Use Cartoon Cutout</span>
                      </button>
                    )}

                    <p className="mt-1 text-xs text-pink-400 font-medium">
                      {bouquet.theme === 'heart-collage'
                        ? '❤️ Heart Shaped Memory Collage'
                        : idx === 0
                        ? 'Chapter 1: Love Letter & Pocket'
                        : idx === 1
                        ? 'Chapter 2: Bunny Photo Mosaic'
                        : 'Chapter 3: Polaroid Fairy Lights'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Red Navigation Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all group cursor-pointer"
            title="Next Bouquet"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
          </button>
        </div>

        {/* Mobile carousel dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {bouquets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                activeSlide === idx ? 'bg-pink-600 w-6' : 'bg-pink-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 py-2 text-center text-xs text-pink-400 font-medium">
        <span>Click any cutout bouquet to open its memory scrapbook 💝</span>
      </div>
    </div>
  );
};
