"use server";

import ProductQuery from "@/components/database/product";
import slugify from "slugify";
const productQuery = new ProductQuery();
function generateId(length) {
  const characters = "ABCDEFGHIJKLabcdefghijklmnop0123456789"; // Characters set
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Random index to pick from the set
    result += characters[randomIndex]; // Add the character at the random index
  }

  return result;
}

export const createProduct = async (data) => {
  data.id = generateId(14);
  data.slug = slugify(data.productName);
  console.log(data);

  const result = await productQuery.saveProductInfo(data);

  if (result.success) {
    return { message: "Product saved successfully", insertId: result.insertId };
  } else {
    return { message: "Failed to save product", error: result.error };
  }
};

export const getAllProduct = async () => {
  try {
    const result = await productQuery.getProducts();

    return result;
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
