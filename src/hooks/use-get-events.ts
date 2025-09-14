import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";
import { EventCardData } from "@/types/event.types";

export const useGetEvents = () => {
  const [events, setEvents] = useState<EventCardData[] | []>([]);
  const [event, setEvent] = useState<EventCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const eventsArray: EventCardData[] = [];
      try {
        const snap = await getDocs(collection(firestore, "events"));
        const now = new Date();

        for (const doc of snap.docs) {
          const data = doc.data() as EventCardData;
          eventsArray.push(data);
          const start = new Date(data.startDate);
          const end = new Date(data.endDate);

          if (now >= start && now <= end) {
            setEvent({ ...data, startDate: start, endDate: end });
            return;
          }
        }
        setEvents(eventsArray);
        setEvent(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { event, events, loading, error };
};
