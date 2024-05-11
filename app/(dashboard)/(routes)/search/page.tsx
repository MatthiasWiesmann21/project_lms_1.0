import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { Metadata } from "next";
import { CourseCounter } from "@/components/courseCounter";

export const metadata: Metadata = {
  title: 'Browse',
}

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();
  let maxCoursesCount = 0;

  if (!userId) {
    return redirect("/");
  }

  const container = await db.container.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
      courses: {
        some: {}
      }
    }
  });

  const existingCourses = await db.course.count({
    where: {
      containerId: process.env.CONTAINER_ID,
    }
  });

  const categories = await db.category.findMany({
    where: {
      isPublished: true,
      isCourseCategory: true,
      containerId: process.env.CONTAINER_ID
    },
    orderBy: {
      name: "asc"
    }
  });

  const categoriesWithCourseCounts = await db.category.findMany({
    where: {
      isPublished: true,
      isCourseCategory: true,
      containerId: process.env.CONTAINER_ID
    },
    orderBy: {
      name: "asc"
    },
    include: {
      _count: {
        select: { courses: true }  // Ensure 'courses' matches your schema relation name
      }
    }
  });
  

  const courses = await getCourses({
    userId,
    ...searchParams,
    containerId: process.env.CONTAINER_ID
  });

  return (
    <>
      <div className="p-6 space-y-4">
        <CourseCounter maxCourses={container?.maxCourses ?? 0} courses={existingCourses}  />
        <Categories
          items={categoriesWithCourseCounts}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;