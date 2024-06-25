"use client";
import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const hasRefreshedKey = "hasRefreshed";

  useEffect(() => {
    const hasRefreshed = localStorage?.getItem(hasRefreshedKey);

    if (!hasRefreshed) {
      localStorage?.setItem(hasRefreshedKey, "true");
      window?.location?.reload();
    } else {
      localStorage?.removeItem(hasRefreshedKey);
    }
  }, []);

  return <SignIn />;
}
