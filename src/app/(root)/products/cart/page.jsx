import { getCartItems } from "@/action/cart";
import Cart from "@/components/product/carItems";
import React from "react";

async function page() {
  const cart = await getCartItems();

  return (
    <div>
      <Cart cart={cart} />
    </div>
  );
}

export default page;
