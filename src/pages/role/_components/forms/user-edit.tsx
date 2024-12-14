import { FormInput } from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { RoleFormDataType } from "../../hooks/use-create";

interface RegisterProps {
  isPending: boolean;
  errors: FieldErrors<RoleFormDataType>;
  onSubmit: (data: RoleFormDataType) => void;
  form: UseFormReturn<RoleFormDataType>;
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
            name="name"
            label="Username"
            type="text"
            placeholder="Enter your username"
            control={form.control}
            errorMsg={errors.name?.message}
            disabled={true}
          />

          <FormInput
            name="description"
            label="Email"
            type="email"
            placeholder="Enter your email"
            control={form.control}
            errorMsg={errors.description?.message}
            disabled={true}
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
