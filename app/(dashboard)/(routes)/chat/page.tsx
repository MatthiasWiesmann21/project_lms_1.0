import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();
  let checkFirstServer = {} as any;
  let server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    checkFirstServer = await db.server.findFirst();
    const creatMember = await db.member.create({
      data: {
        serverId: checkFirstServer.id,
        profileId: profile.id,
        containerId: process.env.CONTAINER_ID || "",
      },
    });
    server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });
  }

  if (server) {
    return redirect(`/chat/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
