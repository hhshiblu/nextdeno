import { getProductBySlug } from "@/action/product";
import React from "react";

async function page({ params, searchparams }) {
  const Product = await getProductBySlug(params.slug);
  console.log(Product);

  return <div>page</div>;
}

export default page;
