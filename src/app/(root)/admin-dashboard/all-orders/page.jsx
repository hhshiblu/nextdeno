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
import { Eye } from "lucide-react";
import Link from "next/link";

const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2023-06-15",
    total: 250,
    status: "Delivered",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2023-06-14",
    total: 180,
    status: "Processing",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    date: "2023-06-13",
    total: 320,
    status: "Shipped",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    date: "2023-06-12",
    total: 150,
    status: "Pending",
  },
  {
    id: "ORD005",
    customer: "Charlie Davis",
    date: "2023-06-11",
    total: 200,
    status: "Delivered",
  },
];

export default function AllOrdersPage() {
  const [orderList, setOrderList] = useState(orders);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" /> Preview
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
