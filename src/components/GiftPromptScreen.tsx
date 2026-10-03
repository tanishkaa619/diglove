import React from 'react';
import confetti from 'canvas-confetti';
import { PastelDoodleStars, CuteHappyCat } from './CuteDoodles.tsx';
import { cuteAudio } from '../utils/audio.ts';

interface GiftPromptScreenProps {
  onAccept: () => void;
  onReject: () => void;
  onOpenGuestbook: () => void;
  onOpenAdmin: () => void;
}

export const GiftPromptScreen: React.FC<GiftPromptScreenProps> = ({
  onAccept,
  onReject,
  onOpenGuestbook,
  onOpenAdmin,
}) => {
  const handleYes = () => {
    cuteAudio.playSuccess();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#f43f5e', '#fb7185', '#f472b6', '#fed7aa', '#ffffff'],
    });
    setTimeout(() => {
      onAccept();
    }, 400);
  };

  const handleNo = () => {
    cuteAudio.playSad();
    onReject();
  };

  return (
    <div className="relative min-h-screen bg-pastel-stripes flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden select-none">
      <PastelDoodleStars count={12} />

      {/* Top Bar with subtle guestbook/admin access */}
      <div className="w-full flex items-center justify-between z-10 max-w-4xl px-2">
        <span className="text-xs font-semibold text-pink-400 font-bubble tracking-wider uppercase">
          Happy Boyfriend&apos;s Day Special
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuestbook}
            className="px-3 py-1 bg-white/90 hover:bg-white text-pink-600 rounded-full text-xs font-semibold shadow-sm border border-pink-200 transition-all hover:scale-105"
          >
            💌 Guest Book
          </button>
          <button
            onClick={onOpenAdmin}
            className="p-1.5 bg-white/70 hover:bg-white text-slate-400 hover:text-pink-600 rounded-full text-xs shadow-sm border border-pink-200"
            title="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Center Card / Prompt (Matching Image 1) */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-lg text-center">
        {/* Title: PLEASE ACCEPT THE GIFT */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bubble text-bubble-pink tracking-wide uppercase mb-6 sm:mb-8 transition-transform hover:scale-105">
          PLEASE ACCEPT THE GIFT
        </h1>

        {/* Cute Kitty Holding Heart */}
        <div className="relative my-2 sm:my-4">
          <CuteHappyCat className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80" />
        </div>

        {/* Juicy Jelly Buttons: YES and NO (Matching Image 1) */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mt-6 sm:mt-8 w-full">
          {/* YES Button */}
          <button
            onClick={handleYes}
            className="btn-jelly-red px-10 sm:px-14 py-3 sm:py-4 text-2xl sm:text-3xl tracking-wider active:scale-95"
          >
            YES
          </button>

          {/* NO Button */}
          <button
            onClick={handleNo}
            className="btn-jelly-red px-10 sm:px-14 py-3 sm:py-4 text-2xl sm:text-3xl tracking-wider active:scale-95"
          >
            NO
          </button>
        </div>
      </div>

      {/* Footer watermark/prompt text */}
      <div className="relative z-10 py-2 text-center text-xs text-pink-400 font-medium">
        <span>Click YES for your big surprise! ✨</span>
      </div>
    </div>
  );
};
