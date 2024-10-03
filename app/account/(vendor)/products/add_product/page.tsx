"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TagInput from "../_components/TagInput";
import { ProductType } from "@/types";
import { ProductFormSchema } from "@/schema";
import { useToast } from "@/components/hooks/use-toast";
import { Loader2Icon, XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { createProductAction } from "@/app/zsa/product.action";

export default function AddProduct() {
  const { toast } = useToast();
  const [tagList, setTagList] = useState<string[]>([]);
  const [resetTagList, setResetTagList] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      gender: "",
      images: [],
    },
  });

  useEffect(() => {
    setValue(
      "images",
      selectedFiles.map((file) => URL.createObjectURL(file))
    );
  }, [selectedFiles, setValue]);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const base64 = await convertToBase64(file);
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: base64 }),
    });
    const data: { url: string } = await response.json();
    return data.url;
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    setIsSubmitting(true);
    try {
      const uploadedImageUrls = await Promise.all(
        selectedFiles.map(uploadImage)
      );

      const formattedData = {
        ...data,
        tags: tagList.join(","),
        price: data.price.toString(),
        sku: data.sku || "",
        collection: data.collection || "",
        gender: data.gender || "",
        images: uploadedImageUrls,
      };

      await createProductAction(formattedData);

      toast({
        className: "bg-emerald-500/40",
        title: "Success",
        description:
          data.name + " has been successfully added to your products",
      });
      reset();
      setResetTagList(true);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(errors);

  return (
    <section>
      <p className="text-2xl font-semibold">New Product</p>
      <div className="mt-10">
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the product"
              className="min-h-[100px]"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="Enter price"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="collection">Collection</Label>
            <Input
              id="collection"
              placeholder="Enter collection (Optional)"
              {...register("collection")}
            />
          </div>

          <TagInput action={setTagList} resetList={resetTagList} />

          <div className="grid gap-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" placeholder="Enter SKU" {...register("sku")} />
            {errors.sku && (
              <p className="text-red-500 text-xs">{errors.sku.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="images">Product Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              max={4}
              onChange={handleFileSelection}
            />
            <div className="flex gap-4 mt-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative size-20">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Product ${index + 1}`}
                    className="relative w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <XIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
            {errors.images && (
              <p className="text-red-500 text-xs">{errors.images.message}</p>
            )}
          </div>

          <div className="flex w-full justify-end">
            <div className="flex justify-between w-fit mt-5 gap-x-2">
              <Link href="/account/products">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2Icon className="animate-spin" size={16} />
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
