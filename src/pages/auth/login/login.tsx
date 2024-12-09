import Login from "./_components/forms/login";
import useLogin from "./hooks/use-login";

const LoginForm = () => {
  const {
    form,
    handleRememberMe,
    isLoginError,
    isPending,
    loginError,
    onSubmit,
    rememberMe,
  } = useLogin();

  return (
    <Login
      form={form}
      handleRememberMe={handleRememberMe}
      isLoginError={isLoginError}
      isPending={isPending}
      loginError={loginError}
      onSubmit={onSubmit}
      rememberMe={rememberMe}
    />
  );
};

export default LoginForm;
