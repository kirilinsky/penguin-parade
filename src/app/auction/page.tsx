"use client";

import AuctionItemModalComponent from "@/components/auction-item-modal/auction-item-modal.component";
import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import { useGetImages } from "@/hooks/use-get-images";
import { useUserDetails } from "@/hooks/use-user-details";
import { ImageItem } from "@/types/image.types";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import Rodal from "rodal";

const AuctionPage = () => {
  const { images, refetch, loading } = useGetImages(true, "auction");
  const { user, refreshUser } = useUserDetails();
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buyImage = async (imageId: string) => {
    setIsLoading(true);
    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!user || !userCred || !imageId) return;

    const token = await userCred.getIdToken(true);

    try {
      const res = await fetch("/api/buy-image", {
        method: "POST",
        body: JSON.stringify({
          imageId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Penguin has been bought");
        refetch();
        refreshUser();
        setDetailsImage(null);
      } else {
        console.error("Buy process failed:", data);
      }
    } catch (err) {
      console.error("Error during buy process:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Rodal visible={!!detailsImage} onClose={() => setDetailsImage(null)}>
        <AuctionItemModalComponent
          onBuyImage={buyImage}
          user={user}
          img={detailsImage}
          isLoading={isLoading}
        />
      </Rodal>
      <h2>Auction</h2>
      {loading ? (
        "loading auction..."
      ) : (
        <GalleryComponent>
          {images.length ? (
            images.map((img: ImageItem) => (
              /* add onclick modal for auction */
              <GalleryItemComponent
                onClick={() => setDetailsImage(img)}
                key={img.id}
                img={img}
              />
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
