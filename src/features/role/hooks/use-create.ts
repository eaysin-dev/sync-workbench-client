import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from '@/api/role/role-api';
import { RootState } from '@/app/store';
import useCloseModal from '@/hooks/use-close-modal';
import { Role } from '@/models/Role';
import { ApiResponseError } from '@/types/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Role name is required' }),
  description: z.string().optional(),
});

export type RoleFormDataType = z.infer<typeof formSchema>;

const initialState: RoleFormDataType = {
  name: '',
  description: '',
};

const useRoleForm = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { closeAllModals } = useCloseModal();
  const role = useSelector(
    (state: RootState) => state.modal?.editModal?.data as Role,
  );

  // Determine the initial data based on mode
  const initialData =
    mode === 'edit' && role ? { ...initialState, ...role } : initialState;

  const [isPending, startTransition] = useTransition();

  const form = useForm<RoleFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [createRole, { isError: isCreateError, error: createError }] =
    useCreateRoleMutation();
  const [updateRole, { isError: isUpdateError, error: updateError }] =
    useUpdateRoleMutation();

  const onSubmit = (data: RoleFormDataType) => {
    startTransition(() => {
      if (mode === 'create') {
        createRole(data)
          .unwrap()
          .then(() => {
            toast.success('Role created successfully!');
            closeAllModals();
          })
          .catch((error: ApiResponseError) => {
            toast.error(
              error?.data?.error?.message ||
                'Failed to create role. Please try again.',
            );
          });
      } else if (mode === 'edit') {
        if (!role?.id) {
          toast.error('Role ID is missing for edit operation.');
          return;
        }

        updateRole({ id: role?.id, body: data })
          .unwrap()
          .then(() => {
            toast.success('Role updated successfully!');
            closeAllModals();
          })
          .catch((error: ApiResponseError) => {
            toast.error(
              error?.data?.error?.message ||
                'Failed to update role. Please try again.',
            );
          });
      }
    });
  };

  return {
    onSubmit,
    isCreateError,
    createError,
    isUpdateError,
    updateError,
    form,
    isPending,
    errors: form.formState.errors,
    closeAllModals,
  };
};

export default useRoleForm;
