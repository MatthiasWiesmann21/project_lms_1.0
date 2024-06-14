import { currentProfile } from "@/lib/current-profile";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
 
export default async function Page() {
  const profile = await currentProfile();
  const router = useRouter();

  if (profile) {
    router.push("/dashboard")
  } else {
    return <SignIn />;
  }
}