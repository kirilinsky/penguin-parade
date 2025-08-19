import React from "react";
import Tilt from "react-parallax-tilt";
import { Orbitron } from "next/font/google";
import { CrystalItemContainer } from "@/components/pages/main/crystal-item/crystal-item.component.styled";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

const CoinItemComponent = ({ amount }: { amount: number }) => {
  return (
    <Tilt
      scale={1.2}
      glareEnable={true}
      glareMaxOpacity={0.65}
      glarePosition="all"
      glareColor={"gold"}
      glareBorderRadius={"16px"}
    >
      <CrystalItemContainer>
        Coin
        <img src={`/coin.webp`} alt={"coin"} width="160" height={"160"} />
        {amount && <span className={orbitron.className}>{amount}</span>}
      </CrystalItemContainer>
    </Tilt>
  );
};

export default CoinItemComponent;
