"use client";

import React from "react";
import { useTranslations } from "next-intl";
import UserListItemComponent from "@/components/user-list-item/user-list-item.component";
import { FriendData, User } from "@/types/user.types";
import {
  FriendRequestsWrapper,
  RequestsList,
  BlockHeader,
  CountBadge,
} from "./friend-requests-block.component.styled";

type Props = {
  requests: (User | FriendData)[];
  incoming: boolean;
  onCancel: (user: User) => void;
  onDecline: (user: User) => void;
  onAccept: (user: User) => void;
};

export default function FriendRequestsBlock({
  requests,
  incoming,
  onCancel,
  onDecline,
  onAccept,
}: Props) {
  const t = useTranslations("friendsPage");
  const title = incoming ? t("incomingRequestsTitle") : t("sentRequestsTitle");

  return (
    <FriendRequestsWrapper>
      <BlockHeader>
        <h2>{title}</h2>
        <CountBadge>{requests.length}</CountBadge>
      </BlockHeader>
      <RequestsList>
        {requests.map((req) => (
          <UserListItemComponent
            key={req.id}
            incoming={incoming}
            user={req as FriendData}
            onCancel={() => onCancel(req as User)}
            onDecline={() => onDecline(req as User)}
            onAccept={() => onAccept(req as User)}
          />
        ))}
      </RequestsList>
    </FriendRequestsWrapper>
  );
}
