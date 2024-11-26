"use server";

import CartQuery from "@/components/database/cart";
import { generateId } from "@/components/generateId/id";
import { revalidatePath } from "next/cache";

const cartQuery = new CartQuery();

// Action to add an item to the cart

export const addToCart = async ({ productId, quantity }) => {
  try {
    const id = generateId(14);
    const userId = "FAA89I0h97i8HB";
    const result = await cartQuery.addToCart({
      id,
      userId,
      productId,
      quantity,
    });
    if (result.success) {
      return { success: true, message: result.message };
    } else {
      return {
        success: false,
        message: "Failed to update cart",
        error: result.error,
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Action to get all cart items
export const getCartItems = async () => {
  try {
    const userId = "FAA89I0h97i8HB";
    const { items, totalPrice } = await cartQuery.getCartItems(userId);

    return { items, totalPrice };
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return { success: false, error: error.message };
  }
};

// Action to get the cart length
export const getCartLength = async (userId) => {
  try {
    const { uniqueItems, totalQuantity } = await cartQuery.getCartLength(
      userId
    );

    return { uniqueItems, totalQuantity };
  } catch (error) {
    console.error("Error fetching cart length:", error);
    return { success: false, error: error.message };
  }
};

// Decrease quantity
export const decreaseQuantity = async (userId, productId) => {
  try {
    const result = await cartQuery.decreaseQuantity(userId, productId);
    if (result.success) {
      revalidatePath("/products/cart"); // Revalidate the cart page in real time
      return { success: true, message: "Quantity decreased" };
    }
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    return { success: false, error: error.message };
  }
};

// Increase quantity
export const increaseQuantity = async (userId, productId) => {
  try {
    const result = await cartQuery.increaseQuantity(userId, productId);
    if (result.success) {
      revalidatePath("/products/cart"); // Revalidate the cart page in real time
      return { success: true, message: "Quantity increased" };
    }
  } catch (error) {
    console.error("Error increasing quantity:", error);
    return { success: false, error: error.message };
  }
};

// Remove product from cart
export const removeCartProduct = async (userId, productId) => {
  try {
    const result = await cartQuery.removeCartProduct(userId, productId);

    if (result) {
      revalidatePath("/products/cart");
      return {
        success: true,
        message: "Product removed from cart successfully",
      };
    } else {
      return { success: false, message: "Product not found in cart" };
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return { success: false, error: error.message };
  }
};
