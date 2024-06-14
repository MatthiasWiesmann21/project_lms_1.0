import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
export default async function Home() {
  const profile = await initialProfile();

  if (profile) {
      return redirect("/dashboard");
    }
}
