"use client";

import { CSSProperties, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Rodal from "rodal";
import { useLocale } from "next-intl";
import { showcaseExpeditions, showcaseImageById } from "@/data/showcase";
import { expeditionPresets } from "@/types/expeditions.types";
import { ScaleType } from "@/types/scale.types";
import { ImageItem } from "@/types/image.types";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { getPrevScale } from "@/helpers/get-prev-scale/get-prev-scale";
import ExpeditionStatusBadge from "@/components/pages/expedition/expedition-status-badge/expedition-status-badge.component";
import GalleryItemScaleComponent from "@/components/pages/gallery/gallery-item-scale/gallery-item-scale.component";
import GalleryItemModalComponent from "@/components/modals/gallery-item-modal/gallery-item-modal.component";
import { useL } from "@/components/pages/about/showcase/showcase-l10n";
import {
  AvatarGrid,
  EventMeta,
  EventMetaChip,
  PenguinAvatar,
  PrizeChip,
  PrizeRow,
  ShowcaseSection,
  StatGroupLabel,
} from "@/components/pages/about/showcase/showcase-section.styled";

const noop = () => {};

export default function ExpeditionDetailPage() {
  const { expeditionId } = useParams();
  const locale = useLocale();
  const L = useL();
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);

  const expedition = useMemo(
    () => showcaseExpeditions.find((e) => e.id === expeditionId),
    [expeditionId]
  );

  const penguins = useMemo(() => {
    if (!expedition) return [];
    return (expedition.participants ?? [])
      .flatMap((p) => p.penguinIds ?? [])
      .map((id) => showcaseImageById.get(id))
      .filter(Boolean) as ImageItem[];
  }, [expedition]);

  if (!expedition) {
    return (
      <ShowcaseSection>
        <h2>{L("Not found", "Не найдено")}</h2>
        <Link href="/expeditions">← {L("Back", "Назад")}</Link>
      </ShowcaseSection>
    );
  }

  const color = getBaseColorByScale(expedition.level);
  const participantScale = getPrevScale(expedition.level) as ScaleType;
  const preset =
    expedition.preset ??
    expeditionPresets[expedition.level as keyof typeof expeditionPresets];
  const crystalChance = preset
    ? `${Math.round(preset.baseCrystalChance * 100)}–${Math.round(
        preset.maxCrystalChance * 100
      )}%`
    : null;
  const participantsCount =
    expedition.participantsCount || (expedition.participants ?? []).length;

  return (
    <ShowcaseSection>
      <div style={{ marginBottom: "0.8em" }}>
        <Link href="/expeditions">← {L("Back to expeditions", "К экспедициям")}</Link>
      </div>

      {/* Hero — compact */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.2em",
          marginBottom: "1.2em",
        }}
      >
        <img
          src={expedition.imageUrl}
          alt={getLocalized(expedition.settings?.title, locale)}
          style={{
            width: 190,
            maxWidth: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            borderRadius: 12,
            border: `1px solid ${color}`,
            boxShadow: `0 0 14px ${color}55`,
          }}
        />
        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7em",
              flexWrap: "wrap",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
              {getLocalized(expedition.settings?.title, locale)}
            </h1>
            <ExpeditionStatusBadge status={expedition.state} />
          </div>

          <EventMeta style={{ marginTop: "0.7em" }}>
            <EventMetaChip>
              <GalleryItemScaleComponent scale={expedition.level} />
            </EventMetaChip>
            <EventMetaChip>
              🐧 {expedition.totalPenguinsCount} {L("penguins", "пингвинов")}
            </EventMetaChip>
            <EventMetaChip>
              👥 {participantsCount} {L("participants", "участников")}
            </EventMetaChip>
            <EventMetaChip>⏱ {expedition.durationHours}h</EventMetaChip>
          </EventMeta>

          {expedition.settings?.goal && (
            <p style={{ opacity: 0.85, margin: "0.7em 0 0" }}>
              <strong>{L("Goal", "Цель")}:</strong>{" "}
              {getLocalized(expedition.settings.goal, locale)}
            </p>
          )}
          {expedition.settings?.description && (
            <p style={{ opacity: 0.7, margin: "0.4em 0 0", lineHeight: 1.45 }}>
              {getLocalized(expedition.settings.description, locale)}
            </p>
          )}
        </div>
      </div>

      {/* Prizes — compact chips */}
      <StatGroupLabel style={{ textAlign: "left", margin: "0.5em 0 0.5em" }}>
        {L("Prizes", "Призы")}
      </StatGroupLabel>
      <PrizeRow>
        <PrizeChip>
          <img
            src={`/csl/${expedition.level}_csl.webp`}
            alt={expedition.level}
            width={40}
            height={40}
          />
          <div>
            <b>{expedition.totalCrystals}</b>
            <br />
            <span>{L("crystals", "кристаллов")}</span>
          </div>
        </PrizeChip>
        <PrizeChip>
          <img src="/coin.webp" alt="gold" width={36} height={36} />
          <div>
            <b>{expedition.totalGoldEarned}</b>
            <br />
            <span>{L("gold", "золота")}</span>
          </div>
        </PrizeChip>
        {crystalChance && (
          <PrizeChip>
            <div>
              <b>{crystalChance}</b>
              <br />
              <span>{L("crystal chance", "шанс кристалла")}</span>
            </div>
          </PrizeChip>
        )}
      </PrizeRow>

      {/* Participants — small round avatars */}
      <StatGroupLabel style={{ textAlign: "left", margin: "1.4em 0 0.3em" }}>
        {L("Participants", "Участники")} · {penguins.length}{" "}
        {L("penguins", "пингвинов")}
      </StatGroupLabel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4em",
          opacity: 0.65,
          fontSize: "0.85rem",
          marginBottom: "0.7em",
        }}
      >
        {L("Required tier", "Нужный тир")}:{" "}
        <GalleryItemScaleComponent scale={participantScale} />
      </div>

      <Rodal
        showMask
        visible={!!detailsImage}
        onClose={() => setDetailsImage(null)}
      >
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

      {penguins.length > 0 ? (
        <AvatarGrid style={{ "--accent": color } as CSSProperties}>
          {penguins.map((img) => (
            <PenguinAvatar
              key={img.id}
              src={img.imageUrl}
              alt={img.title}
              title={getLocalized(img.settings?.t, locale)}
              onClick={() => setDetailsImage(img)}
            />
          ))}
        </AvatarGrid>
      ) : (
        <p style={{ opacity: 0.6 }}>
          {L("No participants joined.", "Никто не участвовал.")}
        </p>
      )}
    </ShowcaseSection>
  );
}
