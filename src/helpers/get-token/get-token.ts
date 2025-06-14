import { getAuth } from "firebase/auth";

export async function getIdToken(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return null;

  try {
    const token = await user.getIdToken(true);
    return token;
  } catch (err) {
    console.error("Failed to get ID token:", err);
    return null;
  }
}
