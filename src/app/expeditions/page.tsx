"use client";

import ExpeditionGalleryItem from "@/components/pages/expedition/expedition-gallery-item/expedition-gallery-item.component";
import ExpeditionGallery from "@/components/pages/expedition/expedition-gallery/expedition-gallery.component";
import { useGetExpeditions } from "@/hooks/use-get-expeditions";
import React from "react";

const PageExpeditions = () => {
  const { loading, expeditions, hasActive } = useGetExpeditions();

  return (
    <div>
      {loading ? (
        "loading expeditions..."
      ) : !expeditions.length ? (
        <div>empty for now</div>
      ) : (
        <ExpeditionGallery>
          {expeditions.map((expedition) => (
            <ExpeditionGalleryItem
              expedition={expedition}
              key={expedition.id}
            />
          ))}
        </ExpeditionGallery>
      )}
    </div>
  );
};

export default PageExpeditions;
