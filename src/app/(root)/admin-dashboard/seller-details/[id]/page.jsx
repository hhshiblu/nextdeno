import { getSeller } from "@/action/seller";
import SellerDetails from "@/components/seller/sellerDetails";
import React from "react";

async function page({ params }) {
  const seller = await getSeller(params.id);

  return (
    <div>
      <SellerDetails user={seller} />
    </div>
  );
}

export default page;
