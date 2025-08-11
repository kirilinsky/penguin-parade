"use client";

import GalleryFilterComponent from "@/components/gallery-filter-component/gallery-filter-component";

import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import AuctionItemModalComponent from "@/components/modals/auction-item-modal/auction-item-modal.component";
import { getIdToken } from "@/helpers/get-token/get-token";
import { useGetImages } from "@/hooks/use-get-images";
import { useUserDetails } from "@/hooks/use-user-details";
import {
  ImageItem,
  ImageOriginType,
  ImagesSortType,
} from "@/types/image.types";
import { scaleOrder, ScaleType } from "@/types/scale.types";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Rodal from "rodal";

const AuctionPage = () => {
  const { images, refetch, rarityCount, origins, loading } = useGetImages(
    true,
    "auction"
  );
  const { user, refreshUser } = useUserDetails();
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imagesFiltered, setImagesFiltered] = useState<ImageItem[]>([]);
  const [sortOption, setSortOption] = useState<ImagesSortType>("expensive");
  const [filterOption, setFilterOption] = useState<"all" | ScaleType>("all");
  const [originOption, setOriginOption] = useState<"all" | ImageOriginType>(
    "all"
  );

  const buyImage = async (imageId: string) => {
    setIsLoading(true);
    if (!user || !imageId) return;

    const token = await getIdToken();

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
        refetch();
        refreshUser();
        setDetailsImage(null);
        toast.success("Penguin has been bought");
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error(err.message);
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

  const onOriginOptionClick = (option: "all" | ImageOriginType) => {
    if (option === filterOption) {
      option = "all";
    }
    setOriginOption(option);
  };

  useEffect(() => {
    let filtered = [...images];

    if (originOption !== "all") {
      filtered = filtered.filter((img) => img.origin === originOption);
    }

    if (filterOption !== "all") {
      filtered = filtered.filter((img) => img.settings.rarity === filterOption);
    }

    switch (sortOption) {
      case "cheap":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        filtered.sort((a, b) => b.price - a.price);
        break;
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
  }, [images, sortOption, originOption, filterOption]);

  return (
    <div>
      <Rodal
        showMask
        visible={!!detailsImage}
        onClose={() => setDetailsImage(null)}
      >
        <AuctionItemModalComponent
          onBuyImage={buyImage}
          user={user}
          img={detailsImage}
          isLoading={isLoading}
        />
      </Rodal>
      <h2>Market - {imagesFiltered.length} offers</h2>
      {images.length && (
        <GalleryFilterComponent
          isAuction
          origins={origins}
          sortOption={sortOption}
          rarityCount={rarityCount}
          originOption={originOption}
          filterOption={filterOption}
          setSortOption={setSortOption}
          onFilterOptionClick={onFilterOptionClick}
          onOriginOptionClick={onOriginOptionClick}
        />
      )}
      {loading ? (
        "loading auction..."
      ) : (
        <GalleryComponent>
          {imagesFiltered.length ? (
            imagesFiltered.map((img: ImageItem) => (
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
