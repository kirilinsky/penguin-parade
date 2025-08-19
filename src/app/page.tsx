"use client";

import { loggedInAtom } from "@/atoms/user/user.atom";
import { LinkStyled } from "@/components/ui/link/link.component.styled";
import { PageContentBlockStyled } from "@/components/ui/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/ui/page-content-wrapper/page-content-wrapper.component";
import TopUsersBlock from "@/components/pages/main/top-users-block/top-users-block.component";
import { useUserDetails } from "@/hooks/use-user-details";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import CrystalsBlock from "@/components/pages/main/crystals-block/crystals-block.component";
import { PenguinProgressBlock } from "@/components/pages/main/progress-block/progress-block.component";
import LastCraftedBlockComponent from "@/components/pages/main/last-crafted-block/last-crafted-block.component";
import TotalCountBlockComponent from "@/components/pages/main/total-count-block/total-count-block.component";
import RandomAuctionBlockComponent from "@/components/pages/main/random-auction-block/random-auction-block.component";
import StatisticsBlockComponent from "@/components/pages/main/statistics-block/statistics-block.component";

export default function Home() {
  const { user, refreshUser } = useUserDetails();
  const loggedIn = useAtomValue(loggedInAtom);
  const t = useTranslations("homePage");

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <PageContentWrapperComponent>
      {user && loggedIn ? (
        <>
          <PageContentBlockStyled>
            <h1>
              {t("welcome")}, {user.username}!
            </h1>
            <p style={{ width: "75%", textAlign: "center" }}>{t("subtitle")}</p>
            <br />
            <span>{t("actionText")}</span>

            <Image
              alt="nofriends"
              src="/infographics/welcome.webp"
              width="130"
              height="140"
            />
            <LinkStyled title="Craft page" href={"/countdown"}>
              {t("linkCraftPage")}
            </LinkStyled>
          </PageContentBlockStyled>
          <CrystalsBlock />
          <PenguinProgressBlock />
          <LastCraftedBlockComponent />
          <TotalCountBlockComponent />
          <RandomAuctionBlockComponent />
          <TopUsersBlock />
          <StatisticsBlockComponent user={user} />
          <PageContentBlockStyled>
            <h2>Road map</h2>
            <ul>
              <li>Mini games</li>
              <li>Events page</li>
              <li>Suspicious gifts ban</li>
              <li>Gift functionality design update (notification)</li>
              <li>Anonymous home page, loggedIn limitations</li>
              <li>NFT Mint preparation</li>
              <li>Friends Updtes (news) </li>
              <li>Announcements</li>
              <li>Allow to craft notifications</li>
              <li>Farms functionality</li>
              <li>Mystery eggs</li>
              <li>SignUp/Login via gmail</li>
            </ul>
          </PageContentBlockStyled>

          <PageContentBlockStyled>
            <Image
              width="320"
              height="320"
              src="/infographics/scales.webp"
              alt="scales"
            />
          </PageContentBlockStyled>
        </>
      ) : (
        <PageContentBlockStyled>
          <h2>{t("anonTitle")}</h2>
          <p>
            <LinkStyled href="/login">{t("loginButton")}</LinkStyled>
          </p>
        </PageContentBlockStyled>
      )}
    </PageContentWrapperComponent>
  );
}
