"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

interface LogoProps {
  imageUrl: string;
  imageUrlDark: string;
  link: string;
}

export const Logo = ({
  imageUrl,
  imageUrlDark,
  link,
}: LogoProps) => {

  const { theme } = useTheme();

  const imageUrlNew = theme === 'dark' ? imageUrlDark : imageUrl;

  return (
    <Link target={link ?? ""} href={link ?? ""}>
        <Image
          height={100}
          width={200}
          alt="logo"
          src={imageUrlNew ?? ""}
        />
    </Link>
  )
}