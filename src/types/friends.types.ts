export type Friend = {
  id: string;
  gifted: number;
  exchanged: number;
  addedAt: Date;
};

export type User = {
  id: string;
  username: string;
  username_lowercase: string;
  avatar: string | null;
  avatarScale: string | null;
  createdAt: Date;
  email: string;
  lastGeneratedAt: Date;
  allowCraftAt: Date;
};

export type RequestRecord = {
  id: string;
  sentAt: Date;
};
