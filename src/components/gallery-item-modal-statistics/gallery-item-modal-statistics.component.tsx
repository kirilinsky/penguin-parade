import React from "react";
import {
  GalleryItemModalStatisticsDes,
  GalleryItemModalStatisticsGrid,
  GalleryItemModalStatisticsItem,
  GalleryItemModalStatisticsTrait,
} from "./gallery-item-modal-statistics.component.styled";
import { ImageItem } from "@/types/image.types";
import { format } from "date-fns";

const GalleryItemModalStatistics = ({ img }: { img: ImageItem }) => {
  return (
    <GalleryItemModalStatisticsGrid>
      <GalleryItemModalStatisticsDes>
        {img.settings.des}
      </GalleryItemModalStatisticsDes>
      <GalleryItemModalStatisticsItem>
        <h3>Theme</h3>
        <p>{img.settings.theme}</p>
      </GalleryItemModalStatisticsItem>
      <GalleryItemModalStatisticsItem>
        <h3>Ability</h3>
        <p>{img.settings.ability}</p>
      </GalleryItemModalStatisticsItem>
      <GalleryItemModalStatisticsItem>
        <h3>Loot</h3>
        <p>{img.settings.acc}</p>
      </GalleryItemModalStatisticsItem>
      <GalleryItemModalStatisticsItem>
        <h3>Creation Date</h3>
        <p>{format(img.createdAt.toDate(), "dd.MM.yy")}</p>
      </GalleryItemModalStatisticsItem>
      {img.auction && (
        <GalleryItemModalStatisticsItem>
          <h3>On Auction since </h3>
          <p>{format(img.placedForAuctionAt.toDate(), "dd.MM.yy")}</p>
        </GalleryItemModalStatisticsItem>
      )}
      {img.auction && (
        <GalleryItemModalStatisticsItem>
          <h3>Price </h3>
          <p>{img.price} P$</p>
        </GalleryItemModalStatisticsItem>
      )}
      <GalleryItemModalStatisticsTrait>
        <h3>Beak Color</h3>
        <p>{img.settings.beak}</p>
      </GalleryItemModalStatisticsTrait>
      <GalleryItemModalStatisticsTrait>
        <h3>Back Color</h3>
        <p>{img.settings.back}</p>
      </GalleryItemModalStatisticsTrait>
      <GalleryItemModalStatisticsTrait>
        <h3>Chest Color</h3>
        <p>{img.settings.breast}</p>
      </GalleryItemModalStatisticsTrait>
      <GalleryItemModalStatisticsTrait>
        <h3>Origin</h3>
        <p>{img.origin}</p>
      </GalleryItemModalStatisticsTrait>
    </GalleryItemModalStatisticsGrid>
  );
};

export default GalleryItemModalStatistics;
