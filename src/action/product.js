"use server";

import ProductQuery from "@/components/database/product";
import { generateId } from "@/components/generateId/id";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
const productQuery = new ProductQuery();

export const createProduct = async (data) => {
  data.id = generateId(14);
  data.slug = slugify(data.productName);
  delete data.images;
  data.sellerId = "CD92H9Db8cJd0o";
  const result = await productQuery.saveProductInfo(data);

  if (result.success) {
    return { success: true, message: "Product saved successfully" };
  } else {
    return { message: "Failed to save product", error: result.error };
  }
};

export const getAllProduct = async () => {
  try {
    const result = await productQuery.getProducts();
    const products = JSON.parse(JSON.stringify(result));
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const result = await productQuery.getProductBySlug(slug);

    return result;
  } catch (error) {
    console.log(error);
  }
};

//update status
export const updateStatus = async (id) => {
  try {
    const result = await productQuery.updateProductStatus(id);
    if (result) {
      revalidatePath("/admin-dashboard/all-products");
      return { success: true, message: "product status update successfully" };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//delete multiple users
export const DeleteProducts = async (idArray) => {
  try {
    const result = await productQuery.deleteProductsByIds(idArray);
    if (result) {
      revalidatePath("/admin-dashboard/all-products");
      return { success: true, message: "Products Deleted successfully" };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//delete single product
export const DeleteProduct = async (id) => {
  try {
    const result = await productQuery.deleteProductById(id);

    if (result) {
      revalidatePath("/admin-dashboard/all-products");
      return { success: true, message: "product  deleted successfully" };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
