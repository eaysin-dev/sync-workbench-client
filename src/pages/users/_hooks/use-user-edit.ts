import { RootState } from "@/app/store";
import { closeEditModal } from "@/features/modal/modal-slice";
import { useUpdateUserPartiallyMutation } from "@/features/users/users-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.string().min(1, { message: "Role is required" }),
  status: z.enum(["Pending", "Active", "Inactive"]).default("Pending"),
});

export type UserEditFormDataType = z.infer<typeof formSchema>;

const useUserEdit = () => {
  const dispatch = useDispatch();

  const { editModal } = useSelector((state: RootState) => state.modal);

  const [isPending, startTransition] = useTransition();

  const form = useForm<UserEditFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [updateUser, { isError, error }] = useUpdateUserPartiallyMutation();

  const onSubmit = (data: UserEditFormDataType) => {
    startTransition(() => {
      updateUser({ id: editModal?.data?.id || "", body: data })
        .unwrap()
        .then(() => {
          toast.success("User updated successfully!");
          dispatch(closeEditModal());
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          toast.error(
            error?.data?.message || "Failed to edit user. Please try again."
          );
        });
    });
  };

  const closeModal = () => {
    dispatch(closeEditModal());
  };

  useEffect(() => {
    if (editModal?.data) {
      form.reset(editModal.data);
    }
  }, [editModal?.data, form]);

  return {
    onSubmit,
    isError,
    error,
    form,
    isPending,
    errors: form.formState.errors,
    closeModal,
  };
};

export default useUserEdit;
