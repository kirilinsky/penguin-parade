import React from "react";
import { FriendWithUser } from "@/types/friends.types";
import Image from "next/image";
import FriendListItemComponent from "../friend-list-item/friend-list-item.component";
import {
  FriendsListBlockGrid,
  FriendsNeonPanel,
  FriendsHeader,
  TitleRow,
  CountPill,
  EmptyState,
} from "./friends-list-block.component.styled";
import { useTranslations } from "next-intl";
import { LoaderGrid, ShimmerCard } from "@/components/ui/skeleton-grid/skeleton-grid.styled";

type Props = {
  onRemove: (targetId: string) => Promise<void>;
  friends: FriendWithUser[];
  friendsLoading: boolean;
};

const FriendsListBlockComponent = ({
  friends,
  onRemove,
  friendsLoading,
}: Props) => {
  const t = useTranslations("friendsBlock");

  return (
    <>
      <FriendsHeader>
        <TitleRow>
          <h2>{t("title")}</h2>
          <CountPill>{friends.length}</CountPill>
        </TitleRow>
      </FriendsHeader>

      <FriendsNeonPanel>
        {friendsLoading ? (
          <LoaderGrid>
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </LoaderGrid>
        ) : friends.length ? (
          <FriendsListBlockGrid>
            {friends.map((friend) => (
              <FriendListItemComponent
                onRemove={onRemove}
                key={friend.id}
                friend={friend}
              />
            ))}
          </FriendsListBlockGrid>
        ) : (
          <EmptyState>
            <Image
              alt="nofriends"
              src="/infographics/no-friends.png"
              width={120}
              height={120}
            />
            <p>{t("noFriendsTitle")}</p>
          </EmptyState>
        )}
      </FriendsNeonPanel>
    </>
  );
};

export default FriendsListBlockComponent;
