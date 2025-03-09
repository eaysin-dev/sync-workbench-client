import { useDeleteUserMutation } from '@/api/users/users-api';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { userMessages } from '@/constants/user-messages';
import { handleApiCall } from '@/utils/handle-api-call';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Copy, Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { useUsersModals } from '../../_hooks/use-users-modals';
import { UserTableRow } from './columns';

interface ActionMenuProps {
  user: UserTableRow;
}

export const CellAction = ({ user }: ActionMenuProps) => {
  const [open, setOpen] = useState(false);

  const { handleOpenEditModal } = useUsersModals();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const onConfirm = () => {
    handleApiCall({
      apiCall: deleteUser(user?.id),
      successMessage: userMessages?.success?.delete,
      errorMessage: userMessages?.error?.delete,
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.email)}
          >
            <Copy className='mr-2 h-4 w-4' /> Copy Email ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Eye className='mr-2 h-4 w-4' /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenEditModal(user)}>
            <Edit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive hover:!text-destructive'
            onClick={() => setOpen(true)}
          >
            <Trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
