"use client";
import { useMemo, useState } from "react";
import Rodal from "rodal";
import { format, isValid } from "date-fns";
import { useLocale } from "next-intl";
import GalleryItemModalComponent from "@/components/modals/gallery-item-modal/gallery-item-modal.component";
import { ImageItem } from "@/types/image.types";
import { showcaseEvents, showcaseImages } from "@/data/showcase";
import { useL } from "./showcase-l10n";
import {
  EventBanner,
  EventBannerWrap,
  EventBody,
  EventCard,
  EventCardInner,
  EventDesc,
  EventList,
  EventMeta,
  EventMetaChip,
  EventPenguinGrid,
  EventPenguinsWrap,
  EventPenguinThumb,
  EventTitle,
  ShowcaseSection,
  ShowcaseSectionSub,
  ShowcaseSectionTitle,
} from "./showcase-section.styled";

const noop = () => {};

const ShowcaseEvents = () => {
  const L = useL();
  const locale = useLocale();
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);

  const txt = (f: unknown): string => {
    if (!f) return "";
    if (typeof f === "string") return f;
    const o = f as { en?: string; ru?: string };
    return (locale === "ru" ? o.ru : o.en) ?? o.en ?? "";
  };

  const fmt = (iso?: string | null) => {
    if (!iso) return null;
    const d = new Date(iso);
    return isValid(d) ? format(d, "dd.MM.yy") : null;
  };

  const byEvent = useMemo(() => {
    const m = new Map<string, ImageItem[]>();
    for (const img of showcaseImages) {
      if (!img.event) continue;
      const arr = m.get(img.event) ?? [];
      arr.push(img);
      m.set(img.event, arr);
    }
    return m;
  }, []);

  const events = useMemo(
    () =>
      [...showcaseEvents].sort(
        (a, b) =>
          new Date(b.startDate ?? 0).getTime() -
          new Date(a.startDate ?? 0).getTime()
      ),
    []
  );

  const totalEventPenguins = useMemo(
    () => [...byEvent.values()].reduce((s, a) => s + a.length, 0),
    [byEvent]
  );

  if (events.length === 0) return null;

  return (
    <ShowcaseSection>
      <ShowcaseSectionTitle>
        {L("Events", "Ивенты")} — {events.length}
      </ShowcaseSectionTitle>
      <ShowcaseSectionSub>
        {L(
          `Limited-time themed events. Each one had its own art direction and spawned a wave of unique penguins — ${totalEventPenguins} created across all events.`,
          `Тематические ивенты на ограниченное время. У каждого своя арт-дирекция и волна уникальных пингвинов — всего ${totalEventPenguins} создано за все ивенты.`
        )}
      </ShowcaseSectionSub>

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

      <EventList>
        {events.map((e) => {
          const penguins = byEvent.get(e.id) ?? [];
          const from = fmt(e.startDate);
          const to = fmt(e.endDate);
          return (
            <EventCard key={e.id}>
              <EventCardInner>
                {e.imageUrl && (
                  <EventBannerWrap>
                    <EventBanner src={e.imageUrl} alt={txt(e.title)} />
                  </EventBannerWrap>
                )}
                <EventBody>
                  <EventTitle>{txt(e.title)}</EventTitle>
                  <EventMeta>
                    {from && to && (
                      <EventMetaChip>
                        🗓 {from} – {to}
                      </EventMetaChip>
                    )}
                    <EventMetaChip>
                      🐧 {penguins.length} {L("penguins", "пингвинов")}
                    </EventMetaChip>
                  </EventMeta>
                  {txt(e.description) && (
                    <EventDesc>{txt(e.description)}</EventDesc>
                  )}
                </EventBody>
              </EventCardInner>

              {penguins.length > 0 && (
                <EventPenguinsWrap>
                  <EventPenguinGrid>
                    {penguins.map((img) => (
                      <EventPenguinThumb
                        key={img.id}
                        src={img.imageUrl}
                        alt={img.title}
                        onClick={() => setDetailsImage(img)}
                      />
                    ))}
                  </EventPenguinGrid>
                </EventPenguinsWrap>
              )}
            </EventCard>
          );
        })}
      </EventList>
    </ShowcaseSection>
  );
};

export default ShowcaseEvents;
