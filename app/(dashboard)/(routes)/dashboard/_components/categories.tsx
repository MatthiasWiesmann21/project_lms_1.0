"use client";

import { Category } from "@prisma/client";
import { CategoryItem } from "./category-item";

interface EnhancedCategory extends Category {
  _count: {
    courses: number;
  };
}
interface CategoriesProps {
  items: EnhancedCategory[];
  defaultColor: string | any;
}

export const Categories = ({ items, defaultColor }: CategoriesProps) => {
  const all =
    items
      ?.map((each) => each?._count?.courses ?? 0)
      ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) ??
    0;

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 no-scrollbar">
      <CategoryItem
        label={"All"}
        colorCode={defaultColor}
        categoryAmmount={all}
      />
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          value={item.id}
          colorCode={item.colorCode}
          categoryAmmount={item._count.courses}
        />
      ))}
    </div>
  );
};
