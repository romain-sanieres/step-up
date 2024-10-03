"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBagIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CartProduct from "./_components/CartProduct";
import { getCartAction } from "@/app/zsa/cart.action";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

export default function Cart() {

  const { data, isError, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const cartItems = await getCartAction();
      return cartItems[0]?.cart || [];
    },
  });
  
  if (isError) return <></>;
  if (isLoading)
    return (
      <div className="p-2">
        <ShoppingBagIcon size={20} className="hover:cursor-pointer" />
      </div>
    );

  // Calculer le prix total
  const totalPrice = data?.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <ShoppingBagIcon size={20} className="hover:cursor-pointer" />
        {data && data?.length > 0 ? (
          <Badge className="absolute text-[.5rem] rounded-full w-4 h-4 p-0 flex items-center justify-center right-1 bottom-5">
            {data?.length}
          </Badge>
        ) : null}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
          <SheetDescription>
            {data && data?.length > 0 ? (
              <Button size={"lg"} className="text-lg w-full space-x-4 my-5">
                <span>Checkout</span>
                <span>${totalPrice?.toFixed(2)}</span>
              </Button>
            ) : null}
          </SheetDescription>
        </SheetHeader>
        <div className="h-full mt-5">
          {data && data?.length > 0 ? (
            <>
              {data
                ?.sort((a, b) => a.product.name.localeCompare(b.product.name))
                .sort((a, b) => a.size.localeCompare(b.size))
                .map((item, index) => (
                  <CartProduct
                    key={index}
                    id={item.product.id}
                    name={item.product.name}
                    size={item.size}
                    quantity={item.quantity}
                    price={item.product.price}
                  />
                ))}
            </>
          ) : (
            <p className="text-muted-foreground">Your cart is empty</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
