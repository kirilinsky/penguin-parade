import React from "react";
import {
  HeaderBioAvatar,
  HeaderBioCoinImage,
  HeaderBioWrapper,
} from "./header-bio.component.styled";

const HeaderBioComponent = ({ username }: { username: string | null }) => {
  return (
    <HeaderBioWrapper>
      <HeaderBioAvatar src="/template.png" alt="avatar" />
      <b>{username}</b>
      <span>0</span>
      <HeaderBioCoinImage src="/coin.png" alt="coin" />
    </HeaderBioWrapper>
  );
};

export default HeaderBioComponent;
