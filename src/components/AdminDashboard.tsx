import React, { useState } from 'react';
import { X, Lock, Image, Trash2, Plus, Save, RotateCcw, Check, Sparkles, Music, Play, Pause, Upload, Loader2 } from 'lucide-react';
import { AppConfig, BouquetData, CollagePhoto } from '../types.ts';
import { cuteAudio } from '../utils/audio.ts';
import { compressImageFile, processBouquetCutout } from '../utils/imageCompressor.ts';
import { BouquetCutoutWrapper } from './BouquetCutoutWrapper.tsx';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (updated: AppConfig) => void;
  onResetDefaults: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefaults,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Form state
  const [activeTab, setActiveTab] = useState<'security' | 'bouquets' | 'music' | 'guestbook'>('bouquets');
  const [entryCode, setEntryCode] = useState(config.entryPasscode);
  const [adminPass, setAdminPass] = useState(config.adminPassword);
  const [bouquets, setBouquets] = useState<BouquetData[]>(config.bouquets);
  const [selectedBouquetIdx, setSelectedBouquetIdx] = useState(0);

  // Music state
  const [customMusicUrl, setCustomMusicUrl] = useState(config.customMusicUrl || '');
  const [customMusicTitle, setCustomMusicTitle] = useState(config.customMusicTitle || 'Romantic Melody 🎵');
  const [isTestPlaying, setIsTestPlaying] = useState(false);

  // New photo input state for current bouquet
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoDate, setNewPhotoDate] = useState('');
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);
  const [isCompressingBouquet, setIsCompressingBouquet] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === config.adminPassword) {
      cuteAudio.playSuccess();
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      cuteAudio.playSad();
      setAuthError(true);
    }
  };

  // Upload and compress local image for collage photo
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsCompressingPhoto(true);
        const compressedDataUrl = await compressImageFile(file, 1000, 0.85);
        setNewPhotoUrl(compressedDataUrl);
        if (!newPhotoCaption) {
          setNewPhotoCaption(file.name.replace(/\.[^/.]+$/, ''));
        }
        cuteAudio.playPop(580);
      } catch (err) {
        console.error('Error compressing photo:', err);
      } finally {
        setIsCompressingPhoto(false);
      }
    }
  };

  // Upload and process custom bouquet illustration/picture into transparent cutout PNG
  const handleBouquetImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsCompressingBouquet(true);
        // Process into transparent cutout PNG with automatic background keying (NO square white box!)
        const cutoutDataUrl = await processBouquetCutout(file, 900);
        const updated = [...bouquets];
        updated[selectedBouquetIdx] = {
          ...updated[selectedBouquetIdx],
          customImage: cutoutDataUrl,
          cutoutMode: 'bouquet-silhouette', // Default to authentic floral bouquet cutout shape
        };
        setBouquets(updated);
        // Auto-save immediately so it's never lost
        onSaveConfig({
          ...config,
          bouquets: updated,
        });
        cuteAudio.playSuccess();
      } catch (err) {
        console.error('Error uploading bouquet image:', err);
      } finally {
        setIsCompressingBouquet(false);
      }
    }
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const audioDataUrl = event.target.result as string;
          setCustomMusicUrl(audioDataUrl);
          if (!customMusicTitle || customMusicTitle === 'Romantic Melody 🎵') {
            setCustomMusicTitle(file.name.replace(/\.[^/.]+$/, ''));
          }
          cuteAudio.playSuccess();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestMusic = () => {
    if (isTestPlaying) {
      cuteAudio.stopMusic();
      setIsTestPlaying(false);
    } else {
      cuteAudio.startMusic(customMusicUrl);
      setIsTestPlaying(true);
    }
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;

    const newPhoto: CollagePhoto = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || 'Our Sweet Memory',
      date: newPhotoDate.trim() || 'Special Day',
      rotation: Math.floor(Math.random() * 16) - 8,
    };

    const updated = [...bouquets];
    updated[selectedBouquetIdx] = {
      ...updated[selectedBouquetIdx],
      photos: [newPhoto, ...updated[selectedBouquetIdx].photos],
    };

    setBouquets(updated);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setNewPhotoDate('');

    // Auto-save immediately to persistent storage
    onSaveConfig({
      ...config,
      entryPasscode: entryCode.trim(),
      adminPassword: adminPass.trim(),
      customMusicUrl: customMusicUrl.trim(),
      customMusicTitle: customMusicTitle.trim(),
      bouquets: updated,
    });

    cuteAudio.playSuccess();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeletePhoto = (photoId: string) => {
    const updated = [...bouquets];
    updated[selectedBouquetIdx] = {
      ...updated[selectedBouquetIdx],
      photos: updated[selectedBouquetIdx].photos.filter((p) => p.id !== photoId),
    };
    setBouquets(updated);
    onSaveConfig({
      ...config,
      bouquets: updated,
    });
    cuteAudio.playPop(380);
  };

  const handleSaveAll = () => {
    const updatedConfig: AppConfig = {
      ...config,
      entryPasscode: entryCode.trim(),
      adminPassword: adminPass.trim(),
      customMusicUrl: customMusicUrl.trim(),
      customMusicTitle: customMusicTitle.trim(),
      bouquets,
    };
    onSaveConfig(updatedConfig);
    cuteAudio.setCustomMusic(customMusicUrl.trim());
    cuteAudio.playSuccess();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteGuestbookEntry = (id: string) => {
    const updated = {
      ...config,
      guestbook: config.guestbook.filter((entry) => entry.id !== id),
    };
    onSaveConfig(updated);
  };

  const curBouquet = bouquets[selectedBouquetIdx];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={() => {
        cuteAudio.stopMusic();
        setIsTestPlaying(false);
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-pink-200 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            cuteAudio.stopMusic();
            setIsTestPlaying(false);
            cuteAudio.playPop(420);
            onClose();
          }}
          className="absolute top-4 right-4 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-full border border-pink-200 transition-colors font-bold text-xs flex items-center gap-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>

        {!isAuthenticated ? (
          /* Admin Login Gate */
          <div className="max-w-md mx-auto py-8 text-center">
            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-pink-300 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bubble text-slate-800 font-bold mb-1">
              Admin Dashboard Login
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Enter admin password to manage bouquets, photos, music, and codes.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className={`w-full px-4 py-3 text-center text-lg tracking-widest rounded-2xl border-2 font-mono focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    authError ? 'border-red-400 bg-red-50' : 'border-pink-200 bg-pink-50/50'
                  }`}
                />
                {authError && (
                  <p className="text-xs text-red-500 font-medium mt-1">
                    Incorrect password! Try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bubble font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Control Panel */
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-pink-200 gap-3 pt-2">
              <div>
                <h2 className="text-2xl font-bubble text-pink-600 font-bold flex items-center gap-2">
                  <span>Admin Control Center</span>
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </h2>
                <p className="text-xs text-slate-500">
                  Manage your secret codes, uploaded bouquet pictures, heart collages, and music
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bubble text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{saveSuccess ? 'Saved to Memory!' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm('Reset all app data to default template?')) {
                      onResetDefaults();
                      onClose();
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Reset to Defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('bouquets')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'bouquets'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-pink-50 text-slate-600 hover:bg-pink-100'
                }`}
              >
                🌸 Bouquets &amp; Photo Collages
              </button>
              <button
                onClick={() => setActiveTab('music')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'music'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-pink-50 text-slate-600 hover:bg-pink-100'
                }`}
              >
                🎵 Music Audio
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-pink-50 text-slate-600 hover:bg-pink-100'
                }`}
              >
                🔐 Passcodes
              </button>
              <button
                onClick={() => setActiveTab('guestbook')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'guestbook'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-pink-50 text-slate-600 hover:bg-pink-100'
                }`}
              >
                💌 Guest Book
              </button>
            </div>

            {/* TAB 1: Bouquets & Collages */}
            {activeTab === 'bouquets' && (
              <div>
                {/* Bouquet Selector Buttons */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto">
                  {bouquets.map((b, idx) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedBouquetIdx(idx);
                        setNewPhotoUrl('');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap cursor-pointer ${
                        selectedBouquetIdx === idx
                          ? 'bg-pink-500 text-white border-pink-600 shadow-sm'
                          : 'bg-white text-slate-700 border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      Bouquet {idx + 1}: {b.flowerType}
                    </button>
                  ))}
                </div>

                {/* FEATURE: Upload Your Own Bouquet Picture with Live Visible Preview */}
                <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200 shadow-sm">
                  <h4 className="text-xs font-bold text-pink-700 uppercase mb-1 flex items-center gap-2">
                    <span>💐 Custom Bouquet Picture for Bouquet {selectedBouquetIdx + 1}</span>
                    <Sparkles className="w-4 h-4 text-pink-500" />
                  </h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Upload your own photo or drawing of a bouquet! It will appear directly on the flower stand.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Upload Local Photo / Drawing
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBouquetImageUpload}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-200 file:text-pink-800 hover:file:bg-pink-300 cursor-pointer"
                        />
                        {isCompressingBouquet && (
                          <p className="text-xs text-pink-600 font-semibold mt-1 flex items-center gap-1.5">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Optimizing and saving your bouquet photo...</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Or Paste Bouquet Image Web URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={curBouquet.customImage?.startsWith('data:') ? '' : curBouquet.customImage || ''}
                            onChange={(e) => {
                              const updated = [...bouquets];
                              updated[selectedBouquetIdx].customImage = e.target.value;
                              setBouquets(updated);
                            }}
                            placeholder={curBouquet.customImage?.startsWith('data:') ? 'Custom uploaded file currently active' : 'https://...'}
                            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-pink-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Cutout Style Options for Custom Image */}
                      {curBouquet.customImage && (
                        <div className="pt-2 border-t border-pink-200">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                            Cutout Shape Mode:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...bouquets];
                                updated[selectedBouquetIdx].cutoutMode = 'bouquet-silhouette';
                                setBouquets(updated);
                                onSaveConfig({ ...config, bouquets: updated });
                                cuteAudio.playPop(520);
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                (curBouquet.cutoutMode || 'bouquet-silhouette') === 'bouquet-silhouette'
                                  ? 'bg-pink-600 text-white border-pink-700 shadow-xs'
                                  : 'bg-white text-slate-700 border-pink-200 hover:bg-pink-50'
                              }`}
                            >
                              💐 Bouquet Silhouette (Sticker Cutout)
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...bouquets];
                                updated[selectedBouquetIdx].cutoutMode = 'transparent-cutout';
                                setBouquets(updated);
                                onSaveConfig({ ...config, bouquets: updated });
                                cuteAudio.playPop(520);
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                curBouquet.cutoutMode === 'transparent-cutout'
                                  ? 'bg-pink-600 text-white border-pink-700 shadow-xs'
                                  : 'bg-white text-slate-700 border-pink-200 hover:bg-pink-50'
                              }`}
                            >
                              ✨ Transparent Cutout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* LIVE BOUQUET PREVIEW CARD - ALWAYS CUTOUT SHAPE */}
                    <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-white rounded-2xl border-2 border-pink-200 shadow-sm text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Live Cutout Preview
                      </span>
                      <div className="w-28 h-36 bg-pink-50/70 rounded-2xl overflow-hidden border border-pink-100 flex items-center justify-center p-1 relative">
                        {curBouquet.customImage ? (
                          <BouquetCutoutWrapper
                            id={`admin-preview-${selectedBouquetIdx}`}
                            imageUrl={curBouquet.customImage}
                            alt="Custom Bouquet Cutout"
                            cutoutMode={curBouquet.cutoutMode || 'bouquet-silhouette'}
                            flowerType={curBouquet.flowerType}
                          />
                        ) : (
                          <div className="text-center p-2">
                            <span className="text-3xl block mb-1">💐</span>
                            <span className="text-[10px] text-pink-600 font-bold leading-tight block">
                              Default Cartoon Cutout Active
                            </span>
                          </div>
                        )}
                      </div>

                      {curBouquet.customImage && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...bouquets];
                            updated[selectedBouquetIdx].customImage = undefined;
                            updated[selectedBouquetIdx].cutoutMode = undefined;
                            setBouquets(updated);
                            onSaveConfig({
                              ...config,
                              bouquets: updated,
                            });
                            cuteAudio.playPop(380);
                          }}
                          className="mt-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                        >
                          🌸 Use Cartoon Vector Cutout
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Collage Style Selector */}
                <div className="mb-6 bg-pink-50/50 p-4 rounded-2xl border border-pink-200">
                  <label className="block text-xs font-bold text-pink-700 uppercase mb-2">
                    Scrapbook Collage Layout Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'heart-collage', label: '❤️ Heart Shaped Collage' },
                      { id: 'denim-letter', label: '👖 Denim Pocket & Letter' },
                      { id: 'pastel-grid', label: '🌸 Pastel Mosaic Grid' },
                      { id: 'polaroid-lights', label: '✨ Fairy Lights Wall' },
                    ].map((themeOpt) => (
                      <button
                        key={themeOpt.id}
                        type="button"
                        onClick={() => {
                          const updated = [...bouquets];
                          updated[selectedBouquetIdx].theme = themeOpt.id as BouquetData['theme'];
                          setBouquets(updated);
                          onSaveConfig({
                            ...config,
                            bouquets: updated,
                          });
                          cuteAudio.playPop(520);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          curBouquet.theme === themeOpt.id
                            ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                            : 'bg-white text-slate-700 border-pink-200 hover:bg-pink-100'
                        }`}
                      >
                        {themeOpt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edit Bouquet Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bouquet Title
                    </label>
                    <input
                      type="text"
                      value={curBouquet.title}
                      onChange={(e) => {
                        const updated = [...bouquets];
                        updated[selectedBouquetIdx].title = e.target.value;
                        setBouquets(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Flower Name
                    </label>
                    <input
                      type="text"
                      value={curBouquet.flowerType}
                      onChange={(e) => {
                        const updated = [...bouquets];
                        updated[selectedBouquetIdx].flowerType = e.target.value;
                        setBouquets(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-white"
                    />
                  </div>
                </div>

                {/* Love Letter editor */}
                <div className="mb-6 bg-pink-50/60 p-4 rounded-2xl border border-pink-200">
                  <h4 className="text-xs font-bold text-pink-700 uppercase mb-2">
                    Love Letter / Scrapbook Message
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Header / Greeting
                      </label>
                      <input
                        type="text"
                        value={curBouquet.letterTitle}
                        onChange={(e) => {
                          const updated = [...bouquets];
                          updated[selectedBouquetIdx].letterTitle = e.target.value;
                          setBouquets(updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Closing Sign-Off
                      </label>
                      <input
                        type="text"
                        value={curBouquet.letterSignOff}
                        onChange={(e) => {
                          const updated = [...bouquets];
                          updated[selectedBouquetIdx].letterSignOff = e.target.value;
                          setBouquets(updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Letter Body Text
                    </label>
                    <textarea
                      rows={4}
                      value={curBouquet.letterContent}
                      onChange={(e) => {
                        const updated = [...bouquets];
                        updated[selectedBouquetIdx].letterContent = e.target.value;
                        setBouquets(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-white font-mono leading-relaxed"
                    />
                  </div>
                </div>

                {/* ============================================================== */}
                {/* COLLAGE PHOTOS MANAGEMENT WITH BULLETPROOF VISIBLE PREVIEW */}
                {/* ============================================================== */}
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-3 flex items-center justify-between">
                    <span>Collage Photos ({curBouquet.photos.length})</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      Upload from phone or computer
                    </span>
                  </h4>

                  {/* Add New Photo Box */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-pink-200 mb-6 shadow-sm">
                    <h5 className="text-xs font-bold text-pink-700 uppercase mb-3 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Upload &amp; Add New Photo</span>
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-4">
                      {/* Left: Inputs */}
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            1. Select Image File from Device *
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer"
                          />
                          {isCompressingPhoto && (
                            <p className="text-xs text-pink-600 font-semibold mt-1 flex items-center gap-1.5">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Optimizing photo for instant loading...</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Or Direct Image URL
                          </label>
                          <input
                            type="text"
                            value={newPhotoUrl.startsWith('data:') ? '' : newPhotoUrl}
                            onChange={(e) => setNewPhotoUrl(e.target.value)}
                            placeholder={newPhotoUrl.startsWith('data:') ? 'Local file selected and ready!' : 'https://...'}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200 bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              2. Caption (Optional)
                            </label>
                            <input
                              type="text"
                              value={newPhotoCaption}
                              onChange={(e) => setNewPhotoCaption(e.target.value)}
                              placeholder="e.g. Laughing at the cafe"
                              className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              3. Date or Note (Optional)
                            </label>
                            <input
                              type="text"
                              value={newPhotoDate}
                              onChange={(e) => setNewPhotoDate(e.target.value)}
                              placeholder="e.g. That special sunset"
                              className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Preview Box of the Uploaded Photo */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-pink-50/50 rounded-2xl border-2 border-dashed border-pink-300 text-center min-h-[140px]">
                        <span className="text-[10px] font-bold text-pink-700 uppercase tracking-wider mb-2">
                          Photo Preview
                        </span>
                        {newPhotoUrl ? (
                          <div className="relative w-28 h-28 bg-white p-1 rounded-xl shadow-md border border-pink-200 overflow-hidden">
                            <img
                              src={newPhotoUrl}
                              alt="Upload Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setNewPhotoUrl('')}
                              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700"
                              title="Clear photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-slate-400 py-4">
                            <Image className="w-8 h-8 mx-auto mb-1 text-pink-300" />
                            <span className="text-[11px]">Select a photo to preview</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleAddPhoto}
                      disabled={!newPhotoUrl.trim() || isCompressingPhoto}
                      className="w-full sm:w-auto px-6 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bubble text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add Photo &amp; Save to Collage</span>
                    </button>
                  </div>

                  {/* Existing Photos Grid with thumbnails & captions */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {curBouquet.photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative bg-white p-2.5 rounded-2xl border-2 border-pink-100 shadow-sm group hover:border-pink-300 transition-colors"
                      >
                        <div className="w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-2 relative">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-bold text-slate-800 truncate font-bubble">
                          {photo.caption}
                        </p>
                        {photo.date && (
                          <p className="text-[10px] text-pink-500 font-medium truncate">
                            {photo.date}
                          </p>
                        )}
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="absolute top-4 right-4 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Background Music Settings */}
            {activeTab === 'music' && (
              <div className="space-y-6 max-w-xl">
                <div className="bg-pink-50/70 p-5 rounded-3xl border-2 border-pink-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Music className="w-5 h-5 text-pink-600" />
                    <h3 className="font-bubble font-bold text-base text-pink-700">
                      Upload Custom Romantic Song
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">
                    Upload an MP3/audio file from your computer or phone, or paste an audio link. It will automatically start playing when your boyfriend clicks &quot;YES&quot;!
                  </p>

                  {/* File Upload Field */}
                  <div className="mb-4 bg-white p-4 rounded-2xl border border-pink-200">
                    <label className="block text-xs font-bold text-pink-700 uppercase mb-2 flex items-center gap-1.5">
                      <Upload className="w-4 h-4" />
                      <span>Select Audio File (MP3, WAV, AAC, M4A)</span>
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileUpload}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer"
                    />
                  </div>

                  {/* Or Paste Audio URL */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Or Direct Audio Link (URL)
                    </label>
                    <input
                      type="text"
                      value={customMusicUrl.startsWith('data:') ? '(Uploaded Audio File Saved)' : customMusicUrl}
                      onChange={(e) => setCustomMusicUrl(e.target.value)}
                      placeholder="https://example.com/our-song.mp3"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-white"
                    />
                  </div>

                  {/* Song Title */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Song Title
                    </label>
                    <input
                      type="text"
                      value={customMusicTitle}
                      onChange={(e) => setCustomMusicTitle(e.target.value)}
                      placeholder="e.g. Until I Found You 💖"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-white"
                    />
                  </div>

                  {/* Test Player Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleTestMusic}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold font-bubble flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      {isTestPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isTestPlaying ? 'Pause Test' : 'Test Play Music'}</span>
                    </button>

                    {customMusicUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setCustomMusicUrl('');
                          setCustomMusicTitle('Romantic Music Box & Melody 🎵');
                          cuteAudio.setCustomMusic('');
                        }}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-medium cursor-pointer"
                      >
                        Reset to Default Music Box
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Passcodes */}
            {activeTab === 'security' && (
              <div className="space-y-6 max-w-lg">
                <div className="bg-pink-50/70 p-5 rounded-2xl border border-pink-200">
                  <label className="block text-xs font-bold text-pink-700 uppercase mb-1">
                    Secret Entry Passcode (For Boyfriend)
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    The code required on the first screen. (Default: 210406)
                  </p>
                  <input
                    type="text"
                    value={entryCode}
                    onChange={(e) => setEntryCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 font-mono text-base font-bold bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div className="bg-pink-50/70 p-5 rounded-2xl border border-pink-200">
                  <label className="block text-xs font-bold text-pink-700 uppercase mb-1">
                    Admin Dashboard Password
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    The password to access this control dashboard. (Default: 102938)
                  </p>
                  <input
                    type="text"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 font-mono text-base font-bold bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Guest Book Management */}
            {activeTab === 'guestbook' && (
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase mb-3">
                  Visitor Messages ({config.guestbook.length})
                </h4>
                <div className="space-y-3">
                  {config.guestbook.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-3 bg-white rounded-xl border border-pink-200 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{entry.sticker}</span>
                          <span className="text-xs font-bold text-slate-800">{entry.name}</span>
                          <span className="text-[10px] text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                            {entry.relation}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{entry.message}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteGuestbookEntry(entry.id)}
                        className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
