import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Category } from "@models/Category.model";
import { ColumnDef } from "@tanstack/react-table";

export const CategoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
  },
];
