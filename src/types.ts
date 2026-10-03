export interface CollagePhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  rotation?: number;
}

export interface BouquetData {
  id: string;
  title: string;
  flowerType: string;
  image: string;
  customImage?: string;
  cutoutMode?: 'bouquet-silhouette' | 'transparent-cutout' | 'original';
  theme: 'heart-collage' | 'denim-letter' | 'pastel-grid' | 'polaroid-lights';
  tagline: string;
  letterTitle: string;
  letterContent: string;
  letterSignOff: string;
  photos: CollagePhoto[];
  quote?: string;
  stickers?: string[];
}

export interface GuestbookEntry {
  id: string;
  name: string;
  relation: string;
  message: string;
  sticker: string;
  timestamp: string;
  likes: number;
}

export interface AppConfig {
  entryPasscode: string;
  adminPassword: string;
  recipientName: string;
  senderName: string;
  bouquets: BouquetData[];
  guestbook: GuestbookEntry[];
  customMusicUrl?: string;
  customMusicTitle?: string;
  isMusicEnabled?: boolean;
}
