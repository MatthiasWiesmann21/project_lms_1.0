import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="flex h-full">
      <div
        // className="fixed inset-y-0 z-20 mt-[80px] hidden h-full w-60 flex-col md:flex"
        className="h-full w-80"
        // style={{ border: "10px solid coral" }}
      >
        <ServerSidebar serverId={params.serverId} />
      </div>
      {/* <main className="ml-0 md:ml-[72px] md:pl-60">{children}</main> */}
      <main className="w-full">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
