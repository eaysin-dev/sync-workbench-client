import AuthLayout from "@/layout/auth-layout";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create a new account"
      description="Fill in your details below to create an account"
      form={<RegisterForm />}
      buttonLabel="Log in"
      buttonLink="/"
      promptText="Already have an account?"
    />
  );
}
