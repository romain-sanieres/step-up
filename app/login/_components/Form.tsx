"use client";
import { loginWithCreds } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterFormSchema } from "@/schema";
import { RegisterFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ resolver: zodResolver(RegisterFormSchema) });

  const submitForm: SubmitHandler<RegisterFormType> = async (data) => {
    setIsLoading(true);
    const res = await loginWithCreds(data);
    setIsLoading(false);

  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold">Connexion</h2>
        <p className="text-muted-foreground">Welcome back !</p>
      </div>
      <Label>Identifiants</Label>
      <div className="space-y-3 mt-3 mb-8">
        <div>
          <Input
            {...register("email", { required: true })}
            placeholder="Email"
          />
          <span className="text-xs text-destructive">
            {errors.email && errors.email.message}
          </span>
        </div>
        <div>
          <Input
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Mot de passe"
            type="password"
          />
          <span className="text-xs text-destructive">
            {errors.password && errors.password.message}
          </span>
        </div>
      </div>
      <Button>{isLoading ? <LoaderCircle className="animate-spin"/> : <p>Lets Go !</p>}</Button>
    </form>
  );
}
