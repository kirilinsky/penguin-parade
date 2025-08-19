import React from "react";
import {
  FriendListBioWarpper,
  FriendListItemButtons,
  FriendListItemContainer,
  FriendListItemContent,
  FriendListItemName,
} from "./friend-list-item.component.styled";
import { FriendWithUser, TopUser } from "@/types/friends.types";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import NeonButtonComponent from "@/components/ui/neon-button/neon-button.component";
import AvatarComponent from "@/components/ui/avatar-component/avatar-component";

const FriendListItemComponent = ({
  friend,
  onRemove,
}: {
  onRemove?: (id: string) => void;
  friend: FriendWithUser | TopUser;
}) => {
  const router = useRouter();
  const t = useTranslations("friendsListItem");

  const imageCount =
    "imageIds" in friend ? friend.imageIds.length : friend.imageCount;

  return (
    <FriendListItemContainer>
      <FriendListBioWarpper>
        <AvatarComponent
          username={friend.username}
          avatarUrl={friend.avatar}
          avatarScale={friend.avatarScale}
        />
        <FriendListItemName>{friend.username}</FriendListItemName>
      </FriendListBioWarpper>
      <FriendListItemContent>
        <p>
          {t("titleCount")} {imageCount}
        </p>

        <FriendListItemButtons>
          <NeonButtonComponent
            title={t("visitButton")}
            onClick={() => router.push(`/library/${friend.id}`)}
          />
          {"addedAt" in friend && onRemove && (
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
