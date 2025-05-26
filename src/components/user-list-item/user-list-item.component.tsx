import { FriendData } from "@/types/friends.types";
import React from "react";
import {
  UserListItemAvatar,
  UserListItemButtons,
  UserListItemContainer,
  UserListItemContent,
  UserListItemContentDivider,
} from "./user-list-item.component.styled";
import Link from "next/link";

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
      <UserListItemAvatar
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
              <button onClick={onAccept}>Accept</button>
              <button onClick={onDecline}>Decline</button>
            </>
          ) : (
            <button onClick={onCancel}>Cancel</button>
          )}
          <Link href={`/library/${user.id}`}>
            <button>Visit</button>
          </Link>
        </UserListItemButtons>
      </UserListItemContent>
    </UserListItemContainer>
  );
};

export default UserListItemComponent;
