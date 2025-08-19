"use client";

import PenguinDetailsComponent from "@/components/pages/details/penguin-details/penguin-details.component";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const { penguinId, id } = useParams();
  return (
    <div>
      {penguinId} - {id}
      <PenguinDetailsComponent />
    </div>
  );
};

export default Page;
