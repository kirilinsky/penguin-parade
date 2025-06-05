import { ExpeditionRewardResponse } from "@/types/expeditions.types";

export const getRewardCall = async ({
  expeditionId,
  token,
}: {
  expeditionId: string;
  token: string | null;
}): Promise<ExpeditionRewardResponse> => {
  if (!token) {
    throw new Error("Missing token");
  }

  const res = await fetch("/api/expeditions/get-reward", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ expeditionId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to claim reward");
  }

  return data as {
    success: true;
    rewardGold: number;
    crystal: string | null;
  };
};
