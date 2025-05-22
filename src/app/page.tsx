"use client";

import { loggedInAtom } from "@/atoms/user/user.atom";
import LastCraftedBlockComponent from "@/components/last-crafted-block/last-crafted-block.component";
import { LinkStyled } from "@/components/link/link.component.styled";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import RandomAuctionBlockComponent from "@/components/random-auction-block/random-auction-block.component";
import TotalCountBlockComponent from "@/components/total-count-block/total-count-block.component";
import { useUserDetails } from "@/hooks/use-user-details";
import { useAtomValue } from "jotai";
import Image from "next/image";

export default function Home() {
  const { user } = useUserDetails();
  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <PageContentWrapperComponent>
      {user && loggedIn ? (
        <>
          <PageContentBlockStyled>
            <h1>Welcome, {user.username}!</h1>
            <span>Here you can craft and collect unique Penguins.</span>
            <span>Then you can share or exchange with friends.</span>
            <Image
              alt="nofriends"
              src="/infographics/welcome.png"
              width="120"
              height="120"
            />
            <LinkStyled title="Craft new" href={"/countdown"}>
              Craft new Penguin!
            </LinkStyled>
          </PageContentBlockStyled>
          <LastCraftedBlockComponent />
          <TotalCountBlockComponent />
          <RandomAuctionBlockComponent />
          <PageContentBlockStyled>
            <h2>Road map</h2>
            <ul>
              <li>Gallery/Auction filtering </li>
              <li>Funds system</li>
              <li>Anonymous home page</li>
              <li>Gift functionality design update</li>
              <li>Pay to skip function</li>
              <li>Expeditions (TBA)</li>
              <li>NFT Mint preparation</li>
              <li>Images avatar optimization</li>
              <li>Friends page design update</li>
              <li>Friends Updtes(news)</li>
              <li>Announcements</li>
              <li>Tutorial page</li>
              <li>SignUp/Login via gmail</li>
              <li>I18n</li>
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
          <h2>Hello anon!</h2>
          <p>
            <LinkStyled href="/login">Please login</LinkStyled>
          </p>
        </PageContentBlockStyled>
      )}
    </PageContentWrapperComponent>
  );
}
