import { Checkbox } from "@/components/ui/checkbox";
import SortableHeader from "@/components/ui/table/data-table-sortable-header";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export interface UserTableRow {
  id: string;
  username: string;
  email: string;
  role: string;
  status: "Pending" | "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
}

export const columns: ColumnDef<UserTableRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => <SortableHeader column={column} title="username" />,
    cell: ({ row }) => row.getValue("username"),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <SortableHeader column={column} title="Role" />,
    cell: ({ row }) => row.getValue("role"),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => row.getValue("status"),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <SortableHeader column={column} title="Gender" />,
    cell: ({ row }) => row.getValue("gender"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CellAction user={row.original} />,
  },
];
