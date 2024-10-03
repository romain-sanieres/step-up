"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenLineIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommmenFormSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { createReviewAction } from "@/app/zsa/product.action";
import { getUserAction } from "@/app/zsa/user.action";
import { useQueryClient } from "@tanstack/react-query";
import StarRating from "./RateStars";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type CommentType = {
  name: string;
  title: string;
  rating: number;
  comment: string;
};

export default function CreateComment({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CommentType>({
    resolver: zodResolver(CommmenFormSchema),
  });

  const { isPending, mutate } = useServerActionMutation(createReviewAction, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const onSubmit: SubmitHandler<CommentType> = async (data) => {
    const [user] = await getUserAction();
    const formattedData = {
      ...data,
      id: id,
      userId: user?.id || "",
      rating: data.rating, 
    };
    mutate(formattedData);
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-x-2" variant="outline" onClick={() => setIsOpen(true)}>
          <PenLineIcon className="stroke-1" size={15} />{" "}
          <span>Write a Review</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about this product. Your review helps others make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" {...register("name")} placeholder="John Doe" className="w-full" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Review Title</Label>
            <Input id="title" {...register("title")} placeholder="Summarize your review" className="w-full" />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              {...register("comment")}
              placeholder="Share your experience with this product"
              className="resize-none w-full h-24"
            />
            {errors.comment && <p className="text-sm text-red-500">{errors.comment.message}</p>}
          </div>
          
          <Card>
            <CardContent className="pt-4">
              <Label>Your Rating</Label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRating
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.rating && <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>}
            </CardContent>
          </Card>
          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}