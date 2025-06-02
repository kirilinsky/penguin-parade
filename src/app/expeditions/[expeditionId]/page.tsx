"use client";

import ExpeditionPageGridComponent from "@/components/expedition-page-grid/expedition-page-grid.component";
import { useGetExpeditions } from "@/hooks/use-get-expeditions";
import { useParams } from "next/navigation";
import React from "react";

const ExpeditionDetails = () => {
  const { expeditionId } = useParams();

  const { expedition } = useGetExpeditions(expeditionId as string);
  console.log(expedition, "expedition");
  if (!expedition) return null;
  return <ExpeditionPageGridComponent expedition={expedition} />;
};

export default ExpeditionDetails;
