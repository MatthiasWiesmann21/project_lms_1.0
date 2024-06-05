import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  colorCode?: string;
}

export const PostCard = ({
  id,
  title,
  imageUrl,
  category,
  description,
  colorCode,
}: PostCardProps) => {
  return (
    <Link href={`/news/${id}`}>
      <div className="group mr-5 h-full w-[320px] overflow-hidden rounded-lg border p-2 hover:shadow-sm dark:border-[#ffffff]">
        <div className="relative aspect-video rounded">
          <Image fill className="contain rounded" alt={title} src={imageUrl} />
        </div>
        <div
          className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-slate-300 px-2 py-1 text-xs"
          style={{ borderColor: colorCode }}
        >
          <div className="truncate">{category}</div>
        </div>
        <div className="py-2 text-lg font-[600] md:text-lg">{title}</div>
        <div
          className="text-[14px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </Link>
  );
};
