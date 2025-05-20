import React, { useMemo } from "react";
import { AvatarComponentStyled } from "./avatar-component.styled";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { ScaleType } from "@/types/scale.types";

const AvatarComponent = ({
  avatarUrl,
  avatarScale,
  id,
  mini = false,
}: {
  avatarUrl: string | null;
  id: string;
  avatarScale: ScaleType | null;
  mini?: boolean;
}) => {
  const borderColor = useMemo(() => {
    return getBaseColorByScale(avatarScale);
  }, [avatarScale]);
  return (
    <AvatarComponentStyled
      src={avatarUrl ?? "/template.png"}
      alt={id}
      $borderColor={borderColor}
      width={mini ? 35 : 105}
      height={mini ? 35 : 105}
      style={{ borderRadius: "50%" }}
    />
  );
};

export default AvatarComponent;
