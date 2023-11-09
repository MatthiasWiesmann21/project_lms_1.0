import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import DataTable from "./_components/data-table";

const MailList = async () => {
    const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const subscription = await db.newsletterSubscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  
  return ( 
    <div className="p-6">
      <DataTable data={subscription} />
    </div>
   );
}
 
export default MailList;