import { GameTile } from "@/types/games.types";

export const gameTiles: GameTile[] = [
  {
    id: "evolution",
    title: {
      en: "Evolution",
      ru: "Эволюция",
    },
    slug: "/evolve",
    description: {
      en: "Merge 8 penguins into a higher rank.",
      ru: "Объедини 8 пингвинов в более высокий ранг.",
    },
    image: "/games/evolution.webp",
    cta: {
      en: "Evolve",
      ru: "Эволюционировать",
    },
  },
  {
    id: "expeditions",
    title: {
      en: "Expeditions",
      ru: "Экспедиции",
    },
    slug: "/expeditions",
    description: {
      en: "Send your squad on timed quests to earn gold and crystals.",
      ru: "Отправь свой отряд в экспедиции, чтобы заработать золото и кристаллы.",
    },
    image: "/games/expeditions.webp",
    cta: {
      en: "Join",
      ru: "Присоединиться",
    },
  },
  {
    id: "events",
    title: {
      en: "Events",
      ru: "События",
    },
    slug: "/events",
    description: {
      en: "Look for the past events.",
      ru: "Взгляни на прошедшие игровые ивенты.",
    },
    image: "/games/events.webp",
    cta: {
      en: "Take a look",
      ru: "Посмотреть",
    },
  },
  {
    id: "guess-theme",
    title: {
      en: "Guess the Theme",
      ru: "Угадай тему",
    },
    slug: "/games/#guess-theme",
    description: {
      en: "See a random penguin, choose the correct theme out of 12 in 5 seconds.",
      ru: "Случайный пингвин: выбери его тему из 12 вариантов за 5 секунд.",
    },
    image: "/games/guess-theme.webp",
    cta: {
      en: "Let me try",
      ru: "Попробовать",
    },
  },
  {
    id: "guess-own",
    title: {
      en: "Guess Your Penguin",
      ru: "Угадай своего",
    },
    slug: "#",
    description: {
      en: "Two penguins: yours and someone else’s. Pick yours in 5 seconds.",
      ru: "Две карточки пингвина: твой и чужой. Найди своего за 5 секунд.",
    },
    image: "/games/guessyours.webp",
    cta: {
      en: "Soon",
      ru: "Скоро",
    },
  },
  {
    id: "clicker",
    title: {
      en: "Clicker",
      ru: "Кликер",
    },
    slug: "/games/clicker",
    description: {
      en: "Choose your penguin and click on it.",
      ru: "Выбери пингвина и кликай по нему",
    },
    image: "/games/clicker.webp",
    cta: {
      en: "Soon",
      ru: "Скоро",
    },
  },
];
