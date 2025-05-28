"use client";

import { useParams } from "next/navigation";
import React from "react";

const ExpeditionDetails = () => {
  const { expeditionId } = useParams();
  return <div>expeditionId - {expeditionId}</div>;
};

export default ExpeditionDetails;
