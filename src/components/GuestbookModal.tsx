import React, { useState, useEffect } from 'react';
import { X, Heart, Send, Check } from 'lucide-react';
import { GuestbookEntry } from '../types.ts';
import { cuteAudio } from '../utils/audio.ts';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: GuestbookEntry[];
  onAddEntry: (entry: Omit<GuestbookEntry, 'id' | 'timestamp' | 'likes'>) => void;
  onLikeEntry: (id: string) => void;
}

const STICKER_OPTIONS = ['💖', '🐰', '🐱', '🌹', '🍰', '✨', '💌', '🌸'];

export const GuestbookModal: React.FC<GuestbookModalProps> = ({
  isOpen,
  onClose,
  entries,
  onAddEntry,
  onLikeEntry,
}) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend / Visitor');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('💖');
  const [postSuccess, setPostSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    cuteAudio.playSuccess();
    onAddEntry({
      name: name.trim(),
      relation: relation.trim(),
      message: message.trim(),
      sticker: selectedSticker,
    });

    setName('');
    setMessage('');
    setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 3000);
  };

  const handleClose = () => {
    cuteAudio.playPop(420);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-pink-50 rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-pink-200 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent, easy-to-tap Close Button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close guest book"
          className="absolute top-4 right-4 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 rounded-full border-2 border-rose-200 hover:border-rose-300 transition-all shadow-sm flex items-center gap-1.5 font-bold text-xs cursor-pointer z-20"
        >
          <X className="w-4 h-4 stroke-[3]" />
          <span>Close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center justify-center p-2 bg-pink-100 rounded-full mb-2">
            <span className="text-2xl">💌</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bubble text-pink-600 font-bold">
            Boyfriend&apos;s Day Guest Book
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Leave a sweet note or warm wishes for the celebration wall!
          </p>
        </div>

        {/* Success Toast */}
        {postSuccess && (
          <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold animate-bounce">
            <Check className="w-4 h-4" />
            <span>Yay! Your message has been posted on the wall! 💖</span>
          </div>
        )}

        {/* Add Message Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-pink-200 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-bold text-pink-700 uppercase mb-1">
                Your Name / Nickname *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pookie, Bestie, Babe"
                className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-pink-700 uppercase mb-1">
                Who are you?
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/50"
              >
                <option value="Your Girl / Pookie">Your Girl / Pookie 👑</option>
                <option value="The Boyfriend">The Boyfriend Himself 😎</option>
                <option value="Best Friend">Best Friend ✨</option>
                <option value="Friend / Visitor">Friend / Visitor 🌸</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-bold text-pink-700 uppercase mb-1">
              Pick a Cute Sticker
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {STICKER_OPTIONS.map((stk) => (
                <button
                  type="button"
                  key={stk}
                  onClick={() => setSelectedSticker(stk)}
                  className={`text-xl p-1.5 rounded-xl border transition-all ${
                    selectedSticker === stk
                      ? 'bg-pink-100 border-pink-400 scale-110 shadow-sm'
                      : 'bg-white border-pink-100 hover:bg-pink-50'
                  }`}
                >
                  {stk}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-pink-700 uppercase mb-1">
              Your Sweet Message *
            </label>
            <textarea
              required
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something heartwarming..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/50"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bubble font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Post on Love Wall</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bubble font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Existing Messages Wall */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          <h3 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">
            Messages ({entries.length})
          </h3>
          {entries.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-4 font-medium">
              No messages yet! Be the first to leave a sweet note! 💕
            </p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/95 rounded-2xl p-4 shadow-sm border border-pink-200 flex items-start justify-between gap-3 hover:border-pink-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl p-1 bg-pink-50 rounded-xl border border-pink-100">
                    {entry.sticker}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bubble font-bold text-sm text-slate-800">
                        {entry.name}
                      </span>
                      <span className="text-[10px] text-pink-500 font-semibold bg-pink-50 px-2 py-0.5 rounded-full">
                        {entry.relation}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                      {entry.message}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {entry.timestamp}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onLikeEntry(entry.id)}
                  className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span className="font-bold text-[11px]">{entry.likes}</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Close Button for extra convenience */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bubble text-xs font-bold rounded-full transition-all cursor-pointer"
          >
            ← Back to Celebration
          </button>
        </div>
      </div>
    </div>
  );
};
