import { redirect } from "next/navigation";

// The old /about composite is gone — home (/) is now the showcase landing.
export default function AboutPage() {
  redirect("/");
}
