"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Add Checkbox component import
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useLoginMutation } from "@/features/auth/auth-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const defaultValues = {
    username: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [userLogin, { isError, error: loginError }] = useLoginMutation();

  const onSubmit = (data: UserFormValue) => {
    startTransition(() => {
      if (rememberMe) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("password", data.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      userLogin(data);
    });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      form.setValue("username", storedUsername);
      form.setValue("password", storedPassword);
      setRememberMe(true);
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username..."
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your password..."
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <FormItem className="flex items-center space-x-2">
              <Checkbox
                disabled={isPending}
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              <FormLabel>Remember me</FormLabel>
            </FormItem>

            {/* Forgot Password Button */}
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button disabled={isPending} className="ml-auto w-full" type="submit">
          {isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Error Message */}
        {isError && (
          <p className="text-sm text-red-600 mt-2">
            {(loginError as { message?: string })?.message ||
              "Login failed. Please try again."}
          </p>
        )}
      </form>
    </Form>
  );
}
