import { currentProfile } from "@/lib/current-profile";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
 
export default function Page() {
    window.location.reload()
    return (
      <SignIn/>
    )
  }