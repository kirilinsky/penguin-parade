"use client";

import React, { useMemo } from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import GalleryItemComponent from "../gallery-item/gallery-item.component";
import { LinkStyled } from "../link/link.component.styled";
import Image from "next/image";
import { useGetImages } from "@/hooks/use-get-images";

const RandomAuctionBlockComponent = () => {
  const { images, loading } = useGetImages(true, "auction");

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * images.length);
  }, [images]);

  return (
    <PageContentBlockStyled>
      <h2>Random Auction Deal</h2>
      {!loading && images && images.length ? (
        <>
          <GalleryItemComponent
            slim
            glare={false}
            scalable={false}
            img={images[randomNumber]}
          />

          <LinkStyled href="/auction">Go to Auction</LinkStyled>
        </>
      ) : (
        <>
          <p>Sorry, nothing for sale this time! </p>
          <span>Come to check later</span>
          <Image
            alt="nofriends"
            src="/infographics/no-friends.png"
            width="120"
            height="120"
          />
        </>
      )}
    </PageContentBlockStyled>
  );
};

export default RandomAuctionBlockComponent;
