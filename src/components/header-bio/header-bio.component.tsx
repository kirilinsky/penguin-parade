import React from "react";
import {
  HeaderBioAvatar,
  HeaderBioCoinImage,
  HeaderBioWrapper,
} from "./header-bio.component.styled";
import Link from "next/link";

const HeaderBioComponent = ({
  username,
  avatar,
}: {
  username: string | null;
  avatar: string | null;
}) => {
  return (
    <Link href="/">
      <HeaderBioWrapper>
        {/* TODO: avatar scale */}
        <HeaderBioAvatar src={avatar ?? "/template.png"} alt="avatar" />
        <b>{username}</b>
        <span>0</span>
        <HeaderBioCoinImage src="/coin.png" alt="coin" />
      </HeaderBioWrapper>
    </Link>
  );
};

export default HeaderBioComponent;
