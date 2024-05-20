import { Category, Course } from "@prisma/client";
import { EventCard } from "./events-card";
import { CourseCard } from "./course-card";
import { useLanguage } from "@/lib/check-language";
import { languageServer } from "@/lib/check-language-server";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = async ({ items }: CoursesListProps) => {
  const currentLanguage = await languageServer();
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            category={item?.category?.name!}
            categoryColorCode={item?.category?.colorCode!}
            progress={item.progress}
            chaptersLength={item.chapters.length}
            price={item.price!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          {currentLanguage?.no_courses}
        </div>
      )}
    </div>
  );
};
