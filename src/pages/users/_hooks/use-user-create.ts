import { closeCreateModal } from "@/features/modal/modal-slice";
import { useCreateUserMutation } from "@/features/users/users-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" }),
    role: z.string().min(1, { message: "Role is required" }),
    status: z.enum(["Pending", "Active", "Inactive"]).default("Pending"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type UserFormDataType = z.infer<typeof formSchema>;

const initialState: UserFormDataType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  status: "Pending",
};

const useUserForm = () => {
  const dispatch = useDispatch();
  const initialData = { ...initialState };
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [createUser, { isError: isUserError, error: userError }] =
    useCreateUserMutation();

  const closeModal = () => dispatch(closeCreateModal());

  const onSubmit = (data: UserFormDataType) => {
    const mutableData = { ...data } as Partial<UserFormDataType>;
    delete mutableData?.confirmPassword;

    startTransition(() => {
      createUser(mutableData as UserFormDataType)
        .unwrap()
        .then(() => {
          toast.success("User created successfully!");
          dispatch(closeCreateModal());
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          toast.error(
            error?.data?.message || "Failed to create user. Please try again."
          );
        });
    });
  };

  return {
    onSubmit,
    isUserError,
    userError,
    form,
    isPending,
    errors: form.formState.errors,
    closeModal,
  };
};

export default useUserForm;
