import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function getIdToken(): Promise<string | null> {
  const auth = getAuth();
  const user =
    auth.currentUser ||
    (await new Promise<any>((res, rej) => {
      const unsub = onAuthStateChanged(
        auth,
        (u) => {
          unsub();
          u ? res(u) : rej(new Error("Not signed in"));
        },
        rej
      );
    }));

  if (!user) return null;

  try {
    const token = await user.getIdToken(true);
    return token;
  } catch (err) {
    console.error("Failed to get ID token:", err);
    return null;
  }
}
