import { Category } from "@prisma/client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";

interface CategoriesProps {
  items: Category[] | any[];
  defaultColor: string;
}

export const Categories = ({ items, defaultColor }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategoryId = searchParams?.get("categoryId");
  const currentTitle = searchParams?.get("title");

  const all =
    items
      ?.map((each) => each?._count?.posts ?? 0)
      ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) ??
    0;

  return (
    <div className="flex w-full items-center gap-x-2 overflow-x-auto pb-2">
      <button
        onClick={() =>
          router?.push(
            qs?.stringifyUrl(
              {
                // @ts-ignore
                url: pathname,
                query: {
                  title: currentTitle,
                  categoryId: null,
                },
              },
              { skipNull: true, skipEmptyString: true }
            )
          )
        }
        className={`flex items-center gap-x-1 rounded-full border border-slate-300 p-3 text-sm transition hover:border-sky-700`}
        style={
          !currentCategoryId
            ? { borderColor: defaultColor, background: defaultColor }
            : { borderColor: "#cbd5e1" }
        }
        type="button"
      >
        <div className="truncate">All</div>
        <div>({all})</div>
      </button>
      {items?.map((item) => {
        const isSelected =
          currentCategoryId === item?.id || (!item?.id && !currentCategoryId);
        const onClick = () => {
          const url = qs?.stringifyUrl(
            {
              // @ts-ignore
              url: pathname,
              query: {
                title: currentTitle,
                categoryId: isSelected ? null : item?.id,
              },
            },
            { skipNull: true, skipEmptyString: true }
          );

          router?.push(url);
        };
        return (
          <button
            onClick={onClick}
            className={`flex items-center gap-x-1 rounded-full border border-slate-300 p-3 text-sm transition hover:border-sky-700`}
            style={
              isSelected
                ? { borderColor: item?.colorCode, background: item?.colorCode }
                : { borderColor: "#cbd5e1" }
            }
            type="button"
          >
            <div className="truncate">{item?.name?.toUpperCase()}</div>
            <div>({item?._count?.posts})</div>
          </button>
        );
      })}
    </div>
  );
};
