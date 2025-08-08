"use client";

import React from "react";
import Image from "next/image";
import NeonButtonComponent from "@/components/neon-button/neon-button.component";
import {
  FriendSearchWrapper,
  SearchInput,
  ResultsList,
  ResultItem,
  UserMeta,
  StatusText,
} from "./friend-search.component.styled";
import { User } from "@/types/user.types";
import { useTranslations } from "next-intl";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
  searchResults: User[];
  hasSentRequest: (id: string) => boolean;
  onCancelRequest: (user: User) => void;
  onAddFriend: (user: User) => void;
};

export default function FriendSearchComponent({
  searchValue,
  onSearchChange,
  onSearchClick,
  searchResults,
  hasSentRequest,
  onCancelRequest,
  onAddFriend,
}: Props) {
  const t = useTranslations("friendsPage");
  return (
    <FriendSearchWrapper>
      <h2>{t("addFriendTitle")}</h2>
      <SearchInput
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t("searchFriendPlaceholder")}
      />
      <NeonButtonComponent title={t("searchButton")} onClick={onSearchClick} />

      {searchResults.length > 0 && (
        <>
          <h3>{t("addFriendTitle")}</h3>
          <ResultsList>
            {searchResults.map((user) => (
              <ResultItem key={user.id}>
                <Image
                  src={user.avatar ?? "/template.png"}
                  alt={user.username}
                  width={45}
                  height={45}
                  style={{ borderRadius: "50%" }}
                  unoptimized={!!user.avatar}
                />
                <UserMeta>
                  <strong>{user.username}</strong>
                  {hasSentRequest(user.id) ? (
                    <>
                      <StatusText>{t("spanRequested")}</StatusText>
                      <NeonButtonComponent
                        title={t("cancelRequestButton")}
                        onClick={() => onCancelRequest(user)}
                      />
                    </>
                  ) : (
                    <NeonButtonComponent
                      title={t("addFriendButton")}
                      onClick={() => onAddFriend(user)}
                    />
                  )}
                </UserMeta>
              </ResultItem>
            ))}
          </ResultsList>
        </>
      )}
    </FriendSearchWrapper>
  );
}
