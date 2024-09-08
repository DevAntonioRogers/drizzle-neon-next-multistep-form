"use client";

import { RegisterSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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

export const thirdStepSchema = z
  .object({
    password: z.string().min(8, {
      message:
        "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

interface StepThreeProps {
  onBack: () => void;
  handleSubmit: (
    values: z.infer<typeof RegisterSchema>
  ) => void;
  formData: any;
}

const StepThree = ({
  onBack,
  handleSubmit,
  formData,
}: StepThreeProps) => {
  const [passwordStrength, setPasswordStrength] =
    useState("");
  const [passwordMismatch, setPasswordMismatch] =
    useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: formData,
  });

  const checkPasswordStrength = (password: string) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    const mediumRegex =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  const onSubmit = (
    values: z.infer<typeof RegisterSchema>
  ) => {
    if (values.password !== values.confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      handleSubmit(values);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold">
        Choose a password
      </h3>
      <p className="text-gray-500 text-sm mt-3">
        🥷 Make sure you choose a strong one
      </p>
      <div className="mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter password here"
                      type="password"
                      onChange={(e) => {
                        field.onChange(e);
                        checkPasswordStrength(
                          e.target.value
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {passwordStrength && (
                    <p
                      className={`text-sm mt-2 ${
                        passwordStrength === "strong"
                          ? "text-green-500"
                          : passwordStrength === "medium"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      Password strength: {passwordStrength}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm password here"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {passwordMismatch && (
              <p className="text-red-500 text-sm text-center">
                The passwords do not match
              </p>
            )}
            <div className="flex justify-between">
              <Button onClick={onBack} variant="secondary">
                Back
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StepThree;
