import { FormInput } from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { UserEditFormDataType } from "../../hooks/use-edit";

interface RegisterProps {
  isPending: boolean;
  errors: FieldErrors<UserEditFormDataType>;
  onSubmit: (data: UserEditFormDataType) => void;
  form: UseFormReturn<UserEditFormDataType>;
  onClose: () => void;
}

export default function UserEditForm({
  form,
  isPending,
  onSubmit,
  errors,
  onClose,
}: RegisterProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <div className="grid md:grid-cols-2 md:items-start md:justify-center gap-3">
          <FormInput
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            control={form.control}
            errorMsg={errors.username?.message}
            disabled={true}
          />

          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            control={form.control}
            errorMsg={errors.email?.message}
            disabled={true}
          />

          <FormInput
            name="role"
            label="Role"
            type="text"
            placeholder="Enter your role"
            control={form.control}
            errorMsg={errors.role?.message}
            disabled={isPending}
          />

          <FormInput
            name="status"
            label="Status"
            type="select"
            placeholder="Select status"
            options={["Pending", "Active", "Inactive"]}
            control={form.control}
            errorMsg={errors.status?.message}
            disabled={isPending}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={onClose}>Cancel</Button>

          <Button disabled={isPending} type="submit">
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
