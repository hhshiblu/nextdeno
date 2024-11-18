import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SellerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    password: "",
    phoneNumber: "",
    email: "",
    division: "",
    zilla: "",
    upazilla: "",
    streetAddress: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key])
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Seller Signup</CardTitle>
        <CardDescription>
          Create your seller account to start selling.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter your shop name"
              />
              {errors.shopName && (
                <p className="text-sm text-red-500">{errors.shopName}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="division">Division</Label>
              <Select
                name="division"
                onValueChange={(value) => handleSelectChange("division", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                  {/* Add more divisions as needed */}
                </SelectContent>
              </Select>
              {errors.division && (
                <p className="text-sm text-red-500">{errors.division}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zilla">Zilla</Label>
              <Input
                id="zilla"
                name="zilla"
                value={formData.zilla}
                onChange={handleChange}
                placeholder="Enter zilla"
              />
              {errors.zilla && (
                <p className="text-sm text-red-500">{errors.zilla}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="upazilla">Upazilla</Label>
              <Input
                id="upazilla"
                name="upazilla"
                value={formData.upazilla}
                onChange={handleChange}
                placeholder="Enter upazilla"
              />
              {errors.upazilla && (
                <p className="text-sm text-red-500">{errors.upazilla}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="Enter street address"
              />
              {errors.streetAddress && (
                <p className="text-sm text-red-500">{errors.streetAddress}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category to Sell</Label>
            <Select
              name="category"
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                {/* Add more categories as needed */}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign Up as Seller
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
