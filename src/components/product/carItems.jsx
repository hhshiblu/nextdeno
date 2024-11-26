"use client";
import { useState } from "react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCartProduct,
} from "@/action/cart";
import { useToast } from "@/hooks/use-toast";

export default function Cart({ cart }) {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: 199.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 89.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
    },
    {
      id: 3,
      name: "Smartwatch",
      price: 159.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const handleIncrease = async (item) => {
    const result = await increaseQuantity(item.userId, item.productId);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    }
  };

  const handleDecrease = async (item) => {
    const result = await decreaseQuantity(item.userId, item.productId);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    }
  };

  const removeItem = async (item) => {
    const result = await removeCartProduct(item.userId, item.productId);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = cart.totalPrice * 0.1; // Assuming 10% tax
  const total = cart.totalPrice + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button className="mt-6">Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart?.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-gray-500">
                        {item.price} * {item.quantity} = {item.totalPrice}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDecrease(item)}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleIncrease(item)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
