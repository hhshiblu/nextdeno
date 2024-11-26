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
import { Trash2, Eye, HandPlatter } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { DeleteProduct, DeleteProducts, updateStatus } from "@/action/product";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleDelete = async (id) => {
    const result = await DeleteProduct(id);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    }
  };
  const deletemultiple = async () => {
    const result = await DeleteProducts(selectedProducts);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    }
  };
  const handelStatus = async (id) => {
    const result = await updateStatus(id);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(products.map((product) => product.id));
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
      {/* <div className="mb-4">
        <Checkbox
          checked={selectedProducts.length === products.length}
          onCheckedChange={handleSelectAll}
          id="select-all"
        />
        <label htmlFor="select-all" className="ml-2">
          Select All
        </label>
      </div> */}
      <div className="flex justify-between">
        <div className="mb-4">
          <Checkbox
            checked={selectedProducts.length === products.length}
            onCheckedChange={handleSelectAll}
            id="select-all"
          />
          <label htmlFor="select-all" className="ml-2">
            Select All
          </label>
        </div>
        {selectedProducts.length > 0 && (
          <div className="">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deletemultiple()}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        )}
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

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={(checked) =>
                    handleSelectProduct(checked, product.id)
                  }
                />
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.oldPrice}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.active ? "True" : "False"}</TableCell>
              <TableCell>{product.soldQuantity}</TableCell>
              <TableCell>{formatDate(product.created_at)}</TableCell>
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
                    variant="outline"
                    size="sm"
                    onClick={() => handelStatus(product.id)}
                  >
                    <HandPlatter className="w-4 h-4 mr-1" /> Update status
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
