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
}: {
  username: string | null;
  avatar: string | null;
  avatarScale: ScaleType | null;
}) => {
  return (
    <Link href="/">
      <HeaderBioWrapper>
        <AvatarComponent
          mini
          id={`${username}-avatar`}
          avatarUrl={avatar}
          avatarScale={avatarScale}
        />
        <b>{username}</b>
        <span>0</span>
        <HeaderBioCoinImage src="/coin.webp" alt="coin" />
      </HeaderBioWrapper>
    </Link>
  );
};

export default HeaderBioComponent;
