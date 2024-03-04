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
    <Image
      height={130}
      width={130}
      alt="logo"
      src={container?.imageUrl ?? ""}
    />
  </Link>
  )
}