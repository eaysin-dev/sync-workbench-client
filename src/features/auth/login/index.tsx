import AuthLayout from "@/layout/auth-layout";
import { getRegisterLink } from "@/routes/router-link";
import LoginForm from "./login";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login to your account"
      description="Enter your username and password below to log in"
      form={<LoginForm />}
      buttonLabel="Create an account"
      buttonLink={getRegisterLink()}
      promptText="Don't have an account yet?"
    />
  );
}
