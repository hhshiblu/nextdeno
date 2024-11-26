import { getAllProduct } from "@/action/product";
import ProductsTable from "@/components/table/productTable";

export default async function ProductsPage() {
  const Products = await getAllProduct();
  console.log(Products);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <ProductsTable products={Products} />
    </div>
  );
}
