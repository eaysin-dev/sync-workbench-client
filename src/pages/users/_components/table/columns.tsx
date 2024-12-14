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
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <SortableHeader column={column} title="Role" />,
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <SortableHeader column={column} title="Gender" />,
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CellAction user={row.original} />,
  },
];
