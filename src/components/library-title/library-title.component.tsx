import React, { useMemo } from "react";
import AvatarComponent from "../ui/avatar-component/avatar-component";
import {
  LibraryTitleWrapper,
  LeftBlock,
  RightBlock,
  AvatarTitleWrap,
  EventsList,
  EventsBlock,
} from "./library-title.component.styled";
import { useTranslations } from "next-intl";
import { RarityCount } from "@/hooks/use-get-images";

import GalleryItemScaleComponent from "../pages/gallery/gallery-item-scale/gallery-item-scale.component";
import { scaleOrder, ScaleType } from "@/types/scale.types";
import {
  TotalCountBlockItem,
  TotalCountBlockItemNumber,
} from "../pages/main/total-count-block/total-count-block.component.styled";
import Link from "next/link";

const LibraryTitleComponent = ({
  user,
  imagesCount,
  eventsId,
  isMyPage,
  rarityCount,
}: {
  user: any;
  imagesCount: number;

  isMyPage: boolean;
  rarityCount: RarityCount;
  eventsId?: (string | null)[];
}) => {
  const t = useTranslations("libraryTitle");
  if (!user) {
    return null;
  }

  const counts = useMemo(() => {
    return Object.entries(rarityCount).sort(
      ([keyA], [keyB]) =>
        scaleOrder.indexOf(keyA as ScaleType) -
        scaleOrder.indexOf(keyB as ScaleType)
    );
  }, [rarityCount]);

  return (
    <LibraryTitleWrapper>
      <LeftBlock>
        <AvatarTitleWrap>
          <AvatarComponent
            username={user?.username}
            avatarUrl={user?.avatar}
            avatarScale={user?.avatarScale}
          />
          <h1>
            {isMyPage ? t("my") : user?.username} {t("penguins")} ({imagesCount}
            )
          </h1>
        </AvatarTitleWrap>
        {!!eventsId?.length && (
          <EventsBlock>
            {isMyPage ? t("my") : user?.username} {t("events")}:
            <EventsList>
              {eventsId.map((eventId) => (
                <Link key={eventId} href={`/events/${eventId}`}>
                  <AvatarComponent
                    username={"event"}
                    mini
                    avatarUrl={`https://jbvhrvmqvrgtlwxvabih.supabase.co/storage/v1/object/public/penguins/events/${eventId}.webp`}
                    avatarScale={null}
                  />
                </Link>
              ))}
            </EventsList>
          </EventsBlock>
        )}
      </LeftBlock>
      <RightBlock>
        {counts.map(([key, value]) => {
          return (
            <TotalCountBlockItem key={key}>
              <GalleryItemScaleComponent scale={key as ScaleType} />
              <TotalCountBlockItemNumber>{value}</TotalCountBlockItemNumber>
            </TotalCountBlockItem>
          );
        })}
      </RightBlock>
    </LibraryTitleWrapper>
  );
};

export default LibraryTitleComponent;
