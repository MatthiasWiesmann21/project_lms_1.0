import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
      name: `${user.username}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      containerId: process.env.CONTAINER_ID
    }
  });

if (profile) {
    return profile;
}

const updateProfile = await db.profile.update({
    where: {
        userId: user.id,
    },
    data: {
        name: `${user.username}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        containerId: process.env.CONTAINER_ID
    }
});

if (updateProfile) {
    return updateProfile;
}

const newProfile = await db.profile.create({
    data: {
        userId: user.id,
        name: `${user.username}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        containerId: process.env.CONTAINER_ID || '',
        role: 'USER'
    }
});

  return newProfile;
};
