import React from "react";
import { PageContentBlockStyled } from "../../../ui/page-content-block/page-content-block.component.styled";
import { useGetTopUsers } from "@/hooks/use-get-top-users";
import { useTranslations } from "next-intl";
import { FriendsListBlockGrid } from "../../friends/friends-list-block/friends-list-block.component.styled";
import FriendListItemComponent from "../../friends/friend-list-item/friend-list-item.component";

const TopUsersBlock = () => {
  const { users, loading } = useGetTopUsers();
  const t = useTranslations("topUsersBlock");
  return (
    <PageContentBlockStyled>
      <h2>{t("title")}</h2>
      {loading && <p>{t("loading")}</p>}
      <FriendsListBlockGrid>
        {!loading &&
          users.map((user) => (
            <FriendListItemComponent key={user.id} friend={user} />
          ))}
      </FriendsListBlockGrid>
    </PageContentBlockStyled>
  );
};

export default TopUsersBlock;
