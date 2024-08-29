import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@models/User.model";
import { ColumnDef } from "@tanstack/react-table";
import { UserActionDropdownMenu } from "@pages/Users/UserActionDropdownMenu";

export const UserColumns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Name" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "approved",
    header: () => <div className="text-center">Approved</div>,
    cell: ({ row }) => {
      const approved: boolean = row.getValue("approved") as boolean;
      return (
        <div className="text-center">
          <Checkbox checked={approved} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserActionDropdownMenu user={row.original} />;
    },
  },
];
