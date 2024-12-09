import { RootState } from "@/app/store";
import { closeCreateModal, closeEditModal } from "@/features/modal/modal-slice";
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "@/features/role/role-api";
import { Role } from "@/models/Role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Role name is required" }),
  description: z.string().optional(),
});

export type FormDataType = z.infer<typeof formSchema>;

const initialState: FormDataType = { name: "", description: "" };

const useRoleForm = ({ mode }: { mode: "create" | "edit" }) => {
  const dispatch = useDispatch();
  const { editModal } = useSelector((state: RootState) => state.modal);
  const previousRoleData = editModal?.data as Role;

  // Determine the initial data based on mode
  const initialData =
    mode === "edit" && editModal?.data
      ? { ...initialState, ...editModal.data }
      : initialState;

  const [isPending, startTransition] = useTransition();

  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [createRole, { isError: isCreateError, error: createError }] =
    useCreateRoleMutation();
  const [updateRole, { isError: isUpdateError, error: updateError }] =
    useUpdateRoleMutation();

  const closeModal = () => {
    if (mode === "create") {
      dispatch(closeCreateModal());
    } else {
      dispatch(closeEditModal());
    }
  };

  const onSubmit = (data: FormDataType) => {
    startTransition(() => {
      if (mode === "create") {
        createRole(data)
          .unwrap()
          .then(() => {
            toast.success("Role created successfully!");
            closeModal();
          })
          .catch((error: any) => {
            toast.error(
              error?.data?.message || "Failed to create role. Please try again."
            );
          });
      } else if (mode === "edit") {
        if (!editModal?.data?.id) {
          toast.error("Role ID is missing for edit operation.");
          return;
        }

        updateRole({ id: editModal.data.id, body: data })
          .unwrap()
          .then(() => {
            toast.success("Role updated successfully!");
            closeModal();
          })
          .catch((error: any) => {
            toast.error(
              error?.data?.message || "Failed to update role. Please try again."
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
    closeModal,
  };
};

export default useRoleForm;
