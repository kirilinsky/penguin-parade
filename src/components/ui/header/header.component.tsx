"use client";

import Link from "next/link";
import { HeaderLinks, HeaderWrapper } from "./header.component.styled";
import { NavigationLinkWrapper } from "../navigation-links/navigation-links.component.styled";
import { useL } from "@/components/pages/about/showcase/showcase-l10n";

const HeaderComponent = () => {
  const L = useL();

  const links = [
    { href: "/", label: L("Home", "Главная") },
    { href: "/catalog", label: L("Catalog", "Каталог") },
    { href: "/market", label: L("Market", "Рынок") },
    { href: "/evolution", label: L("Evolution", "Эволюция") },
    { href: "/expeditions", label: L("Expeditions", "Экспедиции") },
  ];

  return (
    <HeaderWrapper>
      <HeaderLinks>
        {links.map((l) => (
          <NavigationLinkWrapper key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </NavigationLinkWrapper>
        ))}
      </HeaderLinks>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
