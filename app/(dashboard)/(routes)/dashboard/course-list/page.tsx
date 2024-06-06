import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { getSearchCourses } from "@/actions/get-searchcourses";
import { languageServer } from "@/lib/check-language-server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const CourseListPage = async ({ searchParams }: SearchPageProps) => {
  console.log("Course-List =============");

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const currentLanguage = await languageServer();

  const courses = await getSearchCourses({
    userId,
    ...searchParams,
  });

  const purchasedCourses = courses.filter((course) => course.isPurchased);

  return (
    <div className="space-y-4 p-6 dark:bg-[#110524]">
      <Link
        href={`/dashboard`}
        className="mb-6 flex items-center text-sm transition hover:opacity-75"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {currentLanguage.courses_list_backToDashboard_button_text}
      </Link>
      <CoursesList items={purchasedCourses} />
    </div>
  );
};

export default CourseListPage;
