import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { PastelDoodleStars, CuteBunny } from './CuteDoodles.tsx';
import { cuteAudio } from '../utils/audio.ts';
import { BouquetData } from '../types.ts';

interface CelebrationPopoutProps {
  bouquet: BouquetData;
  onContinue: () => void;
}

export const CelebrationPopout: React.FC<CelebrationPopoutProps> = ({ bouquet, onContinue }) => {
  useEffect(() => {
    cuteAudio.playSuccess();

    // Fire fireworks celebration confetti
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: number = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      confetti({
        particleCount: 40,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fed7aa', '#a7f3d0'],
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-pastel-stripes flex flex-col items-center justify-between p-6 sm:p-10 overflow-hidden select-none">
      <PastelDoodleStars count={14} />

      {/* Top Tagline */}
      <div className="w-full flex items-center justify-center z-10 py-2">
        <span className="text-xs sm:text-sm font-bold text-pink-500 font-bubble tracking-wider uppercase bg-white/80 px-4 py-1 rounded-full border border-pink-200 shadow-sm">
          ✨ Special Delivery Just For You ✨
        </span>
      </div>

      {/* Center Celebration Content (Matching Image 4) */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-2xl text-center px-4">
        {/* Animated Flying Photos preview: pictures swooping in together from different corners */}
        <div className="relative w-72 h-44 sm:w-88 sm:h-52 mb-4 mx-auto flex items-center justify-center">
          {bouquet.photos.slice(0, 3).map((photo, pIdx) => {
            const animClasses = ['anim-fly-top-left', 'anim-fly-top-right', 'anim-fly-bottom-left'];
            const rotValues = ['-8deg', '6deg', '-2deg'];
            const zIndices = [10, 20, 15];
            const delays = ['0.1s', '0.3s', '0.5s'];

            return (
              <div
                key={photo.id}
                className={`absolute w-24 sm:w-28 polaroid-card shadow-lg ${animClasses[pIdx]}`}
                style={
                  {
                    '--target-rot': rotValues[pIdx],
                    animationDelay: delays[pIdx],
                    zIndex: zIndices[pIdx],
                    left: pIdx === 0 ? '10%' : pIdx === 1 ? '55%' : '35%',
                    top: pIdx === 2 ? '30%' : '10%',
                  } as React.CSSProperties
                }
              >
                <div className="w-full aspect-square overflow-hidden rounded-sm bg-pink-100">
                  <img src={photo.url} alt="flying preview" className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative Doodled Hearts around title */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <svg viewBox="0 0 50 50" className="w-8 h-8 text-pink-500 animate-pulse">
            <path
              d="M 25,14 C 25,14 16,3 7,9 C -1,15 0,26 12,36 C 18,41 25,47 25,47 C 25,47 32,41 38,36 C 50,26 51,15 43,9 C 34,3 25,14 25,14 Z"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-pink-400 font-handwriting text-2xl">for my favorite person</span>
          <svg viewBox="0 0 50 50" className="w-8 h-8 text-pink-500 animate-pulse">
            <path
              d="M 25,14 C 25,14 16,3 7,9 C -1,15 0,26 12,36 C 18,41 25,47 25,47 C 25,47 32,41 38,36 C 50,26 51,15 43,9 C 34,3 25,14 25,14 Z"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Big Celebration Title in handwritten brush cursive matching Image 4: "happy Boyfriend's Day" */}
        <div className="relative mb-4 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-cursive text-rose-500 font-bold tracking-wide drop-shadow-sm leading-tight">
            happy
          </h1>
          <h2 className="text-5xl sm:text-8xl md:text-9xl font-bubble text-bubble-pink tracking-tight -mt-3 sm:-mt-6">
            Boyfriend&apos;s
          </h2>
          <h3 className="text-4xl sm:text-7xl md:text-8xl font-cursive text-rose-500 font-bold tracking-wide -mt-2 sm:-mt-5">
            Day
          </h3>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto mb-6 font-handwriting text-2xl sm:text-3xl text-pink-600">
          You picked the <span className="font-bold underline">{bouquet.flowerType}</span>! Our memory collage is assembling for you...
        </p>

        {/* Action Button to Open Scrapbook */}
        <button
          onClick={() => {
            cuteAudio.playPop(650);
            onContinue();
          }}
          className="btn-jelly-red px-8 sm:px-12 py-3.5 sm:py-4 text-xl sm:text-2xl tracking-wide flex items-center gap-3 group active:scale-95 shadow-xl cursor-pointer"
        >
          <span>Open Full Scrapbook</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* Cute White Bunny peeking from bottom right (Matching Image 4) */}
      <div className="absolute bottom-2 right-4 sm:right-12 z-20 pointer-events-none transform translate-y-3 hover:translate-y-0 transition-transform">
        <CuteBunny className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64" holding="flower" />
      </div>
    </div>
  );
};
