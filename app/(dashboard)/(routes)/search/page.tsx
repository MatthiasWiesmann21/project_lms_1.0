import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { Metadata } from "next";
import { CourseCounter } from "@/components/courseCounter";

export const metadata: Metadata = {
  title: "Browse",
};

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const profile = await db.profile.findUnique({
    where: {
      id: userId,
    },
  });

  if (profile?.name === null) {
    return redirect("/profile/manageUsername");
  }

  const container = await db.container.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
      courses: {
        some: {},
      },
    },
  });

  // console?.log("container", container);

  const existingCourses = await db.course.count({
    where: {
      containerId: process.env.CONTAINER_ID,
    },
  });

  const categories = await db.category.findMany({
    where: {
      isPublished: true,
      isCourseCategory: true,
      containerId: process.env.CONTAINER_ID,
    },
    orderBy: {
      name: "asc",
    },
  });

  const categoriesWithCourseCounts = await db.category.findMany({
    where: {
      isPublished: true,
      isCourseCategory: true,
      containerId: process.env.CONTAINER_ID,
    },
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: { courses: true }, // Ensure 'courses' matches your schema relation name
      },
    },
  });

  // console.log("categoriesWithCourseCounts", categoriesWithCourseCounts);

  const courses = await getCourses({
    userId,
    ...searchParams,
    containerId: process.env.CONTAINER_ID,
  });

  const containerColors = await db?.container?.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    },
  });

  return (
    <>
      <div className="space-y-4 p-4">
        <CourseCounter
          maxCourses={container?.maxCourses ?? 0}
          courses={existingCourses}
        />
        <Categories
          items={categoriesWithCourseCounts}
          defaultColor={containerColors?.navDarkBackgroundColor}
        />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
