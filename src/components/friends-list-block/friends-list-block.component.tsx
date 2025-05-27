import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { FriendWithUser } from "@/types/friends.types";
import Image from "next/image";
import FriendListItemComponent from "../friend-list-item/friend-list-item.component";
import { FriendsListBlockGrid } from "./friends-list-block.component.styled";
import { useTranslations } from "next-intl";

const FriendsListBlockComponent = ({
  friends,
  onRemove,
  friendsLoading,
}: {
  onRemove: (targetId: string) => Promise<void>;
  friends: FriendWithUser[];
  friendsLoading: boolean;
}) => {
  const t = useTranslations("friendsBlock");
  return (
    <PageContentBlockStyled>
      <h2>{t("title")}</h2>
      {/* TODO: add spinner */}
      {friendsLoading ? (
        t("loading")
      ) : friends.length ? (
        <FriendsListBlockGrid>
          {friends.map((friend) => (
            <FriendListItemComponent
              onRemove={onRemove}
              key={friend.id}
              friend={friend}
            />
          ))}
        </FriendsListBlockGrid>
      ) : (
        <>
          <p>{t("noFriendsTitle")}</p>
          <Image
            alt="nofriends"
            src="/infographics/no-friends.png"
            width="120"
            height="120"
          />
        </>
      )}
    </PageContentBlockStyled>
  );
};

export default FriendsListBlockComponent;
