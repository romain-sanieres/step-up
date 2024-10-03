"use client";
import {
  getProductAction,
  updateProductAction,
} from "@/app/zsa/product.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import TagInput from "../../_components/TagInput";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductType } from "@/types";
import { ProductFormSchema } from "@/schema";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function EditProductComponent({ session }: { session: string }) {
  const [tagList, setTagList] = useState<string[]>();
  const [resetTagList, setResetTagList] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getProductAction({ id: id as string });
      return products[0];
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductType>({ resolver: zodResolver(ProductFormSchema) });

  const { isPending, mutate } = useServerActionMutation(updateProductAction, {
    onSuccess: (data) => {
      router.replace("/account/products");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const onSubmit: SubmitHandler<ProductType> = async (formData) => {
    const formattedData = {
      ...formData,
      id: (id as string) || "",
      tags: tagList?.join(",") || "",
      price: formData.price.toString(),
      sku: formData.sku || "",
      collection: formData.collection || "",
    };
    mutate(formattedData);
  };

  if (isLoading) return <></>;
  if (isError) return <></>;
  console.log(errors)
  if (session === data?.vendorId) {
    return (
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            placeholder="Enter product name"
            defaultValue={data.name}
            {...register("name", { required: true })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the product"
            className="min-h-[100px]"
            defaultValue={data.description}
            {...register("description", { required: true })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            defaultValue={data.price}
            placeholder="Enter price"
            {...register("price", { required: true })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="collection">Collection</Label>
          <Input
            id="collection"
            defaultValue={data.collection || ""}
            placeholder="Enter collection (Optional)"
            {...register("collection", { required: true })}
          />
        </div>
        <TagInput
          action={setTagList}
          resetList={resetTagList}
          defaultTags={data.tags ? data.tags.split(",") : []}
        />
        <div className="grid gap-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            defaultValue={data.sku}
            placeholder="Enter SKU"
            {...register("sku", { required: true })}
          />
        </div>
        <div className="flex w-full justify-end">
          <div className="flex justify-between w-fit mt-5 gap-x-2">
            <Link href="/account/products">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="w-full sm:w-auto">
              {isPending ? (
                <Loader2Icon className="animate-spin" size={16} />
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}
