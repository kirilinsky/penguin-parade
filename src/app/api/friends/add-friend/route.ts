import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import { doc, updateDoc, arrayUnion, addDoc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const currentUserId = decoded.uid;

    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return NextResponse.json(
        { error: "Missing targetUserId" },
        { status: 400 }
      );
    }

    const timestamp = new Date();

    const targetRef = doc(firestore, "users", targetUserId);
    await updateDoc(targetRef, {
      friendRequests: arrayUnion({ id: currentUserId, sentAt: timestamp }),
    });

    const currentRef = doc(firestore, "users", currentUserId);
    await updateDoc(currentRef, {
      sentRequests: arrayUnion({ id: targetUserId, sentAt: timestamp }),
    });

    const notificationId = `friend_${currentUserId}`;
    const notifRef = doc(
      firestore,
      "users",
      targetUserId,
      "notifications",
      notificationId
    );

    await setDoc(notifRef, {
      type: "friend_request",
      createdAt: new Date(),
      read: false,
      payload: {
        type: "friend_request",
        fromUserId: currentUserId,
      },
      message: {
        ru: "У вас новый запрос в друзья",
        en: "You have a new friend request",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding friend:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
