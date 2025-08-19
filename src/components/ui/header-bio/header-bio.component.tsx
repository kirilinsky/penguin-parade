import React from "react";
import {
  HeaderBioCoinImage,
  HeaderBioWrapper,
} from "./header-bio.component.styled";
import Link from "next/link";
import AvatarComponent from "../avatar-component/avatar-component";
import { ScaleType } from "@/types/scale.types";

const HeaderBioComponent = ({
  username,
  avatar,
  avatarScale,
  coins,
}: {
  username: string | null;
  coins: number | null;
  avatar: string | null;
  avatarScale: ScaleType | null;
}) => {
  return (
    <Link href="/">
      <HeaderBioWrapper>
        <AvatarComponent
          mini
          username={`${username}-avatar`}
          avatarUrl={avatar}
          avatarScale={avatarScale}
        />
        <b>{username}</b>
        <span>{coins}</span>
        <HeaderBioCoinImage src="/coin.webp" alt="coin" />
      </HeaderBioWrapper>
    </Link>
  );
};

export default HeaderBioComponent;
