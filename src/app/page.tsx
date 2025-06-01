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
    </PageContentWrapperComponent>
  );
}
