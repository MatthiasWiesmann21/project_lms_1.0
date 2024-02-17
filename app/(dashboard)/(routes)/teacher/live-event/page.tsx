import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const LiveEventPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const liveEvent = await db.liveEvent.findMany({
    where: {
      containerId: process.env.CONTAINER_ID,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={liveEvent} />
    </div>
   );
}
 
export default LiveEventPage;