export const getLocalized = (
  field: { en: string; ru: string } | undefined,
  locale: string
) => {
  if (!field) return "-";
  return field[locale as "en" | "ru"] ?? field.en;
};
