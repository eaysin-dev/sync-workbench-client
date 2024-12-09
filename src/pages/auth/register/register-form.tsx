import Register from "./_components/register";
import useRegister from "./hooks/use-register";

const RegisterForm = () => {
  const {
    form,
    isPending,
    onSubmit,
    errors,
    isRegistrationError,
    registrationError,
  } = useRegister();

  return (
    <Register
      form={form}
      isPending={isPending}
      onSubmit={onSubmit}
      errors={errors}
      isRegistrationError={isRegistrationError}
      registrationError={registrationError}
    />
  );
};

export default RegisterForm;
