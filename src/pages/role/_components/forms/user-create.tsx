import { FormInput } from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useUserForm from "../../hooks/use-create";

const UserForm = () => {
  const { form, isPending, onSubmit, errors, closeModal } = useUserForm();

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
            disabled={false}
            errorMsg={errors.name?.message}
          />

          <FormInput
            name="description"
            label="Role"
            type="text"
            placeholder="Enter your role"
            control={form.control}
            disabled={isPending}
            errorMsg={errors.description?.message}
          />
        </div>

        <div className="pt-2 w-full flex justify-end gap-5">
          <Button onClick={closeModal}>Cancel</Button>

          <Button disabled={isPending} type="submit">
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
