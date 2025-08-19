export type GameTile = {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  slug: string;
  description: {
    ru: string;
    en: string;
  };
  image: string;
  cta: {
    ru: string;
    en: string;
  };
};

export type GameId = "guess-own" | "guess-theme" | "clicker";

export type UserGameProgress = {
  gameId: GameId;
  totalPlays: number;
  totalWins: number;
  playsToday: number;
  winsToday: number;
  currentStreak: number;
  bestStreak: number;
  lastOutcome?: "win" | "lose" | null;
  lastPlayedAt?: any | null;
  nextAvailableAt?: any | null;
  createdAt: any;
  updatedAt: any;
};
