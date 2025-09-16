"use client";

import ClickerScreen from "@/components/games/clicker-game/clicker-game.component";
import ClickerModal from "@/components/modals/clicker-modal/clicker-modal.component";
import { useGetImages } from "@/hooks/use-get-images";
import React, { useState } from "react";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const { images, loading: imagesLoading } = useGetImages(true, null);

  return (
    <>
      <ClickerScreen onModalOpen={() => setShowModal(true)} />
      <ClickerModal
        images={images}
        onItemClick={(item) => console.log(item)}
        onClose={() => setShowModal(false)}
        showModal={showModal}
      />
    </>
  );
};

export default Page;
