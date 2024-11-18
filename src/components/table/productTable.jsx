"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     category: "Electronics",
//     price: 199.99,
//     oldPrice: 249.99,
//     stock: 50,
//     soldOut: false,
//     soldQuantity: 150,
//     createdAt: new Date("2023-05-10"),
//     updatedAt: new Date("2023-06-15"),
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     category: "Clothing",
//     price: 49.99,
//     oldPrice: null,
//     stock: 100,
//     soldOut: false,
//     soldQuantity: 75,
//     createdAt: new Date("2023-04-20"),
//     updatedAt: new Date("2023-06-01"),
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     category: "Home & Garden",
//     price: 79.99,
//     oldPrice: 89.99,
//     stock: 0,
//     soldOut: true,
//     soldQuantity: 200,
//     createdAt: new Date("2023-03-15"),
//     updatedAt: new Date("2023-05-20"),
//   },
//   {
//     id: 4,
//     name: "Product 4",
//     category: "Electronics",
//     price: 299.99,
//     oldPrice: 349.99,
//     stock: 20,
//     soldOut: false,
//     soldQuantity: 80,
//     createdAt: new Date("2023-06-01"),
//     updatedAt: new Date("2023-06-10"),
//   },
//   {
//     id: 5,
//     name: "Product 5",
//     category: "Books",
//     price: 14.99,
//     oldPrice: null,
//     stock: 200,
//     soldOut: false,
//     soldQuantity: 300,
//     createdAt: new Date("2023-05-25"),
//     updatedAt: new Date("2023-06-05"),
//   },
// ];

export default function ProductsTable({ products }) {
  console.log(products);

  const [productList, setProductList] = useState(products);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleDelete = (id) => {
    setProductList(productList.filter((product) => product.id !== id));
    setSelectedProducts(
      selectedProducts.filter((productId) => productId !== id)
    );
  };

  const handleReview = (id) => {
    // Implement review functionality
    console.log(`Reviewing product with id: ${id}`);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(productList.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (checked, productId) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const formatDate = (date) => {
    return format(date, "dd/MMM/yyyy");
  };

  return (
    <div>
      <div className="mb-4">
        <Checkbox
          checked={selectedProducts.length === productList.length}
          onCheckedChange={handleSelectAll}
          id="select-all"
        />
        <label htmlFor="select-all" className="ml-2">
          Select All
        </label>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Old Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sold Quantity</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={(checked) =>
                    handleSelectProduct(checked, product.id)
                  }
                />
              </TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              {/* <TableCell>
                {product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : "-"}
              </TableCell> */}
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.soldOut ? "Sold Out" : "In Stock"}</TableCell>
              <TableCell>{product.soldQuantity}</TableCell>
              <TableCell>{formatDate(product.created_at)}</TableCell>
              {/* <TableCell>{formatDate(product.updatedAt)}</TableCell> */}
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Link
                      href={`/product/${product.slug}`}
                      className="flex gap-1"
                    >
                      <Eye className="w-4 h-4 mr-1" /> Preview
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
