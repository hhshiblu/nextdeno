"use server";

import WishlistQuery from "@/components/database/wishlist";
import { revalidatePath } from "next/cache";

const wishlistQuery = new WishlistQuery();

// Action to add a product to the wishlist
export const addToWishlist = async (userId, productId) => {
  try {
    const result = await wishlistQuery.addToWishlist(userId, productId);

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to add to wishlist",
      };
    }

    revalidatePath("/wishlist"); // Revalidate the wishlist page
    return { success: true, message: "Item added to wishlist successfully" };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { success: false, error: error.message };
  }
};

// Action to get wishlist items
export const getWishlist = async (userId) => {
  try {
    const wishlist = await wishlistQuery.getWishlist(userId);
    return wishlist;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { success: false, error: error.message };
  }
};

// Action to remove a product from the wishlist
export const removeFromWishlist = async (userId, productId) => {
  try {
    const result = await wishlistQuery.removeFromWishlist(userId, productId);

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to remove from wishlist",
      };
    }

    revalidatePath("/wishlist"); // Revalidate the wishlist page
    return {
      success: true,
      message: "Item removed from wishlist successfully",
    };
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return { success: false, error: error.message };
  }
};
