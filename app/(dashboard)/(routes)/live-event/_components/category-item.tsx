"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CategoryItemProps {
  label: string;
  value?: string;
  colorCode: string;
  count?: string;
}

export const CategoryItem = ({
  label,
  value,
  colorCode,
  count,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);

  const currentCategoryId = searchParams?.get("categoryId");
  const currentTitle = searchParams?.get("title");

  const isSelected =
    currentCategoryId === value || (!value && !currentCategoryId);

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

  const buttonStyle = isSelected
    ? { borderColor: colorCode, background: colorCode }
    : { borderColor: "#cbd5e1", background: isHovered ? colorCode : 'transparent' };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-x-1 rounded-full border p-2 text-xs font-medium transition hover:border-0`}
      style={buttonStyle}
      type="button"
    >
      <div className="truncate">{label?.toUpperCase()}</div>
      <div>({count})</div>
    </button>
  );
};
