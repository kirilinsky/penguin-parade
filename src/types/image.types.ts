export interface ImageItem {
  id: string;
  imageUrl: string;
  title: string;
  createdAt: Date;
  settings: ImageItemSettings;
}

export interface ImageItemSettings {
  acc: string;
  back: string;
  beak: string;
  bg: string;
  breast: string;
  eyes: string;
  fx: string;
  rarity: string; 
  theme: string;
}
