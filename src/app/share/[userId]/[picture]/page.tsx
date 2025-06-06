import { notFound } from "next/navigation";
import { firestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import type { Metadata } from "next";
import ShareComponent from "@/components/share-component/share-component.component";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { userId, picture } = params;

  const userSnap = await getDoc(doc(firestore, "users", userId));
  const penguinSnap = await getDoc(doc(firestore, "images", picture));

  if (!userSnap.exists() || !penguinSnap.exists()) {
    return { title: "Not Found" };
  }

  const user = userSnap.data();
  const penguin = penguinSnap.data();

  if (penguin.ownerId !== userId) {
    return { title: "Not Found" };
  }

  const penguinTitle = penguin.settings?.t?.en ?? "Check out this penguin!";

  return {
    title: `${user.username}'s Penguin`,
    description: penguinTitle,
    openGraph: {
      title: `${user.username}'s Penguin`,
      description: penguinTitle,
      images: [penguin.imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.username}'s Penguin`,
      description: penguinTitle,
      images: [penguin.imageUrl],
    },
  };
}

export default async function SharePage({ params }: any) {
  const { userId, picture } = params;

  const userSnap = await getDoc(doc(firestore, "users", userId));
  const penguinSnap = await getDoc(doc(firestore, "images", picture));

  if (!userSnap.exists() || !penguinSnap.exists()) return notFound();

  const user = userSnap.data();
  const penguin = penguinSnap.data() as ImageItem;

  if (penguin.ownerId !== userId) return notFound();

  return (
    <main
      style={{
        padding: "2em",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".4em",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: ".4em" }}>
        <Image
          src={user.avatar}
          width={55}
          height={55}
          alt="User avatar"
          style={{
            borderRadius: "50%",
          }}
        />
        <div>
          <h2>{user.username}</h2>
        </div>
      </div>

      <ShareComponent
        color={getBaseColorByScale(penguin.settings.rarity)}
        imageUrl={penguin.imageUrl}
      />
    </main>
  );
}
