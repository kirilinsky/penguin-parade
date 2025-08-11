import React from "react";
import {
  GalleryFilterButton,
  GalleryFilterComponentContainer,
  GalleryFilterComponentSide,
} from "./gallery-filter-component.styled";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { ScaleType } from "@/types/scale.types";
import { ImageOriginType, ImagesSortType } from "@/types/image.types";
import { RarityCount } from "@/hooks/use-get-images";
import { useTranslations } from "next-intl";

const GalleryFilterComponent = ({
  isAuction,
  sortOption,
  setSortOption,
  origins,
  rarityCount,
  originOption,
  filterOption,
  onOriginOptionClick,
  onFilterOptionClick,
}: {
  isAuction: boolean;
  sortOption: ImagesSortType;
  rarityCount: RarityCount;
  origins: string[];
  setSortOption: (sortType: ImagesSortType) => void;
  filterOption: ScaleType | "all";
  originOption: ImageOriginType | "all";
  onOriginOptionClick: (option: "all" | ImageOriginType) => void;
  onFilterOptionClick: (option: "all" | ScaleType) => void;
}) => {
  const t = useTranslations("filter");

  return (
    <GalleryFilterComponentContainer>
      <GalleryFilterComponentSide>
        {t("sortBy")}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}
        >
          {isAuction && <option value="expensive"> {t("expensive")}</option>}
          {isAuction && <option value="cheap">{t("cheap")}</option>}
          <option value="newest">{t("newest")}</option>
          <option value="oldest">{t("oldest")}</option>
          <option value="rarity">{t("rarity")}</option>
        </select>
      </GalleryFilterComponentSide>
      <GalleryFilterComponentSide>
        {t("origin")}
        <select
          value={originOption}
          onChange={(e) => onOriginOptionClick(e.target.value as any)}
        >
          <option value={"all"}> {t("all")}</option>
          {origins.filter(x=>!!x).map((origin) => (
            <option key={origin + "origin"} value={origin}>
              {t(origin)}
            </option>
          ))}
        </select>
      </GalleryFilterComponentSide>
      <GalleryFilterComponentSide>
        {t("showOnly")}
        {Object.keys(rarityCount).map((rarity) => (
          <GalleryFilterButton
            key={rarity}
            active={rarity === filterOption}
            onClick={() => onFilterOptionClick(rarity as ScaleType)}
          >
            <GalleryItemScaleComponent scale={rarity as ScaleType} />
          </GalleryFilterButton>
        ))}
      </GalleryFilterComponentSide>
    </GalleryFilterComponentContainer>
  );
};

export default GalleryFilterComponent;
