import { AspectRatio } from "@/components/ui/aspect-ratio";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";



export const Logo = async () => {

const container = await db.container.findUnique({
  where: {
    id: process.env.CONTAINER_ID,
  }}
)
  
return (
  <Link target={container?.link ?? ""} href={container?.link ?? ""}>
    <AspectRatio ratio={21 / 9}>
    <Image
    height={100}
    width={200}
    alt="logo"
    src={container?.imageUrl ?? ""}
    />
    </AspectRatio>
  </Link>
  )
}