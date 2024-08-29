import { usePromise } from "@hooks";
import { CategoriesConstainer } from "@pages/Categories/CategoriesConstainer";
import { getAllCategories } from "@services/CategoryService";
import { Suspense } from "react";
import { useFirestore } from "reactfire";

export function Categories() {
  // Hooks
  const db = useFirestore();
  const { data, isLoading } = usePromise(getAllCategories(db));

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <CategoriesConstainer categories={data} />
    </Suspense>
  );
}
