import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { EventCardData } from "@/types/event.types";
import { ImageItem } from "@/types/image.types";

export const useGetEventDetails = (eventId: string | null) => {
  const [event, setEvent] = useState<EventCardData | null>(null);
  const [allImages, setAllImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isCancelled = false;

    const run = async () => {
      if (!eventId) {
        setEvent(null);
        setAllImages([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const eventRef = doc(firestore, "events", eventId);
        const eventSnap = await getDoc(eventRef);

        if (!eventSnap.exists()) {
          if (!isCancelled) {
            setEvent(null);
            setAllImages([]);
          }
          return;
        }

        const raw = eventSnap.data() as EventCardData;

        if (!isCancelled) setEvent(raw);

        const imagesRef = collection(firestore, "images");
        const q = query(imagesRef, where("event", "==", eventId));
        const imgsSnap = await getDocs(q);

        const imgs: ImageItem[] = imgsSnap.docs.map((d) => {
          const data = d.data() as ImageItem;
          return { ...data, id: (data as any).id ?? d.id };
        });

        setAllImages(imgs);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => {
      isCancelled = true;
    };
  }, [eventId]);

  return { event, allImages, loading, error };
};
