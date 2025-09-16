"use client";

import ClickerScreen from "@/components/games/clicker-game/clicker-game.component";
import ClickerModal from "@/components/modals/clicker-modal/clicker-modal.component";
import { getIdToken } from "@/helpers/get-token/get-token";
import { useGetImages } from "@/hooks/use-get-images";
import { ClickerGameData, CurrentPenguin } from "@/types/clicker.types";
import { ImageItem } from "@/types/image.types";
import React, { useState } from "react";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const { images, loading: imagesLoading } = useGetImages(true, null);

  const [gameData, setGameData] = useState<ClickerGameData | null>(null);
  const [currentPenguin, setCurrentPenguin] = useState<CurrentPenguin | null>(
    null
  );

  const onPenguinSelected = async (item: ImageItem) => {
    const token = await getIdToken();

    const res = await fetch("/api/games/clicker/set-current", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ penguinId: item.id }),
    });

    const data = await res.json();
    console.log(data, "data");
    setShowModal(false);
    setGameData(data.game);
    setCurrentPenguin(data.current);

    if (!res.ok) throw new Error(data?.error || "Request failed");
    return data;
  };

  return (
    <>
      <ClickerScreen
        gameData={gameData}
        currentPenguin={currentPenguin}
        onModalOpen={() => setShowModal(true)}
      />
      {!imagesLoading && (
        <ClickerModal
          images={images}
          onItemClick={onPenguinSelected}
          onClose={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
    </>
  );
};

export default Page;
