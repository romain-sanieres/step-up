"use client"
import { addQuantityAction, subtractQuantityAction } from "@/app/zsa/cart.action";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

type CartProductProps = {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
};

export default function CartProduct({id, name, size, quantity, price }: CartProductProps) {
  const queryClient = useQueryClient();
  const { mutate: mutateAdd } = useServerActionMutation(addQuantityAction, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const { mutate: mutateSub } = useServerActionMutation(
    subtractQuantityAction,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );


  return (
    <div className="flex items-end justify-between gap-x-4 select-none shadow-md p-5 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="size-20 bg-muted rounded-lg"></div>
        <div className="select-none">
          <Link href={`/product/${id}`} className="text-md font-semibold">{name}</Link>
          <p className="text-sm">
            <span className="text-muted-foreground">Size:</span> {size}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border py-2 px-4 rounded-full">
          <MinusIcon
            size={15}
            className="cursor-pointer rounded-full size-4"
            onClick={() => mutateSub({ productId: id, size: size })}
          />
          <p className="w-8 text-center text-sm select-none">{quantity}</p>
          <PlusIcon
            size={15}
            className="cursor-pointer  size-4"
            onClick={() => mutateAdd({ productId: id, size: size })}
          />
        </div>
        <p className="text-sm">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
