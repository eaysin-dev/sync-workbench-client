import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usersModalTypes } from "@/constants/modal-types";
import { openEditModal } from "@/features/modal/modal-slice";
import { useDeleteUserMutation } from "@/features/users/users-api";
import { User } from "@/models/User";
import { ApiResponseError } from "@/types/error";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Copy, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { UserTableRow } from "../../_hooks/use-user-table-filters";

interface ActionMenuProps {
  user: UserTableRow;
  onView?: (id: string) => void;
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
}

export const CellAction = ({
  user,
  onDelete,
  onEdit,
  onView,
}: ActionMenuProps) => {
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const [deleteUser, { status, isSuccess }] = useDeleteUserMutation();
  const handleOpenEditModal = (data: UserTableRow) =>
    dispatch(openEditModal({ modalId: usersModalTypes.editUsers, data }));

  const onConfirm = () => {
    deleteUser(user?.id)
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully!");
      })
      .catch((error: ApiResponseError) => {
        const errorMessage =
          error?.data?.error?.message ||
          "User Delete failed. Please try again.";
        toast.error(errorMessage);
      });
    if (status === "fulfilled" && isSuccess)
      toast.success("User deleted successfully!");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.email)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Email ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenEditModal(user)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:!text-destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
