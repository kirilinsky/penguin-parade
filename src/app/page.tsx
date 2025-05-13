"use client";

import { userIdAtom, userNameAtom } from "@/atoms/user/user.atom";
import { LinkStyled } from "@/components/link/link.component.styled";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import { useAtomValue } from "jotai";
import Image from "next/image";

export default function Home() {
  const username = useAtomValue(userNameAtom);
  const uid = useAtomValue(userIdAtom);
  return (
    <div>
      <PageContentWrapperComponent>
        {uid && username ? (
          <>
            <PageContentBlockStyled>
              <h1>Welcome, {username}!</h1>
              <span>Here you can collect unique Penguins.</span>
              <br />
              <LinkStyled title="generate new" href={"/countdown"}>
                Generate new!
              </LinkStyled>
            </PageContentBlockStyled>
            <PageContentBlockStyled>
              <h2>Last generated</h2>
            </PageContentBlockStyled>
            <PageContentBlockStyled>
              <h2>Total count</h2>
            </PageContentBlockStyled>
            <PageContentBlockStyled>
              <h2>Friends</h2>
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
            {" "}
            <p>
              please <a href="/login">login</a>
            </p>
          </PageContentBlockStyled>
        )}
      </PageContentWrapperComponent>
    </div>
  );
}
