import { Timestamp } from "firebase-admin/firestore";
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

export type GameProgress = {
  id: GameId;
  totalPlays: number;
  totalWins: number;
  lastWasWin: boolean;
  playedToday: boolean;
  finishedToday: boolean;
  currentStrike: number;
  bestStrike: number;
  lastCoinsEarned: number;
  totalCoinsEarned: number;
  lastPlayedAt: Timestamp;
  nextAvailableAt: Timestamp;
};

export type GameSession = {
  gameId: "guess-theme";
  state: "active" | "completed";
  createdAt: Timestamp;
  finishedAt?: Timestamp;
  currentRound: number;
  totalRounds: number;
  successRounds: number;
  win?: boolean;
};
