import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import Link from "next/link";
import { Orbitron } from "next/font/google";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

import { Metadata } from "next";

/* export async function generateMetadata(context: {
  params: { userId: string; picture: string };
}): Promise<Metadata> {
  const { userId, picture } = context.params;

  const ref = doc(firestore, `users/${userId}/images/${picture}`);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return {
      title: "Penguin not found",
      description: "Oops! Nothing to see here.",
    };
  }

  const data = snap.data() as ImageItem;

  return {
    title: `Look at my ${data.title}`,
    description: `A ${data.settings.rarity} penguin from Penguin Parade!`,
    openGraph: {
      title: `Look at my ${data.title}`,
      description: `A ${data.settings.rarity} penguin from Penguin Parade!`,
      images: [
        {
          url: data.imageUrl,
          width: 600,
          height: 600,
          alt: data.title,
        },
      ],
      type: "website",
      url: `https://yourdomain.com/share/${userId}/${picture}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Look at my ${data.title}`,
      description: `A ${data.settings.rarity} penguin from Penguin Parade!`,
      images: [data.imageUrl],
    },
  };
}
*/
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default async function SharePage({
  params,
}: {
  params: { userId: string; picture: string };
}) {
  const { userId, picture } = params;

  const ref = doc(firestore, `users/${userId}/images/${picture}`);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return <div>Penguin not found 🐧</div>;
  }

  const data = snap.data() as ImageItem;
  const color = getBaseColorByScale(data.settings.rarity);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1 className={orbitron.className}>Look at my new {data.title}</h1>
      <img
        width={300}
        height={300}
        src={data.imageUrl}
        alt={data.title}
        style={{
          margin: "15px",
          maxWidth: "100%",
          borderRadius: "15px",
          border: `1px solid ${color}`,
          boxShadow: `0 0 7px ${color}`,
        }}
      />

      <p>
        Rarity:{" "}
        <span className={orbitron.className} style={{ color: color }}>
          {data.settings.rarity}
        </span>
      </p>
      <p>
        Generated in{" "}
        <Link href={"/"}>
          <button>Penguin Parade</button>{" "}
        </Link>
      </p>
    </div>
  );
}
