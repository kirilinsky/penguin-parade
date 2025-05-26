import React from "react";
import {
  FriendListItemButtons,
  FriendListItemContainer,
  FriendListItemContent,
  FriendListItemName,
} from "./friend-list-item.component.styled";
import { FriendWithUser } from "@/types/friends.types";
import { useRouter } from "next/navigation";
import AvatarComponent from "../avatar-component/avatar-component";
import NeonButtonComponent from "../neon-button/neon-button.component";

const FriendListItemComponent = ({
  friend,
  onRemove,
}: {
  onRemove?: (id: string) => void;
  friend: FriendWithUser;
}) => {
  const router = useRouter();

  return (
    <FriendListItemContainer>
      <AvatarComponent
        username={friend.username}
        avatarUrl={friend.avatar}
        avatarScale={friend.avatarScale}
      />
      <FriendListItemContent>
        <FriendListItemName>{friend.username}</FriendListItemName>
        <div>
          {friend.imageIds.length && (
            <p>Penguins Count: {friend.imageIds.length}</p>
          )}
          {!!friend.giftsReceived && (
            <p>Gifts Received: {friend.giftsReceived}</p>
          )}
          {!!friend.giftsSent && <p>Gifts Sent: {friend.giftsSent}</p>}
        </div>
        <FriendListItemButtons>
          <NeonButtonComponent
            title="Visit Friend"
            onClick={() => router.push(`/library/${friend.id}`)}
          />
          {onRemove && (
            <NeonButtonComponent
              title="Remove"
              onClick={() => onRemove(friend.id)}
            />
          )}
        </FriendListItemButtons>
      </FriendListItemContent>
    </FriendListItemContainer>
  );
};

export default FriendListItemComponent;
