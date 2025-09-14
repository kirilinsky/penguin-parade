"use client";

import EventCardComponent from "@/components/pages/events/event-card/event-card.component";
import { GridSystem } from "@/components/ui/grid/grid.styled";
import {
  LoaderGrid,
  ShimmerCard,
} from "@/components/ui/skeleton-grid/skeleton-grid.styled";
import { useGetEvents } from "@/hooks/use-get-events";
import React from "react";

const Route = () => {
  const { events } = useGetEvents();

  return (
    <>
      {!events ? (
        <LoaderGrid>
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </LoaderGrid>
      ) : (
        <GridSystem>
          {events.map((event) => (
            <EventCardComponent event={event} key={event.id} />
          ))}
        </GridSystem>
      )}{" "}
    </>
  );
};

export default Route;
