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
import { openModal } from "@/features/modal/modal-slice";
import { useDeleteUserMutation } from "@/features/users/users-api";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { RoleTableRow } from "../../_type";

interface CellActionProps {
  data: RoleTableRow;
}

export const CellAction = ({ data }: CellActionProps) => {
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const [deleteUser, { status, isSuccess }] = useDeleteUserMutation();
  const handleOpenEditModal = (data: RoleTableRow) =>
    dispatch(
      openModal({ type: "editModal", modalId: usersModalTypes.editUsers, data })
    );

  const onConfirm = () => {
    deleteUser(data?.id);
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => handleOpenEditModal(data)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
