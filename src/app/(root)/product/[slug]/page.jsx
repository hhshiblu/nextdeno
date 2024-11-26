// import { getProductBySlug } from "@/action/product";
// import React from "react";

// async function page({ params }) {
//   const Product = await getProductBySlug(params.slug);
//   console.log(Product);

//   return <div>page</div>;
// }

// export default page;
"use client";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addToCart } from "@/action/cart";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { toast } = useToast();
  const product = {
    name: "Premium Leather Jacket",
    price: 199.99,
    rating: 4.5,
    reviews: 128,
    description:
      "Experience luxury and style with our Premium Leather Jacket. Crafted from high-quality, genuine leather, this jacket offers both durability and a timeless look. Perfect for any occasion, it features a sleek design with multiple pockets and a comfortable fit.",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specs: [
      { name: "Material", value: "Genuine Leather" },
      { name: "Closure", value: "Zipper" },
      { name: "Pockets", value: "4 external, 2 internal" },
      { name: "Lining", value: "100% Polyester" },
      { name: "Care", value: "Professional leather clean" },
    ],
  };

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const AddCart = async () => {
    const result = await addToCart({
      productId: "m3gDk1nKbJ4bAH",
      quantity: quantity,
    });
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={product.images[activeImage]}
              alt={`${product.name} - Image ${activeImage + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex space-x-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                  index === activeImage ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button className="flex-1" onClick={AddCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Card>
                <CardContent className="pt-6">
                  <p>{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {product.specs.map((spec, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="font-semibold">{spec.name}:</span>
                        <span>{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <p>Customer reviews will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
