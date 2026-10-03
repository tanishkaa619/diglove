import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Lock, Sparkles, KeyRound } from 'lucide-react';
import { PastelDoodleStars, CuteHappyCat } from './CuteDoodles.tsx';
import { cuteAudio } from '../utils/audio.ts';

interface PasscodeScreenProps {
  correctPasscode: string;
  onUnlocked: () => void;
  onOpenAdmin: () => void;
  onOpenGuestbook: () => void;
}

export const PasscodeScreen: React.FC<PasscodeScreenProps> = ({
  correctPasscode,
  onUnlocked,
  onOpenAdmin,
  onOpenGuestbook,
}) => {
  const [digits, setDigits] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDigitPress = (digit: string) => {
    cuteAudio.playPop(450 + digits.length * 40);
    if (digits.length < 6) {
      const next = digits + digit;
      setDigits(next);
      setIsError(false);

      if (next.length === 6) {
        verifyCode(next);
      }
    }
  };

  const handleDelete = () => {
    cuteAudio.playPop(380);
    setDigits((prev) => prev.slice(0, -1));
    setIsError(false);
  };

  const handleClear = () => {
    cuteAudio.playPop(350);
    setDigits('');
    setIsError(false);
  };

  const verifyCode = (code: string) => {
    if (code === correctPasscode) {
      cuteAudio.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fef08a'],
      });
      setTimeout(() => {
        onUnlocked();
      }, 500);
    } else {
      cuteAudio.playSad();
      setIsError(true);
      setErrorMessage('Oopsie! Wrong code pookie 🥺 Try again!');
      setTimeout(() => {
        setDigits('');
      }, 700);
    }
  };

  return (
    <div className="relative min-h-screen bg-pastel-stripes flex flex-col items-center justify-center p-4 overflow-hidden">
      <PastelDoodleStars count={12} />

      {/* Top action bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={onOpenGuestbook}
          className="px-3 py-1.5 bg-white/90 hover:bg-white text-pink-600 rounded-full text-xs font-semibold shadow-sm border border-pink-200 flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <span>💌</span>
          <span>Guest Book</span>
        </button>
        <button
          onClick={onOpenAdmin}
          title="Admin Settings"
          className="p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-pink-600 rounded-full text-xs shadow-sm border border-pink-200 transition-all hover:scale-105"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Cute Mascot */}
        <div className="mb-2 transform hover:scale-105 transition-transform duration-300">
          <CuteHappyCat className="w-44 h-44 sm:w-52 sm:h-52" />
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl sm:text-3xl font-bubble text-pink-600 font-bold mb-1 tracking-wide flex items-center justify-center gap-2">
          <span>A Surprise For You</span>
          <Heart className="w-6 h-6 fill-pink-500 text-pink-500 animate-pulse" />
        </h1>
        <p className="text-sm font-medium text-slate-500 mb-6">
          Enter our special secret code to unlock your gift 💕
        </p>

        {/* Passcode dots display */}
        <div
          className={`flex items-center justify-center gap-3 mb-6 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border-2 shadow-sm transition-transform ${
            isError ? 'border-red-400 animate-shake' : 'border-pink-200'
          }`}
        >
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const hasValue = digits.length > idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-200 flex items-center justify-center ${
                  hasValue
                    ? 'bg-pink-500 scale-110 shadow-sm'
                    : 'bg-pink-100 border border-pink-300'
                }`}
              >
                {hasValue && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
              </div>
            );
          })}
        </div>

        {isError && (
          <p className="text-xs font-semibold text-rose-500 mb-4 animate-bounce">
            {errorMessage}
          </p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-64 max-w-full">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigitPress(num)}
              className="h-14 rounded-2xl bg-white hover:bg-pink-50 active:bg-pink-100 text-slate-800 font-bubble text-xl font-bold border-2 border-pink-200 shadow-sm hover:border-pink-300 transition-all active:scale-95 flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="h-14 rounded-2xl bg-white/70 hover:bg-white text-slate-400 hover:text-slate-600 font-bubble text-xs font-semibold border-2 border-pink-100 transition-all active:scale-95 flex items-center justify-center"
          >
            Clear
          </button>
          <button
            onClick={() => handleDigitPress('0')}
            className="h-14 rounded-2xl bg-white hover:bg-pink-50 active:bg-pink-100 text-slate-800 font-bubble text-xl font-bold border-2 border-pink-200 shadow-sm hover:border-pink-300 transition-all active:scale-95 flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-white/70 hover:bg-white text-slate-500 hover:text-pink-600 font-bubble text-sm font-semibold border-2 border-pink-100 transition-all active:scale-95 flex items-center justify-center"
          >
            ⌫
          </button>
        </div>

        <div className="mt-6 flex items-center gap-1 text-[11px] text-pink-400 font-medium">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Made with endless love just for you</span>
        </div>
      </div>
    </div>
  );
};
