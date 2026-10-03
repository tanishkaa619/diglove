import { AppConfig } from '../types.ts';

const STORAGE_KEY = 'boyfriend_day_app_config_v5';
const DB_NAME = 'BoyfriendDayDB';
const DB_STORE = 'app_config';
const DB_KEY = 'main_config';

function sanitizeConfig(config: AppConfig): AppConfig {
  return {
    ...config,
    bouquets: (config.bouquets || DEFAULT_CONFIG.bouquets).map((b) => ({
      ...b,
      cutoutMode: b.cutoutMode || (b.customImage ? 'bouquet-silhouette' : undefined),
    })),
  };
}

export const DEFAULT_CONFIG: AppConfig = {
  entryPasscode: '210406',
  adminPassword: '102938',
  recipientName: 'My Babe',
  senderName: 'Your Pookie',
  customMusicTitle: 'Romantic Music Box & Melody 🎵',
  isMusicEnabled: true,
  customMusicUrl: '',
  bouquets: [
    {
      id: 'roses',
      title: 'Passionate Crimson Roses',
      flowerType: 'Fresh Red Roses',
      image: '/src/assets/images/bouquet_cartoon_roses_1791038496585.jpg',
      theme: 'denim-letter',
      tagline: 'Like red roses, my love for you grows deeper each day',
      letterTitle: 'Dear Love,',
      letterContent: `Happy Boyfriend's Day babe! You make my whole world brighter. You don't know how much I miss you every second you're not around. You are my favorite listener because without yapping to you it feels completely empty.

You are the ultimate nerd and a total goofball, and I adore the sweet pookie version of you! I love the silly banter, the late-night talks, and how you always listen to my little rants and make everything feel safe.

So on this cute occasion, I just want to award you the "Best Boyfriend in the Universe" trophy! Thank you for being my comfort person, my protector, and my favorite smile. Enjoy your day righteously king (until you have to bow before your queen hehe)!`,
      letterSignOff: 'Forever & Always Your Queen 💖',
      quote: 'You are my favorite notification in a busy world.',
      photos: [
        {
          id: 'photo-1',
          url: '/src/assets/images/couple_sunset_moment_1791037939851.jpg',
          caption: 'Watching the sunset together on our favorite hill',
          date: 'That golden hour magic',
          rotation: -5,
        },
        {
          id: 'photo-2',
          url: '/src/assets/images/couple_cafe_laughter_1791037957583.jpg',
          caption: 'Laughing at your silly jokes at our weekend cafe date',
          date: 'Coffee & your giggles',
          rotation: 3,
        },
        {
          id: 'photo-3',
          url: '/src/assets/images/couple_holding_hands_1791037978508.jpg',
          caption: 'Under the fairy lights, holding hands forever',
          date: 'Never letting go',
          rotation: -2,
        },
      ],
    },
    {
      id: 'spring',
      title: 'Pastel Meadow Sunshine',
      flowerType: 'Mixed Spring Bloom & Daisies',
      image: '/src/assets/images/bouquet_cartoon_spring_1791038511464.jpg',
      theme: 'heart-collage',
      tagline: 'Soft, bright and joyful just like your sweet smile',
      letterTitle: 'To My Sunbeam ☀️',
      letterContent: `Every moment with you feels like spring flowers blooming after winter. Thank you for holding my hand when I feel anxious, for remembering my favorite treats, and for loving me even when I am moody.

Here is our special heart-shaped memory collage with all my favorite snapshots of us!`,
      letterSignOff: 'With 10,000 Hugs, Your Girl 💕',
      quote: 'My heart beats only for you.',
      photos: [
        {
          id: 'photo-h1',
          url: '/src/assets/images/couple_sunset_moment_1791037939851.jpg',
          caption: 'Our first sunset together',
          date: 'Golden Glow',
          rotation: -10,
        },
        {
          id: 'photo-h2',
          url: '/src/assets/images/couple_cafe_laughter_1791037957583.jpg',
          caption: 'Your laugh is my favorite sound',
          date: 'Cafe Date',
          rotation: 10,
        },
        {
          id: 'photo-h3',
          url: '/src/assets/images/couple_holding_hands_1791037978508.jpg',
          caption: 'Walking under the stars',
          date: 'Night Walk',
          rotation: -16,
        },
        {
          id: 'photo-h4',
          url: '/src/assets/images/couple_cafe_laughter_1791037957583.jpg',
          caption: 'My forever Valentine',
          date: 'Sweet Moments',
          rotation: 0,
        },
        {
          id: 'photo-h5',
          url: '/src/assets/images/couple_sunset_moment_1791037939851.jpg',
          caption: 'Comfort in your arms',
          date: 'Pure Love',
          rotation: 16,
        },
        {
          id: 'photo-h6',
          url: '/src/assets/images/couple_holding_hands_1791037978508.jpg',
          caption: 'Always holding you close',
          date: 'Forever Us',
          rotation: -8,
        },
        {
          id: 'photo-h7',
          url: '/src/assets/images/couple_cafe_laughter_1791037957583.jpg',
          caption: 'Two goofballs in love',
          date: 'Best Memories',
          rotation: 8,
        },
        {
          id: 'photo-h8',
          url: '/src/assets/images/couple_sunset_moment_1791037939851.jpg',
          caption: 'You have my whole heart',
          date: 'To Infinity',
          rotation: 0,
        },
      ],
    },
    {
      id: 'lilies',
      title: 'Stargazer Lilies & Sweet Twine',
      flowerType: 'Fragrant Pink Stargazer Lilies',
      image: '/src/assets/images/bouquet_cartoon_lilies_1791038522543.jpg',
      theme: 'polaroid-lights',
      tagline: 'Gentle grace, pure romance, and endless adoration',
      letterTitle: 'My Forever & Always 🌸',
      letterContent: `You are my calm in every storm. Thank you for being the most patient, caring, and genuine person in my life. Every day spent with you is another reason I fall in love all over again.

Here is our little romantic memory wall of reasons why you are the best boyfriend ever, redeemable love coupons, and our sweetest moments!`,
      letterSignOff: 'All my heart is yours, always ✨',
      quote: 'In every lifetime, I would choose you.',
      photos: [
        {
          id: 'photo-7',
          url: '/src/assets/images/couple_holding_hands_1791037978508.jpg',
          caption: 'Walking together hand in hand through all seasons',
          date: 'Forever walking with you',
          rotation: -6,
        },
        {
          id: 'photo-8',
          url: '/src/assets/images/couple_sunset_moment_1791037939851.jpg',
          caption: 'The moment my heart knew you were the one',
          date: 'Core memory unlocked',
          rotation: 4,
        },
        {
          id: 'photo-9',
          url: '/src/assets/images/couple_cafe_laughter_1791037957583.jpg',
          caption: 'Just two dorks head-over-heels in love',
          date: 'Us being silly',
          rotation: -2,
        },
      ],
    },
  ],
  guestbook: [
    {
      id: 'gb-1',
      name: 'Your Pookie 🎀',
      relation: 'Your Girl',
      message: 'Happy Boyfriend Day to my king! Hope this surprise made you smile as wide as you make me smile every single day!',
      sticker: '💖',
      timestamp: 'Today at 10:24 AM',
      likes: 12,
    },
    {
      id: 'gb-2',
      name: 'Secret Admirer 👀',
      relation: 'Biggest Fan',
      message: 'Best couple award goes to you two! Have the sweetest day celebrating!',
      sticker: '🐰',
      timestamp: 'Today at 11:15 AM',
      likes: 8,
    },
  ],
};

