import React, { useState } from 'react';
import { X, Lock, Key, Image, FileText, Trash2, Plus, Save, RotateCcw, Check, Sparkles, MessageSquare, Music, Play, Pause, Upload, Heart } from 'lucide-react';
import { AppConfig, BouquetData, CollagePhoto } from '../types.ts';
import { cuteAudio } from '../utils/audio.ts';

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

  // Editable form state once authenticated
  const [activeTab, setActiveTab] = useState<'security' | 'bouquets' | 'music' | 'guestbook'>('security');
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

  // Upload local image for collage photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload custom bouquet illustration/picture
  const handleBouquetImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imgData = event.target.result as string;
          const updated = [...bouquets];
          updated[selectedBouquetIdx] = {
            ...updated[selectedBouquetIdx],
            customImage: imgData,
          };
          setBouquets(updated);
          cuteAudio.playSuccess();
        }
      };
      reader.readAsDataURL(file);
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
      photos: [...updated[selectedBouquetIdx].photos, newPhoto],
    };

    setBouquets(updated);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setNewPhotoDate('');
    cuteAudio.playPop(620);
  };

  const handleDeletePhoto = (photoId: string) => {
    const updated = [...bouquets];
    updated[selectedBouquetIdx] = {
      ...updated[selectedBouquetIdx],
      photos: updated[selectedBouquetIdx].photos.filter((p) => p.id !== photoId),
    };
    setBouquets(updated);
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
                  Customize your secret codes, own bouquet pictures, heart collages, and music
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bubble text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{saveSuccess ? 'Saved Changes!' : 'Save Changes'}</span>
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
                onClick={() => setActiveTab('bouquets')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'bouquets'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-pink-50 text-slate-600 hover:bg-pink-100'
                }`}
              >
                🌸 Bouquets &amp; Collages
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

            {/* TAB 1: Passcodes */}
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

            {/* TAB 2: Bouquets & Collages */}
            {activeTab === 'bouquets' && (
              <div>
                {/* Bouquet Selector Buttons */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto">
                  {bouquets.map((b, idx) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBouquetIdx(idx)}
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

                {/* FEATURE: Upload Your Own Bouquet Picture */}
                <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200 shadow-sm">
                  <h4 className="text-xs font-bold text-pink-700 uppercase mb-2 flex items-center gap-2">
                    <span>💐 Custom Bouquet Picture (Optional)</span>
                    <Sparkles className="w-4 h-4 text-pink-500" />
                  </h4>
                  <p className="text-xs text-slate-600 mb-3">
                    Upload your own photo or drawing of a bouquet for Bouquet {selectedBouquetIdx + 1}! It will replace the default cartoon bouquet on the shelf.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Upload Your Own Bouquet Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBouquetImageUpload}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-200 file:text-pink-800 hover:file:bg-pink-300 cursor-pointer"
                      />
                      <div className="mt-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Or Paste Bouquet Image URL
                        </label>
                        <input
                          type="text"
                          value={curBouquet.customImage?.startsWith('data:') ? '(Uploaded Bouquet Photo Saved)' : curBouquet.customImage || ''}
                          onChange={(e) => {
                            const updated = [...bouquets];
                            updated[selectedBouquetIdx].customImage = e.target.value;
                            setBouquets(updated);
                          }}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-pink-100">
                      <div className="w-20 h-24 bg-pink-50 rounded-lg overflow-hidden border border-pink-200 flex items-center justify-center">
                        {curBouquet.customImage ? (
                          <img
                            src={curBouquet.customImage}
                            alt="Custom Bouquet"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-[10px] text-pink-400 text-center font-bold px-1">
                            Default Cartoon
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-slate-800">
                          {curBouquet.customImage ? 'Using Custom Bouquet' : 'Using Default Cutout'}
                        </span>
                        {curBouquet.customImage && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...bouquets];
                              updated[selectedBouquetIdx].customImage = undefined;
                              setBouquets(updated);
                              cuteAudio.playPop(380);
                            }}
                            className="text-[11px] font-semibold text-rose-600 hover:underline text-left cursor-pointer"
                          >
                            Reset to Default Cartoon Cutout
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collage Style Selector (Heart Shaped, Denim, Lights, Mosaic) */}
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

                {/* Collage Photos Management */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-3 flex items-center justify-between">
                    <span>Collage Photos ({curBouquet.photos.length})</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      Upload from phone/PC or paste image link
                    </span>
                  </h4>

                  {/* Add New Photo Box */}
                  <div className="bg-white p-4 rounded-xl border border-pink-200 mb-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Upload Local Image File
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Or Paste Image URL
                        </label>
                        <input
                          type="text"
                          value={newPhotoUrl.startsWith('data:') ? '(Uploaded File Ready)' : newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Photo Caption
                        </label>
                        <input
                          type="text"
                          value={newPhotoCaption}
                          onChange={(e) => setNewPhotoCaption(e.target.value)}
                          placeholder="e.g. That time we laughed in the rain"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Date / Note
                        </label>
                        <input
                          type="text"
                          value={newPhotoDate}
                          onChange={(e) => setNewPhotoDate(e.target.value)}
                          placeholder="e.g. August 2024"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200"
                        />
                      </div>
                    </div>

                    {newPhotoUrl && (
                      <div className="flex items-center gap-3 mb-3 p-2 bg-pink-50 rounded-xl">
                        <img
                          src={newPhotoUrl}
                          alt="Preview"
                          className="w-12 h-12 rounded-lg object-cover border border-pink-200"
                        />
                        <span className="text-xs text-emerald-600 font-semibold">
                          Image ready to add!
                        </span>
                      </div>
                    )}

                    <button
                      onClick={handleAddPhoto}
                      disabled={!newPhotoUrl.trim()}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bubble text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Photo to Collage</span>
                    </button>
                  </div>

                  {/* Existing Photos Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {curBouquet.photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative bg-white p-2 rounded-xl border border-slate-200 shadow-sm group"
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full aspect-square object-cover rounded-lg mb-1"
                        />
                        <p className="text-[11px] font-bold text-slate-800 truncate">
                          {photo.caption}
                        </p>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="absolute top-3 right-3 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
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

            {/* TAB 3: Background Music Settings */}
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
                    Upload an MP3/audio file from your computer or phone, or paste an audio link. It will play softly across the whole website via the clean top bar speaker button!
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
