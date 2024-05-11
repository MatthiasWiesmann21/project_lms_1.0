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
}

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
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
  )
}