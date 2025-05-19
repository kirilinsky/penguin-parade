"use client";

import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import GalleryItemComponent from "../gallery-item/gallery-item.component";
import { LinkStyled } from "../link/link.component.styled";
import Image from "next/image";
import { useGetImages } from "@/hooks/use-get-images";

const LastCraftedBlockComponent = () => {
  const { images, loading } = useGetImages(true);

  return (
    <PageContentBlockStyled>
      <h2>Last Crafted Penguin</h2>
      {!loading && images && images.length ? (
        <GalleryItemComponent slim scalable={false} img={images[0]} />
      ) : (
        <>
          <p>You don't have Penguins yet! </p>
          <LinkStyled href={"/countdown"}>Craft new</LinkStyled>

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

export default LastCraftedBlockComponent;
