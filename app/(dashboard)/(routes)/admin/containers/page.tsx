import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const ContainerPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const containers = await db.container.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={containers} />
    </div>
   );
}
 
export default ContainerPage;