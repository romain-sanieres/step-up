"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/hooks/use-toast";
import { StockType } from "@/types";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { createCartAction } from "@/app/zsa/cart.action";
import { useQueryClient } from "@tanstack/react-query";


export default function Sizes({
  reference,
  price,
  name,
  sizes,
}: {
  reference: string;
  price: number;
  name: string;
  sizes: StockType[];
}) {
  const queryClient = useQueryClient();
  const [size, setSize] = useState<number>();
  const [sizeError, setSizeError] = useState(false);

  const { isPending, mutate } = useServerActionMutation(createCartAction, {
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `${name} have been added to your cart`,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setSizeError(false);
      setSize(0);
    },
    onError: (error) => {
      console.log(error);
      setSizeError(false);
      setSize(0);
    },
  });

  const addToCart = async (id: string) => {
    if (size) {
      mutate({
        productId: id,
        quantity: 1,
        size: size.toString(),
      });
    }else{
      setSizeError(true);

    }
  };
  return (
    <>
      <div className="grid grid-cols-4 xl:grid-cols-5 place-content-center gap-2">
        {sizes
          ?.sort((a, b) => Number(a.size) - Number(b.size))
          .map((item, index) => (
            <Button
              variant={"secondary"}
              disabled={item.inventory <= 5 ? true : false}
              key={index}
              className={`p-2 relative border text-center shadow rounded-lg  select-none cursor-pointer ${
                Number(item.size) === size
                  ? "border-primary"
                  : "border-transparent" && item.inventory <= 5
                  ? "line-through"
                  : null
              } `}
              onClick={() => setSize(Number(item.size))}
            >
              <p>{item.size}</p>
            </Button>
          ))}
      </div>
      <p className="text-destructive text-xs h-5">
        {sizeError ? "Please select a size." : null}
      </p>
      <Button
        disabled={isPending}
        size={"lg"}
        className="text-lg w-full space-x-4"
        onClick={() => addToCart(reference)}
      >
        <span>Add to cart</span>
        <span>${price?.toFixed(2)}</span>
      </Button>
    </>
  );
}
