import { FormInput } from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { RegisterFormDataType } from "../hooks/use-register";

interface RegisterProps {
  isPending: boolean;
  errors: FieldErrors<RegisterFormDataType>;
  isRegistrationError: boolean;
  registrationError: FetchBaseQueryError | SerializedError | undefined;
  onSubmit: (data: RegisterFormDataType) => void;
  form: UseFormReturn<RegisterFormDataType>;
}

export default function Register({
  errors,
  form,
  isPending,
  onSubmit,
  isRegistrationError,
  registrationError,
}: RegisterProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
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

        <div className="pt-2">
          <Button
            disabled={isPending}
            className="ml-auto w-full "
            type="submit"
          >
            {isPending ? "Registering..." : "Register"}
          </Button>

          {/* Error Message */}
          {isRegistrationError && (
            <p className="text-sm text-red-600 mt-2">
              {(registrationError as { message?: string })?.message ||
                "Registration failed. Please try again."}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
