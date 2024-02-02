import { db } from "@/lib/db";


type GetContainer = {
  id?: string;
  imageUrl?: string;
};

const ContainerId = process.env.CONTAINER_ID;

export const getContainer = async ({
id,
imageUrl
}: GetContainer) => {
  try {
    const container = await db.container.findUnique({
      where: {
        id: id,
        imageUrl: 
        {
          contains: imageUrl,
        }
      }
    });

    return container;
  } catch (error) {
    console.log("[GET_POSTS]", error);
    return [];
  }
}