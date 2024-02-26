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

  if (!userId) {
    return redirect("/");
  }

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

  const courses = await getCourses({
    userId,
    ...searchParams,
    containerId: process.env.CONTAINER_ID
  });

  return (
    <>
      <div className="p-6 space-y-4">
        <CourseCounter />
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;