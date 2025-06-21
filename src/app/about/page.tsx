"use client";

import {
  AboutPageContainer,
  AboutPageSectionBlock,
  AboutPageSectionImage,
  AboutPageSectionText,
} from "@/components/about-page-layout/about-page-layout.styled";
import { tutorialBlocks } from "@/data/about";
import { useLocale } from "next-intl";
import Image from "next/image";

const AboutPage = () => {
  const locale = useLocale();
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
    </AboutPageContainer>
  );
};

export default AboutPage;
