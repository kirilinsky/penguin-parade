import { FriendData } from "@/types/friends.types";
import Image from "next/image";
import React from "react";
import {
  UserListItemButtons,
  UserListItemContainer,
  UserListItemContent,
  UserListItemContentDivider,
} from "./user-list-item.component.styled";

const UserListItemComponent = ({
  user,
  incoming,
  onAccept,
  onDecline,
  onCancel,
}: {
  user: FriendData;
  incoming: boolean;
  onAccept: any;
  onDecline: any;
  onCancel: any;
}) => {
  return (
    <UserListItemContainer>
      <Image
        src={user.avatar ?? "/template.png"}
        alt={user.username}
        width={95}
        height={95}
        style={{ borderRadius: "50%" }}
      />
      <UserListItemContent>
        <strong>{user.username}</strong>
        <p>Sent: {user.sentAt?.toDate?.().toLocaleString?.() || "-"}</p>
        <UserListItemContentDivider />
        <UserListItemButtons>
          {incoming ? (
            <>
              <button>Accept</button>
              <button>Decline</button>
            </>
          ) : (
            <button>Cancel</button>
          )}
        </UserListItemButtons>
      </UserListItemContent>
    </UserListItemContainer>
  );
};

export default UserListItemComponent;
