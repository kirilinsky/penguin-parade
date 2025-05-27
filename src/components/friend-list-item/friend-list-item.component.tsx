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
import { useTranslations } from "next-intl";

const FriendListItemComponent = ({
  friend,
  onRemove,
}: {
  onRemove?: (id: string) => void;
  friend: FriendWithUser;
}) => {
  const router = useRouter();
  const t = useTranslations('friendsListItem')

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
            <p>{t("titleCount")} {friend.imageIds.length}</p>
          )}
          {!!friend.giftsReceived && (
            <p>{t("giftsReceivedCount")} {friend.giftsReceived}</p>
          )}
          {!!friend.giftsSent && <p>{t("giftsSentCount")} {friend.giftsSent}</p>}
        </div>
        <FriendListItemButtons>
          <NeonButtonComponent
            title={t("visitButton")}
            onClick={() => router.push(`/library/${friend.id}`)}
          />
          {onRemove && (
            <NeonButtonComponent
              title={t("removeButton")}
              onClick={() => onRemove(friend.id)}
            />
          )}
        </FriendListItemButtons>
      </FriendListItemContent>
    </FriendListItemContainer>
  );
};

export default FriendListItemComponent;
