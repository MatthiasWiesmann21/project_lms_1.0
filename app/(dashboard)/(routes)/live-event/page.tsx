import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { Metadata } from "next";
import { EventsList } from "@/components/events-list ";
import { getEvents } from "@/actions/get-events";

export const metadata: Metadata = {
  title: 'Live Events',
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
      isLiveEventCategory: true,
      containerId: process.env.CONTAINER_ID
    },
    orderBy: {
      name: "asc"
    }
  });

  const liveEvents = await getEvents({
    userId,
    ...searchParams,
    containerId: process.env.CONTAINER_ID
  });

  return (
    <>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <EventsList items={liveEvents} />
      </div>
    </>
   );
}
 
export default SearchPage;