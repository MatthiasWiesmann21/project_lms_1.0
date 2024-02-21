import { Category, Course, LiveEvent } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type EventWithProgressWithCategory = LiveEvent & {
  category: Category | null;
};

type GetEventsFiltered = {
  userId: string;
  title?: string;
  categoryId?: string;
  containerId?: string;
};

export const getEventsFiltered = async ({
  userId,
  title,
  categoryId,
}: GetEventsFiltered): Promise<EventWithProgressWithCategory[]> => {
  try {
    const liveEvent = await db.liveEvent.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
        containerId: process.env.CONTAINER_ID,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const eventsWithProgress: EventWithProgressWithCategory[] =
      await Promise.all(
        liveEvent.map(async (liveEvent) => {
          if (liveEvent.isPublished === true) {
            return {
              ...liveEvent,
            };
          }
          return {
            ...liveEvent,
          };
        })
      );

    return eventsWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
