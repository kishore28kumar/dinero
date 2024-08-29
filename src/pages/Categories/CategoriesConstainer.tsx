import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Category } from "@models/Category.model";
import { CategoryDialog } from "@pages/Categories/CategoryDialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { CategoryColumns } from "@pages/Categories/CategoryColumns";

interface CategoriesProps {
  categories: Category[];
}

export function CategoriesConstainer({ categories }: CategoriesProps) {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  function openCategoryDialog() {
    setIsCategoryDialogOpen(true);
  }

  function onSave(category: Category) {
    toast.success("Category " + category.categoryName + " has been created.");
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-5xl">Categories</h1>
        <Button className="p-2 h-8 mt-2 font-bold" onClick={openCategoryDialog}>
          <Plus />
        </Button>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <CategoryDialog
            open={isCategoryDialogOpen}
            setOpen={setIsCategoryDialogOpen}
            onSave={onSave}
          />
        </ErrorBoundary>
      </div>
      <div className="">
        <DataTable columns={CategoryColumns} data={categories} />
      </div>
    </main>
  );
}
