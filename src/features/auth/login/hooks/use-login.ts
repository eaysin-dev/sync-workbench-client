import { useLoginMutation } from '@/api/auth/auth-api';
import { ApiResponseError } from '@/types/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginFormDataType = z.infer<typeof formSchema>;

const useLogin = () => {
  const [isPending, startTransition] = useTransition();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const defaultValues = {
    username: '',
    password: '',
  };
  const form = useForm<LoginFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [
    userLogin,
    { isError: isLoginError, error: loginError, isLoading: isLoginLoading },
  ] = useLoginMutation();

  const handleRememberMe = (checked: CheckedState) => {
    setRememberMe(Boolean(checked));
  };

  const onSubmit = (data: LoginFormDataType) => {
    if (rememberMe) {
      localStorage.setItem('username', data.username);
      localStorage.setItem('password', data.password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }

    startTransition(() => {
      userLogin(data)
        .unwrap()
        .then(() => {
          toast.success('Login is successful');
        })
        .catch((err: ApiResponseError) => {
          const errorMessage =
            err?.data?.error?.message || 'Login failed. Please try again.';
          toast.error(errorMessage);
        });
    });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      form.setValue('username', storedUsername);
      form.setValue('password', storedPassword);
      setRememberMe(true);
    }
  }, [form]);

  return {
    onSubmit,
    isLoginError,
    loginError,
    isPending,
    handleRememberMe,
    form,
    rememberMe,
    isLoginLoading,
  };
};

export default useLogin;
