"use server";

import CategoryData from "@/components/database/category";
import { generateId } from "@/components/generateId/id";
import { revalidatePath } from "next/cache";
import { stringify } from "postcss";
import slugify from "slugify";

const db = new CategoryData();
export const getCategory = async () => {
  try {
    const cate = await db.getAllCategory();
    const category = JSON.parse(JSON.stringify(cate));
    return category ? category : [];
  } catch (error) {
    console.log(error.message);
  }
};

export const addCategory = async (FormData) => {
  const catename = FormData.get("name");
  const formData = { name: catename };

  try {
    formData.id = generateId(14);
    formData.slug = slugify(catename);
    const data = JSON.parse(JSON.stringify(formData));
    const result = await db.createCategory(data);
    if (result.affectedRows == 1) {
      revalidatePath("/admin-dashboard/create-category");
      return { message: "Category created successfully", success: true };
    }
  } catch (error) {
    console.log(error.message, "here ocar");

    return {
      error: error.message,
    };
  }
};

export const updateCategory = async (id, formData) => {
  try {
    formData.slug = slugify(formData.name);
    const result = await db.updateCategoryById(id, formData);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const result = await db.deleteCategoryById(id);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
