"use client";

import { ImageItem } from "@/types/image.types";
import Image from "next/image";
import React from "react";
import { LinkStyled } from "../link/link.component.styled";
import { useTranslations } from "next-intl";

const ShareComponent = ({
  imageUrl,
  color,
}: {
  imageUrl: string;
  color: string;
}) => {
  const t = useTranslations("sharePage");
  return (
    <>
      <h2>{t("title")}</h2>
      <Image
        src={imageUrl}
        width={500}
        height={500}
        alt="Penguin"
        style={{
          marginTop: "1em",
          borderRadius: "1em",
          border: `2px solid ${color}`,
          boxShadow: `0 0 5px ${color}`
        }}
      />
      <h3>{t("subtitle")}</h3>
      <LinkStyled href={"/signup"}>{t("signUpButton")}</LinkStyled>
    </>
  );
};

export default ShareComponent;
