"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/types/login-schema";
import { useAction } from "next-safe-action/hooks";
import { LoginAccount } from "@/server/actions/login";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(LoginAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        toast.error(data.data.error);
      } 
    },
  });

  const onSubmit = (
    values: z.infer<typeof LoginSchema>
  ) => {
    execute(values);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Welcome Back
      </h3>
      <p className="text-gray-600 text-sm text-center mb-8">
        👋 Please enter your credentials to log in
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    type="email"
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
                <FormLabel className="text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">
            {status === "executing"
              ? "Logging in..."
              : "Log In"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-gray-600 text-sm mt-6">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
