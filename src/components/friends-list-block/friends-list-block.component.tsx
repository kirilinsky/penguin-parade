import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { Friend } from "@/types/friends.types";
import Image from "next/image";
import FriendListItemComponent from "../friend-list-item/friend-list-item.component";

const FriendsListBlockComponent = ({
  friends,
  onRemove,
}: {
  onRemove: (targetId: string) => Promise<void>;
  friends: Friend[];
}) => {
  return (
    <PageContentBlockStyled>
      <h2>Your Friends</h2>
      {friends.length ? (
        <ul>
          {friends.map((friend) => (
            <FriendListItemComponent
              onRemove={onRemove}
              key={friend.id}
              friend={friend}
            />
          ))}
        </ul>
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
