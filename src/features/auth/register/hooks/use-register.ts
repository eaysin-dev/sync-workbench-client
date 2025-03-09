import { useRegisterMutation } from '@/api/auth/auth-api';
import { ApiResponseError } from '@/types/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm password must be at least 8 characters' }),
    role: z.string().min(1, { message: 'Role is required' }),
    status: z.enum(['Pending', 'Active', 'Inactive']).default('Pending'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterFormDataType = z.infer<typeof formSchema>;

const initialState: RegisterFormDataType = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  status: 'Pending',
};

const useRegister = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialState,
  });

  const [
    userRegister,
    { isError: isRegistrationError, error: registrationError },
  ] = useRegisterMutation();

  const onSubmit = (data: RegisterFormDataType) => {
    startTransition(() => {
      userRegister(data)
        .unwrap()
        .then(() => {
          toast.success('Login is successful');
        })
        .catch((error: ApiResponseError) => {
          const errorMessage =
            error?.data?.error?.message ||
            'Registration failed. Please try again.';
          toast.error(errorMessage);
        });
    });

    toast.success('Registration is successful');
  };

  return {
    onSubmit,
    form,
    isPending,
    errors: form?.formState?.errors,
    isRegistrationError,
    registrationError,
  };
};

export default useRegister;
