// "use client";

// import { useState } from "react";
// import { CreditCard, ShoppingBag } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";

// export default function Checkout() {
//   const [cartItems] = useState([
//     { id: 1, name: "Premium Leather Jacket", price: 199.99, quantity: 1 },
//     { id: 2, name: "Wireless Headphones", price: 89.99, quantity: 2 },
//     { id: 3, name: "Smartwatch", price: 159.99, quantity: 1 },
//   ]);

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const tax = subtotal * 0.1; // Assuming 10% tax
//   const shipping = 10; // Flat rate shipping
//   const total = subtotal + tax + shipping;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-xl font-semibold mb-4">
//                 Shipping Information
//               </h2>
//               <div className="grid gap-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="firstName">First Name</Label>
//                     <Input id="firstName" placeholder="John" />
//                   </div>
//                   <div>
//                     <Label htmlFor="lastName">Last Name</Label>
//                     <Input id="lastName" placeholder="Doe" />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="address">Address</Label>
//                   <Input id="address" placeholder="123 Main St" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="city">City</Label>
//                     <Input id="city" placeholder="New York" />
//                   </div>
//                   <div>
//                     <Label htmlFor="postalCode">Postal Code</Label>
//                     <Input id="postalCode" placeholder="10001" />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="country">Country</Label>
//                   <Select>
//                     <SelectTrigger id="country">
//                       <SelectValue placeholder="Select a country" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="us">United States</SelectItem>
//                       <SelectItem value="ca">Canada</SelectItem>
//                       <SelectItem value="uk">United Kingdom</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-xl font-semibold mb-4">
//                 Payment Information
//               </h2>
//               <div className="grid gap-4">
//                 <div>
//                   <Label htmlFor="cardName">Name on Card</Label>
//                   <Input id="cardName" placeholder="John Doe" />
//                 </div>
//                 <div>
//                   <Label htmlFor="cardNumber">Card Number</Label>
//                   <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="expiration">Expiration Date</Label>
//                     <Input id="expiration" placeholder="MM/YY" />
//                   </div>
//                   <div>
//                     <Label htmlFor="cvv">CVV</Label>
//                     <Input id="cvv" placeholder="123" />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <div>
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//               <div className="space-y-4">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex justify-between">
//                     <span>
//                       {item.name} x {item.quantity}
//                     </span>
//                     <span>${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//                 <Separator />
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>${shipping.toFixed(2)}</span>
//                 </div>
//                 <Separator />
//                 <div className="flex justify-between font-semibold">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="p-6">
//               <Button className="w-full" size="lg">
//                 <ShoppingBag className="mr-2 h-4 w-4" /> Place Order
//               </Button>
//             </CardFooter>
//           </Card>
//           <div className="mt-6">
//             <h3 className="font-semibold mb-2">We Accept</h3>
//             <div className="flex space-x-2">
//               <CreditCard className="h-6 w-6" />
//               <CreditCard className="h-6 w-6" />
//               <CreditCard className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
