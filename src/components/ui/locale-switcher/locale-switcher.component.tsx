"use client";

import { LanguageSelector } from "next-language-selector";

export default function LocaleSwitcher() {
  return (
    <LanguageSelector
      defaultLocale="en"
      isDropdown={false}
      activeColor="#214d26d4"
      locales={[
        { name: "English", code: "en", flag: "🇺🇸" },
        { name: "Русский", code: "ru", flag: "🇷🇺" },
      ]}
    />
  );
}
