// Romantic Audio Manager: supports custom user-uploaded music audio file / URL & synthesized music box melody

class CuteSoundEffects {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicTimer: number | null = null;
  private noteIndex = 0;
  private customAudioEl: HTMLAudioElement | null = null;
  private currentCustomUrl = '';

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft cute pop chime (for clicking buttons / hearts)
  playPop(freq = 523.25) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play sweet success chime (for entering code or clicking yes)
  playSuccess() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playPop(freq);
        }, idx * 90);
      });
    } catch {
      // Audio fallback
    }
  }

  // Play a sad little "womp womp" for clicking NO
  playSad() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 415.3, 392, 349.23];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.35);
        }, idx * 160);
      });
    } catch {
      // Audio fallback
    }
  }

  // Set or play custom user-provided audio URL (data: or https:)
  setCustomMusic(url: string) {
    this.currentCustomUrl = url;
    if (this.customAudioEl) {
      this.customAudioEl.pause();
      this.customAudioEl = null;
    }
    if (url) {
      this.customAudioEl = new Audio(url);
      this.customAudioEl.loop = true;
      this.customAudioEl.volume = 0.6;
    }
  }

  toggleMusic(customUrl?: string, onStateChange?: (playing: boolean) => void): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      onStateChange?.(false);
      return false;
    } else {
      this.startMusic(customUrl);
      onStateChange?.(true);
      return true;
    }
  }

  startMusic(customUrl?: string) {
    const url = customUrl || this.currentCustomUrl;
    if (url) {
      if (!this.customAudioEl || this.currentCustomUrl !== url) {
        this.setCustomMusic(url);
      }
      if (this.customAudioEl) {
        this.customAudioEl.play().catch(() => {
          // Autoplay policy or corrupt file: fallback to synth music box
          this.startSynthesizedMusicBox();
        });
        this.isMusicPlaying = true;
        return;
      }
    }

    // Default: play synthesized music box
    this.startSynthesizedMusicBox();
  }

  stopMusic() {
    this.isMusicPlaying = false;
    if (this.customAudioEl) {
      this.customAudioEl.pause();
    }
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  private startSynthesizedMusicBox() {
    this.initCtx();
    this.isMusicPlaying = true;
    this.playNextMusicBoxNote();
  }

  private playNextMusicBoxNote() {
    if (!this.isMusicPlaying || !this.ctx) return;

    // Sweet romantic melody
    const melody = [
      523.25, 659.25, 783.99, 659.25,
      587.33, 698.46, 880.00, 698.46,
      659.25, 783.99, 1046.50, 783.99,
      523.25, 659.25, 880.00, 783.99,
    ];

    const freq = melody[this.noteIndex % melody.length];
    this.noteIndex++;

    try {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc2.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.7);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + 0.75);
      osc2.stop(this.ctx.currentTime + 0.75);
    } catch {
      // Audio error catch
    }

    this.musicTimer = window.setTimeout(() => {
      this.playNextMusicBoxNote();
    }, 450);
  }
}

export const cuteAudio = new CuteSoundEffects();
