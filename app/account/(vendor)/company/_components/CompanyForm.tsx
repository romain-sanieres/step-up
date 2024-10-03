"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CompanyFormSchema } from "@/schema";
import { CompanyFormType } from "@/types";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { Loader2Icon } from "lucide-react";
import { getUserAction } from "@/app/zsa/user.action";
import { createCompanyAction } from "@/app/zsa/company.action";
import { useToast } from "@/components/hooks/use-toast";

export default function CompanyForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUserAction();
      return user[0];
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormType>({ resolver: zodResolver(CompanyFormSchema) });

  const { isPending, mutate } = useServerActionMutation(createCompanyAction, {
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user data</p>;

  const submitForm: SubmitHandler<CompanyFormType> = async (data) => {
    mutate(data);
  };

  return (
    <section>
      <p className="text-2xl font-semibold">New Company</p>
      <p className="text-muted-foreground">
        You must first create a company to start selling your products.
      </p>
      <form onSubmit={handleSubmit(submitForm)} className="grid gap-4 mt-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name *</Label>
            <Input
              disabled={isPending}
              id="company-name"
              placeholder="Enter company name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stripe">Stripe Account *</Label>
            <Input
              disabled={isPending}
              id="stripe"
              placeholder="Enter your Stripe "
              {...register("stripe", { required: true })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Company Description *</Label>
          <Textarea
            disabled={isPending}
            id="description"
            rows={4}
            placeholder="Describe your company's products or services"
            {...register("description", { required: true })}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Button>
            {isPending ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              "Create New Company"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
