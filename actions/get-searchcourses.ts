import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  isPurchased: boolean;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getSearchCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
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
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
        purchases: {
          where: {
            userId,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    })

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async course => {
        const isPurchased = course.purchases.length > 0;
        const progressPercentage = isPurchased ? await getProgress(userId, course.id) : null;

        return {
          ...course,
          progress: progressPercentage,
          isPurchased, // Fügen Sie das neue Feld hinzu
        };
      })
    );

    const purchasedCourses = coursesWithProgress.filter(course => course.isPurchased);

    return purchasedCourses;

  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}