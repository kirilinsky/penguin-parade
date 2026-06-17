import { useLocale } from "next-intl";

// Tiny bilingual helper for showcase-only labels, so we don't have to touch
// the shared messages files for a one-off archive page.
export const useL = () => {
  const locale = useLocale();
  return (en: string, ru: string) => (locale === "ru" ? ru : en);
};
