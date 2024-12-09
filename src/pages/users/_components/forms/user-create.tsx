import { FormInput } from "@/components/form-element";
import ActionButtons from "@/components/modal/modal-action-button";
import { Form } from "@/components/ui/form";
import useUserForm from "../../_hooks/use-user-create";

const UserForm = () => {
  const { form, isPending, onSubmit, errors, closeModal } = useUserForm();

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
            disabled={isPending}
            errorMsg={errors.email?.message}
          />

          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            control={form.control}
            disabled={isPending}
            errorMsg={errors.password?.message}
          />

          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            control={form.control}
            disabled={isPending}
            errorMsg={errors.confirmPassword?.message}
          />

          <FormInput
            name="role"
            label="Role"
            type="text"
            placeholder="Enter your role"
            control={form.control}
            disabled={isPending}
            errorMsg={errors.role?.message}
          />

          <FormInput
            name="status"
            label="Status"
            type="select"
            placeholder="Select status"
            options={["Pending", "Active", "Inactive"]}
            control={form.control}
            disabled={isPending}
            errorMsg={errors.status?.message}
          />
        </div>

        <ActionButtons
          modalType="create"
          closeModal={closeModal}
          buttonText="Create"
          isPending={isPending}
        />
      </form>
    </Form>
  );
};

export default UserForm;
