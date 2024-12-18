"use server";

import UserData from "@/components/database/user";
import { generateId } from "@/components/generateId/id";
import slugify from "slugify";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
const db = new UserData();
//create user
export const createUser = async (formData) => {
  try {
    formData.id = generateId(14);
    formData.slug = slugify(formData.name);
    const pass = await bcrypt.hash(formData.password, 10);
    formData.password = pass;

    const result = await db.createUser(formData);

    if (result.affectedRows == 1) {
      revalidatePath("/admin-dashboard/create-user");
      return { message: "user created successfully", success: true };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//get all
export const getUsers = async () => {
  try {
    const result = await db.getAllUsers();
    const users = JSON.parse(JSON.stringify(result));
    return users;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
// filter by month and count of user
export const getUsersGrowth = async () => {
  try {
    const result = await db.getMonthlyUserGrowth();
    const users = JSON.parse(JSON.stringify(result));
    return users;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//get user by id
export const getUserById = async (id) => {
  try {
    const result = await db.getUserById(id);
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
    const result = await db.toggleUserStatus(id);

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
export const deleteusers = async (idArray) => {
  try {
    const result = await db.deleteUsersByIds(idArray);
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
export const deleteuser = async (id) => {
  try {
    const result = await db.deleteUserById(id);

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
