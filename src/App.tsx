import { useState, useEffect } from 'react';
import { AppConfig, BouquetData, GuestbookEntry } from './types.ts';
import { loadAppConfig, saveAppConfig, DEFAULT_CONFIG } from './utils/storage.ts';
import { cuteAudio } from './utils/audio.ts';
import { PasscodeScreen } from './components/PasscodeScreen.tsx';
import { GiftPromptScreen } from './components/GiftPromptScreen.tsx';
import { RejectedScreen } from './components/RejectedScreen.tsx';
import { BouquetSelectScreen } from './components/BouquetSelectScreen.tsx';
import { CelebrationPopout } from './components/CelebrationPopout.tsx';
import { ScrapbookView } from './components/ScrapbookView.tsx';
import { GuestbookModal } from './components/GuestbookModal.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';

type FlowStep =
  | 'passcode'
  | 'gift-prompt'
  | 'rejected-no'
  | 'bouquets'
  | 'celebration-popout'
  | 'scrapbook';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(loadAppConfig());
  const [currentStep, setCurrentStep] = useState<FlowStep>('passcode');
  const [selectedBouquet, setSelectedBouquet] = useState<BouquetData | null>(null);

  const [showAdmin, setShowAdmin] = useState(false);
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Initialize custom audio when config is loaded or updated
  useEffect(() => {
    if (config.customMusicUrl) {
      cuteAudio.setCustomMusic(config.customMusicUrl);
    }
  }, [config.customMusicUrl]);

  // Sync state changes with persistence
  const handleSaveConfig = (updated: AppConfig) => {
    setConfig(updated);
    saveAppConfig(updated);
    if (updated.customMusicUrl) {
      cuteAudio.setCustomMusic(updated.customMusicUrl);
    }
  };

  const handleResetDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    saveAppConfig(DEFAULT_CONFIG);
    cuteAudio.setCustomMusic('');
  };

  const handleToggleMusic = () => {
    cuteAudio.toggleMusic(config.customMusicUrl, (playing) => {
      setIsMusicPlaying(playing);
    });
  };

  const handleSelectBouquet = (bouquet: BouquetData) => {
    setSelectedBouquet(bouquet);
    setCurrentStep('celebration-popout');
  };

  const handleAddGuestbookEntry = (entryData: Omit<GuestbookEntry, 'id' | 'timestamp' | 'likes'>) => {
    const newEntry: GuestbookEntry = {
      ...entryData,
      id: `gb-${Date.now()}`,
      timestamp: 'Just now',
      likes: 1,
    };
    const updated = {
      ...config,
      guestbook: [newEntry, ...config.guestbook],
    };
    handleSaveConfig(updated);
  };

  const handleLikeGuestbookEntry = (id: string) => {
    cuteAudio.playPop(750);
    const updated = {
      ...config,
      guestbook: config.guestbook.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      ),
    };
    handleSaveConfig(updated);
  };

  return (
    <div className="min-h-screen bg-pink-50 relative selection:bg-pink-300 selection:text-pink-900">
      {/* FLOW STEP 1: Secret Passcode Gate */}
      {currentStep === 'passcode' && (
        <PasscodeScreen
          correctPasscode={config.entryPasscode}
          onUnlocked={() => setCurrentStep('gift-prompt')}
          onOpenAdmin={() => setShowAdmin(true)}
          onOpenGuestbook={() => setShowGuestbook(true)}
        />
      )}

      {/* FLOW STEP 2: Gift Acceptance Prompt (Image 1) */}
      {currentStep === 'gift-prompt' && (
        <GiftPromptScreen
          onAccept={() => setCurrentStep('bouquets')}
          onReject={() => setCurrentStep('rejected-no')}
          onOpenGuestbook={() => setShowGuestbook(true)}
          onOpenAdmin={() => setShowAdmin(true)}
        />
      )}

      {/* FLOW STEP 3: "WHY DID YOU CLICK NO!" Crying Kitty (Image 2) */}
      {currentStep === 'rejected-no' && (
        <RejectedScreen onTryAgain={() => setCurrentStep('gift-prompt')} />
      )}

      {/* FLOW STEP 4: Bouquets Selection (Image 3) */}
      {currentStep === 'bouquets' && (
        <BouquetSelectScreen
          bouquets={config.bouquets}
          onSelectBouquet={handleSelectBouquet}
          onOpenGuestbook={() => setShowGuestbook(true)}
          onOpenAdmin={() => setShowAdmin(true)}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {/* FLOW STEP 5: "happy Boyfriend's Day" Celebration Popout (Image 4) */}
      {currentStep === 'celebration-popout' && selectedBouquet && (
        <CelebrationPopout
          bouquet={selectedBouquet}
          onContinue={() => setCurrentStep('scrapbook')}
        />
      )}

      {/* FLOW STEP 6: Scrapbook Memories & Heart-Shaped Photo Collage */}
      {currentStep === 'scrapbook' && selectedBouquet && (
        <ScrapbookView
          bouquet={selectedBouquet}
          allBouquets={config.bouquets}
          onSelectBouquet={(b) => setSelectedBouquet(b)}
          onBackToBouquets={() => setCurrentStep('bouquets')}
          onOpenGuestbook={() => setShowGuestbook(true)}
          onOpenAdmin={() => setShowAdmin(true)}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {/* Guest Book Modal */}
      <GuestbookModal
        isOpen={showGuestbook}
        onClose={() => setShowGuestbook(false)}
        entries={config.guestbook}
        onAddEntry={handleAddGuestbookEntry}
        onLikeEntry={handleLikeGuestbookEntry}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
