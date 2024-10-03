"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { AuthButton } from "./AuthButton";
import { loginWithCreds } from "@/actions/authActions";
import { useState } from "react";

export const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterFormSchema>> = async (
    data
  ) => {
    const res = await loginWithCreds(data);
    if (res) setMessage(res.error);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="email"
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="password"
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-red-500 text-xs h-4">{message}</p>

          <AuthButton />
        </form>
      </Form>
    </>
  );
};
