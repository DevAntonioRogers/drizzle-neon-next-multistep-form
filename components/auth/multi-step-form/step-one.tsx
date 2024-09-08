"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

type StepOneProps = {
  onNext: (values: z.infer<typeof firstStepSchema>) => void;
};

export const firstStepSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  location: z.string(),
  lastName: z.string(),
});

const StepOne = ({ onNext }: StepOneProps) => {
  const form = useForm<z.infer<typeof firstStepSchema>>({
    resolver: zodResolver(firstStepSchema),
  });

  const onSubmit = (
    values: z.infer<typeof firstStepSchema>
  ) => {
    onNext(values);
  };
  return (
    <div>
      <h3 className="text-3xl from-bold">
        Register for an account
      </h3>
      <p className="text-gray-500 text-sm mt-3">
        👋 Let's start with a little bit of information
      </p>
      <div className="mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-10 mb-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter first name here"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter last name here"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter email here"
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter location here"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="mt-5 w-full" type="submit">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StepOne;
