import React from "react";
import AvatarComponent from "../avatar-component/avatar-component";
import { LibraryTitleWrapper } from "./library-title.component.styled";
import { useTranslations } from "next-intl";

const LibraryTitleComponent = ({
  user,
  imagesCount,
  isMyPage,
}: {
  user: any;
  imagesCount: number;
  isMyPage: boolean;
}) => {
  const t = useTranslations("libraryTitle");
  if (!user) {
    return null;
  }
  return (
    <LibraryTitleWrapper>
      <AvatarComponent
        username={user?.username}
        avatarUrl={user?.avatar}
        avatarScale={user?.avatarScale}
      />
      <h1>
        {isMyPage ? t("my") : user?.username} {t("penguins")} ({imagesCount})
      </h1>
    </LibraryTitleWrapper>
  );
};

export default LibraryTitleComponent;
