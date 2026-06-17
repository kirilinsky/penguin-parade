"use client";
import { useEffect, useMemo, useState } from "react";
import Rodal from "rodal";
import GalleryComponent from "@/components/pages/gallery/gallery/gallery.component";
import GalleryItemComponent from "@/components/pages/gallery/gallery-item/gallery-item.component";
import GalleryFilterComponent from "@/components/pages/gallery/gallery-filter-component/gallery-filter-component";
import GalleryItemModalComponent from "@/components/modals/gallery-item-modal/gallery-item-modal.component";
import NeonButtonComponent from "@/components/ui/neon-button/neon-button.component";
import {
  ImageItem,
  ImageOriginType,
  ImagesSortType,
} from "@/types/image.types";
import { ScaleType, scaleOrder } from "@/types/scale.types";
import { showcaseAuction } from "@/data/showcase";
import { useL } from "./showcase-l10n";
import {
  ShowcaseSection,
  ShowcaseSectionSub,
  ShowcaseSectionTitle,
} from "./showcase-section.styled";

const PAGE = 48;
const noop = () => {};

const ShowcaseMarket = () => {
  const L = useL();
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);
  const [sortOption, setSortOption] = useState<ImagesSortType>("expensive");
  const [filterOption, setFilterOption] = useState<"all" | ScaleType>("all");
  const [originOption, setOriginOption] = useState<"all" | ImageOriginType>(
    "all"
  );
  const [visible, setVisible] = useState(PAGE);

  const rarityCount = useMemo(
    () =>
      showcaseAuction.reduce((acc, i) => {
        const r = i.settings?.rarity;
        if (r) acc[r] = (acc[r] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    []
  );
  const origins = useMemo(
    () =>
      Array.from(
        new Set(showcaseAuction.map((i) => i.origin).filter(Boolean))
      ).sort() as string[],
    []
  );

  const filtered = useMemo(() => {
    let list = [...showcaseAuction];
    if (originOption !== "all") {
      list = list.filter((img) => img.origin === originOption);
    }
    if (filterOption !== "all") {
      list = list.filter((img) => img.settings?.rarity === filterOption);
    }
    switch (sortOption) {
      case "expensive":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "cheap":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "newest":
        list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
      case "oldest":
        list.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
        break;
      case "rarity":
        list.sort(
          (a, b) =>
            scaleOrder.indexOf(b.settings?.rarity as ScaleType) -
            scaleOrder.indexOf(a.settings?.rarity as ScaleType)
        );
        break;
    }
    return list;
  }, [sortOption, filterOption, originOption]);

  useEffect(() => setVisible(PAGE), [sortOption, filterOption, originOption]);

  if (showcaseAuction.length === 0) return null;

  return (
    <ShowcaseSection>
      <ShowcaseSectionTitle>
        {L("The market", "Рынок")} — {showcaseAuction.length}
      </ShowcaseSectionTitle>
      <ShowcaseSectionSub>
        {L(
          "Penguins could be listed for sale and bought with in-game gold. These are the offers frozen at closing time.",
          "Пингвинов можно было выставлять на продажу и покупать за игровое золото. Это предложения, замороженные на момент закрытия."
        )}
      </ShowcaseSectionSub>

      <Rodal showMask visible={!!detailsImage} onClose={() => setDetailsImage(null)}>
        <GalleryItemModalComponent
          img={detailsImage}
          isMyPage={false}
          friends={[]}
          loading={false}
          user={null}
          onSendGift={noop}
          onSellImage={noop}
          setAvatar={noop}
        />
      </Rodal>

      <GalleryFilterComponent
        isAuction
        origins={origins}
        sortOption={sortOption}
        rarityCount={rarityCount}
        originOption={originOption}
        filterOption={filterOption}
        setSortOption={setSortOption}
        onFilterOptionClick={(o) =>
          setFilterOption((prev) => (prev === o ? "all" : o))
        }
        onOriginOptionClick={(o) =>
          setOriginOption((prev) => (prev === o ? "all" : o))
        }
      />

      <GalleryComponent>
        {filtered.slice(0, visible).map((img) => (
          <GalleryItemComponent
            key={img.id}
            img={img}
            onClick={() => setDetailsImage(img)}
          />
        ))}
      </GalleryComponent>

      {visible < filtered.length && (
        <div style={{ textAlign: "center", marginTop: "1.5em" }}>
          <NeonButtonComponent
            title={`${L("Show more", "Показать ещё")} (${filtered.length - visible})`}
            onClick={() => setVisible((v) => v + PAGE)}
          />
        </div>
      )}
    </ShowcaseSection>
  );
};

export default ShowcaseMarket;
