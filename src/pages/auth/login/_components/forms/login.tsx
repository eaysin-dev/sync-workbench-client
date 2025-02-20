import { FormInput } from '@/components/form-element';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'; // Add Checkbox component import
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { CheckedState } from '@radix-ui/react-checkbox';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginFormDataType } from '../../hooks/use-login';

interface LoginProps {
  isLoginError: boolean;
  isPending: boolean;
  loginError: FetchBaseQueryError | SerializedError | undefined;
  onSubmit: (data: LoginFormDataType) => void;
  form: UseFormReturn<LoginFormDataType>;
  handleRememberMe: (checked: CheckedState) => void;
  rememberMe: boolean;
  isLoginLoading: boolean;
}

export default function Login({
  form,
  handleRememberMe,
  isLoginError,
  isPending,
  loginError,
  onSubmit,
  rememberMe,
  isLoginLoading,
}: LoginProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        <div className='space-y-2'>
          <FormInput
            name='username'
            label='Username'
            type='text'
            placeholder='Enter your username'
            control={form.control}
            disabled={false}
          />

          <FormInput
            name='password'
            label='Password'
            type='password'
            placeholder='Enter your password...'
            control={form.control}
            disabled={false}
          />

          <div className='flex justify-between items-center'>
            <FormItem className='flex items-center space-x-2'>
              <Checkbox
                disabled={isPending}
                checked={rememberMe}
                onCheckedChange={(checked) => handleRememberMe(checked)}
              />
              <FormLabel>Remember me</FormLabel>
            </FormItem>

            <Link
              to='/forgot-password'
              className='text-sm text-blue-600 hover:underline'
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button
          disabled={isLoginLoading}
          className='ml-auto w-full'
          type='submit'
        >
          {isLoginLoading ? 'Logging in...' : 'Login'}
        </Button>

        {/* Error Message */}
        {isLoginError && (
          <p className='text-sm text-red-600 mt-2'>
            {(loginError as { message?: string })?.message ||
              'Login failed. Please try again.'}
          </p>
        )}
      </form>
    </Form>
  );
}
