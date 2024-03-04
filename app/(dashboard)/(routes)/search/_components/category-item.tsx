"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { 
  usePathname, 
  useRouter, 
  useSearchParams
} from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value?: string;
  colorCode: string;
};

export const CategoryItem = ({
  label,
  value,
  colorCode,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams?.get("categoryId");
  const currentTitle = searchParams?.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl({
      // @ts-ignore
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value,
      }
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className="py-2 px-2 text-sm border border-slate-300 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition"
      style={ isSelected ? { borderColor: colorCode } : { borderColor: "#cbd5e1" } }
      type="button"
    >
      {colorCode && (
        <div
          style={{ backgroundColor: colorCode }}
          className="rounded-full w-5 h-5"
        />
      )}
      <div className="truncate">
        {label}
      </div>
    </button>
  )
}