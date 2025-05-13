import React, { useEffect, useState } from "react";
import {
  FriendListItemAvatar,
  FriendListItemContainer,
  FriendListItemContent,
} from "./friend-list-item.component.styled";
import { Friend } from "@/types/friends.types";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const FriendListItemComponent = ({
  friend,
  onRemove,
}: {
  onRemove: (id: string) => void;
  friend: Friend;
}) => {
  const [friendAvatar, setFriendAvatar] = useState<null | string>(null);
  const [friendUserName, setFriendUserName] = useState<null | string>(null);
  const fetchFriendData = async () => {
    const friendRef = await getDoc(doc(firestore, "users", friend.id));
    const friendDataFetched = friendRef.data();
    if (!friendRef.exists()) return;
    if (friendDataFetched) {
      setFriendAvatar(friendDataFetched.avatar);
      setFriendUserName(friendDataFetched.username);
    }
  };

  useEffect(() => {
    fetchFriendData();
  }, [friend]);
  return (
    <FriendListItemContainer>
      {/*  TODO: create avatars   */}
      <FriendListItemAvatar
        src={friendAvatar ?? "/template.png"}
        alt={friend.id}
        width={95}
        height={95}
        style={{ borderRadius: "50%" }}
      />
      <FriendListItemContent>
        <p>{friendUserName}</p>
        <div>
          <p>Gifted: {friend.gifted}</p>
          <p>Exchanged: {friend.exchanged}</p>
        </div>
        <button onClick={() => onRemove(friend.id)}>remove</button>
      </FriendListItemContent>
    </FriendListItemContainer>
  );
};

export default FriendListItemComponent;
