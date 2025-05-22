import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { FriendWithUser } from "@/types/friends.types";
import Image from "next/image";
import FriendListItemComponent from "../friend-list-item/friend-list-item.component";
import { FriendsListBlockGrid } from "./friends-list-block.component.styled";

const FriendsListBlockComponent = ({
  friends,
  onRemove,
  friendsLoading,
}: {
  onRemove: (targetId: string) => Promise<void>;
  friends: FriendWithUser[];
  friendsLoading: boolean;
}) => {
  return (
    <PageContentBlockStyled>
      <h2>Your Friends</h2>
      {/* TODO: add spinner */}
      {friendsLoading ? (
        "friends loading"
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
          <p>You don't have friends yet! Try to find someone.</p>
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
