export type Friend = {
  id: string;
  name: string;
  avatar: string | null;
  gifted: number;
  exchanged: number;
  addedAt: Date;
};

export type User = {
  id: string;
  username: string;
  avatar: string | null;
  createdAt: Date;
  email: string;
  lastGeneratedAt: Date;
};
