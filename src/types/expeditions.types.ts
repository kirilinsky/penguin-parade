import { Timestamp } from "firebase-admin/firestore";
import { LocalizedField } from "./image.types";
import { ScaleType } from "./scale.types";

export type ExpeditionState = "preparing" | "active" | "ended" | "resultsReady";

export const expeditionStatusColors: Record<
  ExpeditionState,
  { background: string; color: string }
> = {
  preparing: {
    background: "#ffe066",
    color: "#4a3900",
  },
  active: {
    background: "#4dabf7",
    color: "#003566",
  },
  ended: {
    background: "#adb5bd",
    color: "#212529",
  },
  resultsReady: {
    background: "#69db7c",
    color: "#0b3d0b",
  },
};

export type Expedition = {
  id: string;
  settings: ExpeditionSettings;
  level: ScaleType;
  minParticipants: number;
  maxParticipants: number;
  participantsCount: number;
  durationHours: number;
  imageUrl: string;
  state: ExpeditionState;
  createdAt: Timestamp;
  preparationStartedAt: Timestamp;
  preparationEndedAt: Timestamp;
  activePhaseStartedAt: Timestamp;
  activePhaseEndedAt: Timestamp;
  preset: ExpeditionPreset;
  totalPenguinsCount: number;
  participants: ExpeditionParticipantUser[];
};

export type ExpeditionSettings = {
  title: LocalizedField;
  theme: LocalizedField;
  goal: LocalizedField;
  description: LocalizedField;
};

export type ExpeditionParticipantUser = {
  userId: string;
  penguinIds: string[];
  submittedAt: Date;
  goldEarned?: number;
  crystalType?: string;
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
