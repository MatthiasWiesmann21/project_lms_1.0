import { isOwner } from "@/lib/owner";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Administartion',
}

const AdministrationLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>
}
 
export default AdministrationLayout;