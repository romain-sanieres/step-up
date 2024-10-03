"use server";

import { db } from "@/db";
import { authedAction } from "@/lib/zsa";
import { z } from "zod";
import { getUserAction } from "./user.action";

export const getCartAction = authedAction.handler(async () => {
  try {
    const [user] = await getUserAction();
    if (!user) {
      throw new Error("User not found");
    }

    const cart = await db.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });

    return {
      success: true,
      cart,
      message: "Cart fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
});

export const createCartAction = authedAction
  .input(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      size: z.string(),
    })
  )
  .handler(async ({ input }) => {
    try {
      const [user] = await getUserAction();
      if (!user) {
        throw new Error("User not found");
      }

      const existingCart = await db.cartItem.findFirst({
        where: {
          userId: user.id,
          productId: input.productId,
          size: input.size,
        },
      });

      if (existingCart) {
        const updatedCart = await db.cartItem.update({
          where: {
            id: existingCart.id,
          },
          data: {
            quantity: existingCart.quantity + input.quantity,
          },
        });

        return {
          success: true,
          cart: updatedCart,
          message: "Cart updated successfully",
        };
      } else {
        const newCart = await db.cartItem.create({
          data: {
            productId: input.productId,
            quantity: input.quantity,
            size: input.size,
            userId: user.id,
          },
        });

        return {
          success: true,
          cart: newCart,
          message: "Cart created successfully",
        };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  });

  export const addQuantityAction = authedAction
  .input(
    z.object({
      productId: z.string(),
      size: z.string(),
    })
  )
  .handler(async ({ input }) => {

    console.log(input.size)
    try {
      const [user] = await getUserAction();
      if (!user) {
        throw new Error("User not found");
      }

      const existingCart = await db.cartItem.findFirst({
        where: {
          userId: user.id,
          productId: input.productId,
          size: input.size,
        },
      });

      if (!existingCart) {
        throw new Error("Cart item not found");
      }

      const product = await db.product.findFirst({
        where: {
          id: input.productId,
        },
        include: {
          sizes: {
            where: {
              size: input.size,
            },
          },
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      const sizeInfo = product.sizes[0];
      if (!sizeInfo) {
        throw new Error("Size not found for this product");
      }

      const sizeInventory = sizeInfo.inventory;
      const currentQuantity = existingCart.quantity;
      const vendorLimit = product.limit || 0;

      if (sizeInventory <= vendorLimit || currentQuantity >= sizeInventory - vendorLimit) {
        throw new Error(`Cannot add more items. Stock limit reached for size ${input.size}.`);
      }

      const updatedCart = await db.cartItem.update({
        where: {
          id: existingCart.id,
          size: input.size, 
        },
        data: {
          quantity: currentQuantity + 1,
        },
      });

      return {
        success: true,
        cart: updatedCart,
        message: "Cart updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  });

  export const subtractQuantityAction = authedAction
    .input(
      z.object({
        productId: z.string(),
        size: z.string(),
      })
    )
    .handler(async ({ input }) => {
      try {
        const [user] = await getUserAction();
        if (!user) {
          throw new Error("User not found");
        }

        const existingCart = await db.cartItem.findFirst({
          where: {
            userId: user.id,
            productId: input.productId,
            size: input.size,
          },
        });

        if (!existingCart) {
          throw new Error("Cart item not found");
        }

        if (existingCart.quantity === 1) {
          await db.cartItem.delete({
            where: {
              id: existingCart.id,
              size: input.size,
            },
          });

          return {
            success: true,
            message: "Cart item deleted successfully",
          };
        }

        const updatedCart = await db.cartItem.update({
          where: {
            id: existingCart.id,
            size: input.size,
          },
          data: {
            quantity: existingCart.quantity - 1,
          },
        });

        return {
          success: true,
          cart: updatedCart,
          message: "Cart updated successfully",
        };
      } catch (error) {
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        };
      }
    });
