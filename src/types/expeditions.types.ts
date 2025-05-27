import { ScaleType } from "./scale.types";

export type Expedition = {
  id: string;
  title: string;
  theme: string;
  goal: string;
  level: string;
  minParticipants: number;
  maxParticipants: number;
  durationHours: number;
  state: "preparing" | "active" | "ended" | "resultsReady" | "archived";
  imageUrl: string;
  createdAt: Date;
  startedAt: Date;
  endedAt: Date;
  preset: ExpeditionPreset;
  participants: ExpeditionParticipant[];
};

export type ExpeditionParticipant = {
  id: {
    penguinIds: string[];
    submittedAt: Date;
    goldEarned: number;
    crystalType?: string;
  };
};

export type ExpeditionPreset = {
  allowedTypes: ScaleType[];
  goldPerPenguin: number;
  durationBoost: number;
  baseCrystalChance: number;
  perPenguinBonus: number;
  maxCrystalChance: number;
};

export const expeditionPresets = {
  rare: {
    allowedTypes: ["common"],
    goldPerPenguin: 5,
    durationBoost: 0.05,
    baseCrystalChance: 0.1,
    perPenguinBonus: 0.01,
    maxCrystalChance: 0.2,
  },
  epic: {
    allowedTypes: ["rare"],
    goldPerPenguin: 6,
    durationBoost: 0.06,
    baseCrystalChance: 0.07,
    perPenguinBonus: 0.008,
    maxCrystalChance: 0.15,
  },
  legendary: {
    allowedTypes: ["epic"],
    goldPerPenguin: 8,
    durationBoost: 0.07,
    baseCrystalChance: 0.05,
    perPenguinBonus: 0.006,
    maxCrystalChance: 0.12,
  },
  divine: {
    allowedTypes: ["legendary"],
    goldPerPenguin: 10,
    durationBoost: 0.08,
    baseCrystalChance: 0.03,
    perPenguinBonus: 0.005,
    maxCrystalChance: 0.1,
  },
};
