"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const orderDetails = {
  id: "ORD001",
  customer: "John Doe",
  date: "2023-06-15",
  total: 250,
  status: "Delivered",
  items: [
    { id: 1, name: "Product A", quantity: 2, price: 50 },
    { id: 2, name: "Product B", quantity: 1, price: 150 },
  ],
  shippingAddress: "123 Main St, Anytown, AT 12345",
  paymentMethod: "Credit Card",
};

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrderPreviewPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch the order details based on the ID
    // For this example, we're using the static orderDetails
    setOrder(orderDetails);
  }, [params.id]);

  const handleStatusUpdate = (newStatus) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: newStatus,
    }));
    // In a real application, you would also send this update to your backend
    console.log(`Order status updated to: ${newStatus}`);
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Details: {order.id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Customer:</strong> {order.customer}
            </p>
            <p>
              <strong>Date:</strong> {order.date}
            </p>
            <p>
              <strong>Total:</strong> ${order.total}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <div className="mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Update Status <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statusOptions.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onSelect={() => handleStatusUpdate(status)}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Address:</strong> {order.shippingAddress}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${item.quantity * item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
