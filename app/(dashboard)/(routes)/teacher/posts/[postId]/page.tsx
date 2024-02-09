import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, Image, LayoutDashboard, LayoutGridIcon, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { Actions } from "./_components/actions";

const PostIdPage = async ({
  params
}: {
  params: { postId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const post = await db.post.findUnique({
    where: {
      id: params.postId,
      containerId: process.env.CONTAINER_ID,
    }
  });

  const categories = await db.category.findMany({
    where: {
      containerId: process.env.CONTAINER_ID,
    },
    orderBy: {
      name: "asc",
    },
  });

  const profile = await db.profile.findUnique({
    where: {
      userId: userId,
      containerId: process.env.CONTAINER_ID,
    },
  });


  if (!post) {
    return redirect("/");
  }

  const requiredFields = [
    post.title,
    post.description,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!post.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Post setup
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#ffffff]">
              Complete all required fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            postId={params.postId}
            isPublished={post.isPublished}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutGridIcon} />
              <h2 className="text-xl">
                Customize your Post
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <TitleForm
              initialData={post}
              postId={post.id}
            />
            <DescriptionForm
              initialData={post}
              postId={post.id}
            />
            <CategoryForm
              initialData={post}
              postId={post.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Image} />
              <h2 className="text-xl">
                Add an Image to your Post
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <ImageForm
              initialData={post}
              postId={post.id}
              />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default PostIdPage;