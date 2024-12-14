import { FormInput } from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useUserForm from "../../_hooks/use-user-create";

const UserForm = () => {
  const { form, isSubmitting, onSubmit, errors, closeAllModals } =
    useUserForm();

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
            disabled={false}
            errorMsg={errors.username?.message}
          />

          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            control={form.control}
            errorMsg={errors.email?.message}
          />

          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            control={form.control}
            errorMsg={errors.password?.message}
          />

          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            control={form.control}
            errorMsg={errors.confirmPassword?.message}
          />

          <FormInput
            name="role"
            label="Role"
            type="text"
            placeholder="Enter your role"
            control={form.control}
            errorMsg={errors.role?.message}
          />

          <FormInput
            name="status"
            label="Status"
            type="select"
            placeholder="Select status"
            options={["Pending", "Active", "Inactive"]}
            control={form.control}
            errorMsg={errors.status?.message}
          />
        </div>

        <div className="pt-4 w-full flex justify-end gap-5">
          <Button type="button" onClick={closeAllModals} variant={"outline"}>
            Cancel
          </Button>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
