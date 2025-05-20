"use client";

import { loggedInAtom } from "@/atoms/user/user.atom";
import LastCraftedBlockComponent from "@/components/last-crafted-block/last-crafted-block.component";
import { LinkStyled } from "@/components/link/link.component.styled";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
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
              Craft new!
            </LinkStyled>
          </PageContentBlockStyled>
          <LastCraftedBlockComponent />
          <TotalCountBlockComponent />
          <PageContentBlockStyled>
            <h2>Road map</h2>
            <ul>
              <li>Improve generation rules</li>
              <li>Evolution</li>
              <li>Funds system</li>
              <li>Auction</li>
              <li>Centralized storage</li>
              <li>NFT Mint preparation</li>
              <li>Images optimization</li>
              <li>Friends updates</li>
              <li>Tutorial page</li>
              <li>SignUp/Login via gmail</li>
              <li>I18n</li>
            </ul>
          </PageContentBlockStyled>
          <PageContentBlockStyled>
            <h2>News</h2>
          </PageContentBlockStyled>
          <PageContentBlockStyled>
            <h2>Auction</h2>
            <span>coming soon</span>
          </PageContentBlockStyled>
          <PageContentBlockStyled>
            <h2>Info</h2>
            <Image width="220" height="320" src="/scale-top.jpg" alt="scales" />
          </PageContentBlockStyled>
        </>
      ) : (
        <PageContentBlockStyled>
          <p>
            please <a href="/login">login</a>
          </p>
        </PageContentBlockStyled>
      )}
    </PageContentWrapperComponent>
  );
}
