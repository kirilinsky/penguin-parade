import { notFound } from "next/navigation";
import { firestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import type { Metadata } from "next";

type SharePageParams = {
  params: {
    userId: string;
    picture: string;
  };
};

export async function generateMetadata({
  params,
}: SharePageParams): Promise<Metadata> {
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

export default async function SharePage({ params }: SharePageParams) {
  const { userId, picture } = params;

  const userSnap = await getDoc(doc(firestore, "users", userId));
  const penguinSnap = await getDoc(doc(firestore, "images", picture));

  if (!userSnap.exists() || !penguinSnap.exists()) return notFound();

  const user = userSnap.data();
  const penguin = penguinSnap.data();

  if (penguin.ownerId !== userId) return notFound();

  return (
    <main style={{ padding: "2em", textAlign: "center" }}>
      <Image
        src={user.avatar}
        width={100}
        height={100}
        alt="User avatar"
        style={{ borderRadius: "50%" }}
      />
      <h2>{user.username}</h2>
      <h3>{penguin.settings?.t?.en}</h3>
      <Image
        src={penguin.imageUrl}
        width={512}
        height={512}
        alt="Penguin"
        style={{ marginTop: "1em", borderRadius: "1em" }}
      />
    </main>
  );
}
