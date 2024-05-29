import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { getSearchCourses } from "@/actions/get-searchcourses";
import exp from "constants";
import { db } from "@/lib/db";
import { languageServer } from "@/lib/check-language-server";
import PolygonChar from "./_components/polygonChar";
import { getCourses } from "@/actions/get-courses";
import CourseTable from "./_components/courseTable";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Dashboard = async ({ searchParams }: SearchPageProps) => {
  console.log("Dashboard =============");
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const currentLanguage = await languageServer();

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  const courses = await getSearchCourses({
    userId,
    ...searchParams,
  });

  const purchasedCourses = courses.filter((course) => course.isPurchased);

  const container = await db.container.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    },
  });

  const _courses = await getCourses({
    userId,
    ...searchParams,
    containerId: process?.env?.CONTAINER_ID,
  });

  return (
    <div className="space-y-4 p-6 dark:bg-[#110524]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <InfoCard
          icon={Clock}
          label={currentLanguage?.infocard_inprogress}
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label={currentLanguage?.infocard_completed}
          numberOfItems={completedCourses.length}
          variant="success"
        />
        <InfoCard
          icon={CheckCircle}
          label={currentLanguage?.infocard_completed}
          numberOfItems={completedCourses.length}
          variant="success"
        />
        <InfoCard
          icon={CheckCircle}
          label={currentLanguage?.infocard_completed}
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={purchasedCourses} />
      <PolygonChar color={container?.navDarkBackgroundColor} />
      <CourseTable courses={_courses} />
    </div>
  );
};

export default Dashboard;
