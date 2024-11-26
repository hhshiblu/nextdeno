"use server";

import SellerData from "@/components/database/seller";
import { generateId } from "@/components/generateId/id";
import slugify from "slugify";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
const db = new SellerData();

export const createSeller = async (formData) => {
  try {
    formData.id = generateId(14);
    formData.slug = slugify(formData.name);
    const pass = await bcrypt.hash(formData.password, 10);
    formData.password = pass;
    const result = await db.createSeller(formData);
    console.log(result);

    if (result.affectedRows == 1) {
      revalidatePath("/admin-dashboard/create-user");
      return { message: "user created successfully", success: true };
    }
  } catch (error) {
    return error.message;
  }
};

export const getSellers = async () => {
  try {
    const result = await db.getAllSellers();
    const sellers = JSON.parse(JSON.stringify(result));
    return sellers;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
// filter by month and count of user
export const getSellersGrowth = async () => {
  try {
    const result = await db.getMonthlySellerGrowth();
    const users = JSON.parse(JSON.stringify(result));
    return users;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//get user by id
export const getSeller = async (id) => {
  try {
    const result = await db.getSellerById(id);
    const users = JSON.parse(JSON.stringify(result));
    return users;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//update status
export const updateStatus = async (id) => {
  try {
    const result = await db.toggleSellerStatus(id);

    if (result) {
      revalidatePath("/admin-dashboard/all-users");
      return { success: true, message: "User status update successfully" };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//delete multiple users
export const deleteSellers = async (idArray) => {
  try {
    const result = await db.deleteSellersByIds(idArray);
    if (result) {
      revalidatePath("/admin-dashboard/all-users");
      return { success: true, message: "User status update successfully" };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//delete single user
export const deleteSeller = async (id) => {
  try {
    const result = await db.deleteSellerById(id);

    if (result) {
      revalidatePath("/admin-dashboard/all-users");
      return { success: true, message: "User  deleted successfully" };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
