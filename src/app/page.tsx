"use client";

import { loggedInAtom } from "@/atoms/user/user.atom";
import CrystalsBlock from "@/components/crystals-block/crystals-block.component";
import LastCraftedBlockComponent from "@/components/last-crafted-block/last-crafted-block.component";
import { LinkStyled } from "@/components/link/link.component.styled";
import NotifictionsBlock from "@/components/notifications-block/notifictions-block.component";
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
          <NotifictionsBlock />
          <LastCraftedBlockComponent />
          <TotalCountBlockComponent />
          <RandomAuctionBlockComponent />
          <TopUsersBlock />
          <StatisticsBlockComponent user={user} />

          <PageContentBlockStyled>
            <h2>Road map</h2>
            <ul>
              <li>System notifications</li>
              <li>Allow to craft/expedition notifications</li>
              <li>Gift functionality design update (notification)</li>
              <li>Notification toasts</li>
              <li>Anonymous home page, loggedIn limitations</li>
              <li>NFT Mint preparation</li>
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
