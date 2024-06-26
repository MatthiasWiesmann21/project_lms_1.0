"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryItemProps {
  label: string;
  value?: string;
  colorCode: string;
}

export const CategoryItemCard = ({
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
    const url = qs.stringifyUrl(
      {
        // @ts-ignore
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-x-1 rounded-full border-2 border-slate-300 p-1 px-3 text-[10px] transition hover:border-sky-700`}
      style={{ borderColor: colorCode }}
      type="button"
    >
      <div className="truncate">{label?.toUpperCase()}</div>
    </button>
  );
};
