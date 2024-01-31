import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LayoutGridIcon } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { Actions } from "./_components/actions";
import { ColorForm } from "./_components/color-form";

const CategoryIdPage = async ({
  params
}: {
  params: { categoryId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  if (!category) {
    return redirect("/");
  }

  const requiredFields = [
    category.name,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!category.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Category setup
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#ffffff]">
              Complete all required fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            categoryId={params.categoryId}
            isPublished={category.isPublished}
          />
        </div>
        <div className="mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutGridIcon} />
              <h2 className="text-xl">
                Name your Category
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <TitleForm
              initialData={category}
              categoryId={category.id}
            />
            <ColorForm
              initialData={category}
              categoryId={category.id}
            />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default CategoryIdPage;