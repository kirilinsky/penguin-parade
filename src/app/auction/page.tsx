"use client";

import AuctionItemModalComponent from "@/components/auction-item-modal/auction-item-modal.component";
import {
  GalleryFilterButton,
  GalleryFilterComponentContainer,
  GalleryFilterComponentSide,
} from "@/components/gallery-filter-component/gallery-filter-component.styled";
import GalleryItemScaleComponent from "@/components/gallery-item-scale/gallery-item-scale.component";
import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import { useGetImages } from "@/hooks/use-get-images";
import { useUserDetails } from "@/hooks/use-user-details";
import { ImageItem, ImagesSortType } from "@/types/image.types";
import { scaleOrder, ScaleType } from "@/types/scale.types";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Rodal from "rodal";

const AuctionPage = () => {
  const { images, refetch, rarityCount, loading } = useGetImages(
    true,
    "auction"
  );
  const { user, refreshUser } = useUserDetails();
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imagesFiltered, setImagesFiltered] = useState<ImageItem[]>([]);
  const [sortOption, setSortOption] = useState<ImagesSortType>("newest");
  const [filterOption, setFilterOption] = useState<"all" | ScaleType>("all");

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

  const onFilterOptionClick = (option: "all" | ScaleType) => {
    if (option === filterOption) {
      option = "all";
    }
    setFilterOption(option);
  };

  useEffect(() => {
    let filtered = [...images];

    if (filterOption !== "all") {
      filtered = filtered.filter((img) => img.settings.rarity === filterOption);
    }

    switch (sortOption) {
      case "newest":
        filtered.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        break;
      case "oldest":
        filtered.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
        break;
      case "rarity":
        filtered.sort(
          (a, b) =>
            scaleOrder.indexOf(b.settings.rarity) -
            scaleOrder.indexOf(a.settings.rarity)
        );
        break;
    }
    setImagesFiltered(filtered);
  }, [images, sortOption, filterOption]);

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
      {images.length && (
        <GalleryFilterComponentContainer>
          <GalleryFilterComponentSide>
            Sort by:
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="rarity">By Rarity</option>
            </select>
          </GalleryFilterComponentSide>
          <GalleryFilterComponentSide>
            Show only:
            {Object.keys(rarityCount).map((rarity) => (
              <GalleryFilterButton
                key={rarity}
                active={rarity === filterOption}
                onClick={() => onFilterOptionClick(rarity as ScaleType)}
              >
                <GalleryItemScaleComponent scale={rarity} />
              </GalleryFilterButton>
            ))}
          </GalleryFilterComponentSide>
        </GalleryFilterComponentContainer>
      )}
      {loading ? (
        "loading auction..."
      ) : (
        <GalleryComponent>
          {imagesFiltered.length ? (
            imagesFiltered.map((img: ImageItem) => (
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
