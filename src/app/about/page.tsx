"use client";

import { loggedInAtom } from "@/atoms/user/user.atom";
import {
  AboutPageContainer,
  AboutPageSectionBlock,
  AboutPageSectionImage,
  AboutPageSectionText,
} from "@/components/about-page-layout/about-page-layout.styled";
import { LinkStyled } from "@/components/link/link.component.styled";
import { tutorialBlocks } from "@/data/about";
import { useAtomValue } from "jotai";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useTranslations } from "use-intl";

const AboutPage = () => {
  const t = useTranslations("aboutPage");
  const locale = useLocale();
  const loggedIn = useAtomValue(loggedInAtom);
  return (
    <AboutPageContainer>
      {tutorialBlocks.map((section, i) => (
        <AboutPageSectionBlock key={i} reverse={i % 2 !== 0}>
          <AboutPageSectionImage>
            <Image
              width={200}
              height={250}
              src={`/tutorial/${section.img}.webp`}
              alt={`Section ${i + 1}`}
            />
          </AboutPageSectionImage>
          <AboutPageSectionText>
            {section[locale as "ru" | "en"]}
          </AboutPageSectionText>
        </AboutPageSectionBlock>
      ))}

      <AboutPageSectionBlock>
        <AboutPageSectionText>
          {t("goCraftTitle")}
          <LinkStyled href={loggedIn ? "/countdown" : "/signup"}>
            {t(loggedIn ? "craftLink" : "signUpLink")}
          </LinkStyled>
        </AboutPageSectionText>
      </AboutPageSectionBlock>
    </AboutPageContainer>
  );
};

export default AboutPage;
