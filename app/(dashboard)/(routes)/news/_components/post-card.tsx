import Image from "next/image";
import { UserAvatar } from "@/components/user-avatar";
import LikeComment from "./likeComment";
import { PostPreview } from "@/components/post-preview";

interface PostCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  createdAt: string;
  publisherName: string;
  publisherImageUrl: string;
  colorCode?: string;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
  commentsCount: number;
  updateLikeComment: any;
}

export const PostCard = ({
  id,
  title,
  imageUrl,
  category,
  description,
  createdAt,
  publisherName,
  publisherImageUrl,
  colorCode,
  likesCount,
  currentLike,
  commentsWithLikes,
  commentsCount,
  updateLikeComment,
}: PostCardProps) => (
  <div className="group my-5 h-full overflow-hidden rounded-lg border bg-[#f6f8fa] py-1 hover:shadow-sm dark:border-[#2e3135] dark:bg-[#1b1f23]">
    <div className="group h-full overflow-hidden hover:shadow-sm">
      <div className="m-4 flex flex-col">
        <div
          className="flex items-start justify-between"
          // style={{ border: "2px solid red" }}
        >
          <div
            // style={{ border: "2px solid blue" }}
            className="flex items-center"
          >
            <UserAvatar
              src={publisherImageUrl}
              className="max-h-64 min-h-64 min-w-64 max-w-64"
            />
            <div
              className="ml-2 flex flex-col justify-center"
              // style={{ border: "3px solid green" }}
            >
              <div className="font-600 text-base text-black dark:text-white">
                {publisherName}
              </div>
              <div className="text-xs text-black text-muted-foreground dark:text-white">
                {createdAt}
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-x-1 rounded-full border px-3 py-2 text-xs font-[600] transition`}
            style={{ borderColor: colorCode }}
          >
            <div className="truncate">{category}</div>
          </div>
        </div>
        <div
          // style={{ border: "2px solid indigo" }}
          className="font-400 text-sm text-black dark:text-white"
        >
          <PostPreview value={description}/>
        </div>
        {/* <div></div> */}
        {/* <Separator /> */}
        {/* {colorCode && (
          <div className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-slate-300 px-1 py-1 pr-2 text-xs">
            <div
              style={{ backgroundColor: colorCode }}
              className="h-5 w-5 rounded-full"
            />
            <div className="truncate">{category}</div>
          </div>
        )} */}
        {/* <div className="text-lg font-bold md:text-lg">{title}</div> */}
      </div>
      {/* <div>
        <Preview value={description!} />
      </div> */}
      {imageUrl && (
        <div
          className="relative aspect-video w-full rounded-md p-2"
          // style={{ border: "2px solid purple" }}
        >
          <Image
            fill
            // className="w-full object-contain"
            className="cover"
            alt={title}
            src={imageUrl}
          />
        </div>
      )}
    </div>
    <LikeComment
      id={id}
      likesCount={likesCount}
      currentLike={currentLike}
      commentsWithLikes={commentsWithLikes}
      commentsCount={commentsCount}
      updateLikeComment={updateLikeComment}
    />
  </div>
);
