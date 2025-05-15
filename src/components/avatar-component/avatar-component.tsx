import React, { useMemo } from "react";
import { AvatarComponentStyled } from "./avatar-component.styled";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

const AvatarComponent = ({
  avatarUrl,
  avatarScale,
  id,
  mini = false,
}: {
  avatarUrl: string | null;
  id: string;
  avatarScale: string | null;
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
      width={mini ? 30 : 100}
      height={mini ? 30 : 100}
      style={{ borderRadius: "50%" }}
    />
  );
};

export default AvatarComponent;
