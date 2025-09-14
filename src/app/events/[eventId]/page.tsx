"use client";

import {
  LeftBlock,
  LibraryTitleWrapper,
} from "@/components/library-title/library-title.component.styled";
import { EventDivider } from "@/components/pages/events/event-divider/event-divider.styled";
import GalleryItemComponent from "@/components/pages/gallery/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/pages/gallery/gallery/gallery.component";
import AvatarComponent from "@/components/ui/avatar-component/avatar-component";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { useGetEventDetails } from "@/hooks/use-get-event-details";
import { useUserDetails } from "@/hooks/use-user-details";
import { ImageItem } from "@/types/image.types";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

const Page = () => {
  const { user } = useUserDetails();
  const { eventId } = useParams();
  const { event, allImages } = useGetEventDetails(eventId as string);
  const [myPenguins, setMyPenguins] = useState<ImageItem[]>([]);
  const [remainPenguins, setRemainPenguins] = useState<ImageItem[]>([]);
  const locale = useLocale();
  const t = useTranslations("eventPage");

  useEffect(() => {
    if (allImages && !!allImages.length) {
      const myPenguinsArray = allImages.filter(
        (img) => img.ownerId === user?.id
      );
      const remainPenguinsArray = allImages.filter(
        (img) => img.ownerId !== user?.id
      );
      setRemainPenguins(remainPenguinsArray);
      setMyPenguins(myPenguinsArray);
    }
  }, [allImages]);
  return (
    <>
      <LibraryTitleWrapper>
        <LeftBlock>
          <AvatarComponent
            username={"event"}
            avatarUrl={`https://jbvhrvmqvrgtlwxvabih.supabase.co/storage/v1/object/public/penguins/events/${event?.id}.webp`}
            avatarScale={null}
          />
          <div>
            <h1>{getLocalized(event?.title, locale)}</h1>
            <h3>
              {t("penguinsCreated")}: {allImages.length}
            </h3>
            <span>
              {event?.startDate &&
                new Intl.DateTimeFormat(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(event.startDate))}
              -{" "}
              {event?.endDate &&
                new Intl.DateTimeFormat(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(event.endDate))}
            </span>
          </div>
        </LeftBlock>
      </LibraryTitleWrapper>
      {!!myPenguins.length && (
        <>
          <EventDivider>
            <h2>{t('myPenguins')}</h2>
          </EventDivider>
          <GalleryComponent>
            {myPenguins.map((img: ImageItem) => (
              <GalleryItemComponent key={img.id} img={img} />
            ))}
          </GalleryComponent>
        </>
      )}
      <EventDivider>
        <h2>{t('othersPenguins')}</h2>
      </EventDivider>
      <GalleryComponent>
        {remainPenguins.map((img: ImageItem) => (
          <GalleryItemComponent key={img.id} img={img} />
        ))}
      </GalleryComponent>
    </>
  );
};

export default Page;
