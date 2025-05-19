"use client";

import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import { useGetImages } from "@/hooks/use-get-images";
import { ImageItem } from "@/types/image.types";
import React from "react";

const AuctionPage = () => {
  const { images, loading } = useGetImages(true, "auction");
  return (
    <div>
      <h2>Auction</h2>
      {loading ? (
        "loading auction..."
      ) : (
        <GalleryComponent>
          {images.length ? (
            images.map((img: ImageItem) => (
              /* add onclick modal for auction */
              <GalleryItemComponent key={img.id} img={img} />
            ))
          ) : (
            <div>
              <p>Seems there are no Penguins yet.</p>
            </div>
          )}
        </GalleryComponent>
      )}
    </div>
  );
};

export default AuctionPage;
