import { Button } from "@/components/ui/button";
import { Category } from "@models/Category.model";
import { Plus } from "lucide-react";

interface CategoriesProps {
  categories: Category[];
}

export function CategoriesConstainer({ categories }: CategoriesProps) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-5xl">Categories</h1>
        {categories.map((category) => (
          <li>{category.categoryName}</li>
        ))}
      </div>
      <div className="py-5"></div>
    </main>
  );
}
