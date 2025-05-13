import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { Friend } from "@/types/friends.types";
import Image from "next/image";

const FriendsListBlockComponent = ({ friends }: { friends: Friend[] }) => {
  return (
    <PageContentBlockStyled>
      <h2>Your Friends</h2>
      {friends.length ? (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} style={{ marginBottom: "1rem" }}>
              {/*
                      TODO: create avatars
                       */}
              <Image
                src={"/template.png"}
                alt={friend.id}
                width={44}
                height={44}
                style={{ borderRadius: "50%" }}
              />
              <div>
                <strong>{friend.id}</strong>
                <p>Gifted: {friend.gifted}</p>
                <p>Exchanged: {friend.exchanged}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>You don't have friends yet! Try to find someone.</p>
          <Image
            alt="nofriends"
            src="/infographics/no-friends.png"
            width="120"
            height="120"
          />
        </>
      )}
    </PageContentBlockStyled>
  );
};

export default FriendsListBlockComponent;
