"use client";

import ExpeditionPageGridComponent from "@/components/expedition-page-grid/expedition-page-grid.component";
import { useGetExpeditions } from "@/hooks/use-get-expeditions";
import { useUserDetails } from "@/hooks/use-user-details";
import { useParams } from "next/navigation";
import React from "react";

const ExpeditionDetails = () => {
  const { expeditionId } = useParams();
  const { user } = useUserDetails();

  const { expedition } = useGetExpeditions(expeditionId as string);
  if (!expedition || !user) return null;
  return <ExpeditionPageGridComponent user={user} expedition={expedition} />;
};

export default ExpeditionDetails;
