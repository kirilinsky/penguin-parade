import React from "react";
import {
  UserListItemAvatar,
  UserListItemButtons,
  UserListItemContainer,
  UserListItemContent,
  UserListItemContentDivider,
} from "./user-list-item.component.styled";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FriendData } from "@/types/user.types";

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
  const t = useTranslations("userListItem");

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
        <p>
          {t("requestSentAt")}{" "}
          {user.sentAt?.toDate?.().toLocaleString?.() || "-"}
        </p>
        <UserListItemContentDivider />
        <UserListItemButtons>
          {incoming ? (
            <>
              <button onClick={onAccept}>{t("acceptButton")}</button>
              <button onClick={onDecline}>{t("declineButton")}</button>
            </>
          ) : (
            <button onClick={onCancel}>{t("cancelButton")}</button>
          )}
          <Link href={`/library/${user.id}`}>
            <button>{t("visitButton")}</button>
          </Link>
        </UserListItemButtons>
      </UserListItemContent>
    </UserListItemContainer>
  );
};

export default UserListItemComponent;
