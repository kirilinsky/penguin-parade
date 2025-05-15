import React, { useEffect, useMemo, useState } from "react";
import {
  FriendListItemButtons,
  FriendListItemContainer,
  FriendListItemContent,
  FriendListItemName,
} from "./friend-list-item.component.styled";
import { Friend } from "@/types/friends.types";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useRouter } from "next/navigation";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import AvatarComponent from "../avatar-component/avatar-component";

const FriendListItemComponent = ({
  friend,
  onRemove,
}: {
  onRemove: (id: string) => void;
  friend: Friend;
}) => {
  const router = useRouter();
  const [friendAvatar, setFriendAvatar] = useState<null | string>(null);
  const [friendAvatarScale, setFriendAvatarScale] = useState<null | string>(
    null
  );
  const [friendUserName, setFriendUserName] = useState<null | string>(null);
  const fetchFriendData = async () => {
    const friendRef = await getDoc(doc(firestore, "users", friend.id));
    const friendDataFetched = friendRef.data();
    if (!friendRef.exists()) return;
    if (friendDataFetched) {
      setFriendAvatar(friendDataFetched.avatar);
      setFriendAvatarScale(friendDataFetched.avatarScale);
      setFriendUserName(friendDataFetched.username);
    }
  };

  useEffect(() => {
    fetchFriendData();
  }, [friend]);
  return (
    <FriendListItemContainer>
      <AvatarComponent
        id={friend.id}
        avatarUrl={friendAvatar}
        avatarScale={friendAvatarScale}
      />
      <FriendListItemContent>
        <FriendListItemName>{friendUserName}</FriendListItemName>
        <div>
          <p>Gifted: {friend.gifted}</p>
          <p>Exchanged: {friend.exchanged}</p>
        </div>
        <FriendListItemButtons>
          <button onClick={() => router.push(`/library/${friend.id}`)}>
            visit
          </button>
          <button onClick={() => onRemove(friend.id)}>remove</button>
        </FriendListItemButtons>
      </FriendListItemContent>
    </FriendListItemContainer>
  );
};

export default FriendListItemComponent;