// IndexedDB Helper
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Synchronous load from localStorage for instant initial render
export function loadAppConfig(): AppConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return sanitizeConfig({
      ...DEFAULT_CONFIG,
      ...parsed,
      bouquets: parsed.bouquets || DEFAULT_CONFIG.bouquets,
      guestbook: parsed.guestbook || DEFAULT_CONFIG.guestbook,
    });
  } catch {
    return DEFAULT_CONFIG;
  }
}

// Asynchronous loader from IndexedDB to guarantee full photos persistence
export async function loadAppConfigFromIndexedDB(): Promise<AppConfig | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const store = tx.objectStore(DB_STORE);
      const req = store.get(DB_KEY);
      req.onsuccess = () => {
        if (req.result) {
          resolve(sanitizeConfig(req.result as AppConfig));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Dual persistence: saves to IndexedDB (virtually unlimited quota) and localStorage (fast cache)
export async function saveAppConfig(config: AppConfig): Promise<void> {
  // 1. Save to IndexedDB (safe for high-res images and audio)
  try {
    const db = await openDB();
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);
    store.put(config, DB_KEY);
  } catch (err) {
    console.warn('IndexedDB save warning:', err);
  }

  // 2. Save to localStorage with quota protection
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('localStorage quota exceeded; safely preserved in IndexedDB.', err);
  }
}
