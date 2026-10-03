import React from 'react';
import { PastelDoodleStars, CuteCryingCat } from './CuteDoodles.tsx';
import { cuteAudio } from '../utils/audio.ts';

interface RejectedScreenProps {
  onTryAgain: () => void;
}

export const RejectedScreen: React.FC<RejectedScreenProps> = ({ onTryAgain }) => {
  const handleTryAgain = () => {
    cuteAudio.playPop(520);
    onTryAgain();
  };

  return (
    <div className="relative min-h-screen bg-pastel-stripes flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden select-none">
      <PastelDoodleStars count={12} />

      <div className="w-full flex items-center justify-center z-10 max-w-4xl py-2">
        <span className="text-xs font-semibold text-pink-400 font-bubble tracking-wider uppercase">
          🥺 Someone is very heartbroken...
        </span>
      </div>

      {/* Main rejection box matching Image 2 */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-lg text-center">
        {/* Title: WHY DID YOU CLICK NO! */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bubble text-bubble-pink tracking-wide uppercase mb-4 sm:mb-6 animate-pulse">
          WHY DID YOU CLICK NO!
        </h1>

        {/* Crying Cat in Puddle of Tears */}
        <div className="relative my-2 sm:my-4">
          <CuteCryingCat className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96" />
        </div>

        {/* TRY AGAIN Jelly Button */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={handleTryAgain}
            className="btn-jelly-red px-12 sm:px-16 py-3.5 sm:py-4 text-2xl sm:text-3xl tracking-wider active:scale-95 animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            TRY AGAIN
          </button>
        </div>

        <p className="mt-4 text-sm font-medium text-pink-400 font-handwriting text-lg">
          (You have no choice anyway pookie! 💕)
        </p>
      </div>

      <div className="relative z-10 py-2 text-center text-xs text-slate-400 font-medium">
        <span>Click TRY AGAIN to make the kitty happy again</span>
      </div>
    </div>
  );
};
