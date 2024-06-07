import { Category } from "@prisma/client";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[] | any[];
  defaultColor: string;
}

export const Categories = ({ items, defaultColor }: CategoriesProps) => {
  const all =
    items
      ?.map((each) => each?._count?.LiveEvent ?? 0)
      ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) ??
    0;
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 no-scrollbar">
      <CategoryItem label={"all"} colorCode={defaultColor} count={all} />
      {items.map((item) => {
        return (
          <CategoryItem
            key={item.id}
            label={item.name}
            value={item.id}
            colorCode={item.colorCode}
            count={item?._count?.LiveEvent}
          />
        );
      })}
    </div>
  );
};
