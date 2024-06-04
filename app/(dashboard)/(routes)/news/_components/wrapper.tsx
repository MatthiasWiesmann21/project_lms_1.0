"use client";
import dynamic from "next/dynamic";
import { PostCard } from "./post-card";
import { useLanguage } from "@/lib/check-language";
import { Categories } from "./categories";

const Wrapper = ({ posts, categories, container }: any) => {
  const currentLanguage = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-5 dark:bg-[#110524]">
      <Categories
        items={categories}
        defaultColor={container?.navDarkBackgroundColor}
      />
      <div className="flex w-full">
        {posts?.map((item: any) => (
          <PostCard
            key={item?.id}
            title={item?.title}
            imageUrl={item?.imageUrl ?? ""}
            category={item?.category?.name ?? ""}
            description={item?.description ?? ""}
            colorCode={item?.category?.colorCode!}
          />
        ))}
      </div>
      <div className="loading-indicator" />
      {posts?.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          {currentLanguage?.news_no_posts_found}
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise?.resolve(Wrapper), { ssr: false });
