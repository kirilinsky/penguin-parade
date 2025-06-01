"use client";

import { loggedInAtom } from "@/atoms/user/user.atom";
import LastCraftedBlockComponent from "@/components/last-crafted-block/last-crafted-block.component";
import { LinkStyled } from "@/components/link/link.component.styled";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import RandomAuctionBlockComponent from "@/components/random-auction-block/random-auction-block.component";
import StatisticsBlockComponent from "@/components/statistics-block/statistics-block.component";
import TopUsersBlock from "@/components/top-users-block/top-users-block.component";
import TotalCountBlockComponent from "@/components/total-count-block/total-count-block.component";
import { useUserDetails } from "@/hooks/use-user-details";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user, refreshUser } = useUserDetails();
  const loggedIn = useAtomValue(loggedInAtom);
  const t = useTranslations("homePage");

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <PageContentWrapperComponent>
      <PageContentBlockStyled>
        <h1>attention</h1>
        <p>Application had new address</p>
        <a href="https://www.getpenguin.top">getpenguin.top</a>
      </PageContentBlockStyled>
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
              src="/infographics/welcome.png"
              width="120"
              height="120"
            />
            <LinkStyled title="Craft page" href={"/countdown"}>
              {t("linkCraftPage")}
            </LinkStyled>
          </PageContentBlockStyled>
          <LastCraftedBlockComponent />
          <TotalCountBlockComponent />
          <RandomAuctionBlockComponent />
          <TopUsersBlock />
          <StatisticsBlockComponent user={user} />
          <PageContentBlockStyled>
            <h2>Road map</h2>
            <ul>
              <li>Crystals system</li>
              <li>Expeditions (TBA)</li>
              <li>Notification toasts</li>
              <li>Anonymous home page, loggedIn limitations</li>
              <li>Gift functionality design update (notification)</li>
              <li>NFT Mint preparation</li>
              <li>Images avatar optimization</li>
              <li>Friends page design update</li>
              <li>Friends Updtes(news)</li>
              <li>Announcements</li>
              <li>Tutorial page</li>
              <li>Farms functionality</li>
              <li>Mystery eggs</li>
              <li>SignUp/Login via gmail</li>
            </ul>
          </PageContentBlockStyled>
          <PageContentBlockStyled>
            <h2>News</h2>
          </PageContentBlockStyled>
          <PageContentBlockStyled>
            <h2>Info</h2>
            <Image width="220" height="320" src="/scale-top.jpg" alt="scales" />
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
