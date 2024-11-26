"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import { createProduct } from "@/action/product";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const DynamicFieldInput = ({ label, items, setItems, placeholder }) => {
  const [newItem, setNewItem] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const addItem = () => {
    if (newItem && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 px-2 py-1 rounded-md flex items-center"
          >
            {item}
            <button
              onClick={() => setItems(items.filter((_, i) => i !== index))}
              className="ml-2 text-red-500"
              aria-label={`Remove ${item}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
        />
        <Button type="button" onClick={addItem}>
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
      </div>
    </div>
  );
};

export default function ProductUploadForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [additionalFields, setAdditionalFields] = useState({
    capacity: false,
    model: false,
  });

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const filledFields = Object.entries(data).reduce((acc, [key, value]) => {
      if (value || (Array.isArray(value) && value.length > 0)) {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Add images to the submissionData (even if empty, they must be included)
    filledFields.images = images;

    // Ensure size and color arrays are passed only if they have values
    if (sizes.length > 0) {
      filledFields.sizes = sizes;
    }
    if (colors.length > 0) {
      filledFields.colors = colors;
    }

    // Keywords must always be passed, make sure it contains values
    if (keywords.length > 0) {
      filledFields.keywords = keywords;
    } else {
      console.error("Keywords are required");
      return;
    }

    const productData = JSON.parse(JSON.stringify(filledFields));
    console.log(productData);

    const result = await createProduct(productData);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
      router.push("/admin-dashboard/all-products");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImages((prevImages) => {
        const newImages = [...prevImages, ...acceptedFiles].slice(0, 6);
        return newImages;
      });
    },
  });

  const toggleField = (field) => {
    setAdditionalFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow"
    >
      <h1 className="text-2xl sm:text-3xl font-bold">Upload New Product</h1>

      {/* Image Upload */}
      <div>
        <Label htmlFor="product-images">Product Images (4-6 images)</Label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 mt-2 text-center cursor-pointer hover:border-gray-400 transition"
        >
          <input
            {...getInputProps()}
            id="product-images"
            aria-describedby="image-upload-description"
          />
          <p id="image-upload-description">
            Drag 'n' drop images here, or click to select files
          </p>
        </div>
        {images.length < 4 && (
          <p className="text-red-500 mt-2" role="alert">
            Please upload at least 4 images
          </p>
        )}
        {images.length > 6 && (
          <p className="text-red-500 mt-2" role="alert">
            You can upload a maximum of 6 images
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Product image ${index + 1}`}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
              />
              <button
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                aria-label={`Remove image ${index + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Controller
          name="productName"
          control={control}
          rules={{ required: "Product name is required" }}
          render={({ field }) => (
            <Input
              id="productName"
              placeholder="Enter product name"
              {...field}
            />
          )}
        />
        {errors.productName && (
          <p className="text-red-500 mt-1">{errors.productName.message}</p>
        )}
      </div>

      {/* Description with Rich Text Editor */}
      <div>
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className="mt-2"
              {...field}
            />
          )}
        />
        {errors.description && (
          <p className="text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label>Category</Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 mt-1">{errors.category.message}</p>
          )}
        </div>
        {/* Add similar Controller wrappers for subcategory and child category */}
      </div>

      {/* Keywords (Mandatory) */}
      <DynamicFieldInput
        label="Keywords (Mandatory)"
        items={keywords}
        setItems={setKeywords}
        placeholder="Enter a keyword"
      />
      {keywords.length === 0 && (
        <p className="text-red-500 mt-2">Please add at least one keyword</p>
      )}

      {/* Essential Information */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Essential Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              }}
              render={({ field }) => (
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  {...field}
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500 mt-1">{errors.price.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="oldPrice"> Old Price</Label>
            <Controller
              name="oldPrice"
              control={control}
              // rules={{
              //   required: "Price is required",
              //   min: { value: 0, message: "Price must be positive" },
              // }}
              render={({ field }) => (
                <Input
                  id="oldPrice"
                  type="number"
                  placeholder="Enter old Price"
                  {...field}
                />
              )}
            />
            {/* {errors.price && (
              <p className="text-red-500 mt-1">{errors.price.message}</p>
            )} */}
          </div>
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Controller
              name="sku"
              control={control}
              rules={{ required: "SKU is required" }}
              render={({ field }) => (
                <Input id="sku" placeholder="Enter SKU" {...field} />
              )}
            />
            {errors.sku && (
              <p className="text-red-500 mt-1">{errors.sku.message}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="stock">Stock Quantity</Label>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "Stock quantity is required",
              min: { value: 0, message: "Stock must be non-negative" },
            }}
            render={({ field }) => (
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                {...field}
              />
            )}
          />
          {errors.stock && (
            <p className="text-red-500 mt-1">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
          className="w-full sm:w-auto"
        >
          {showAdditionalInfo ? "Hide" : "Show"} Additional Information
        </Button>
        {showAdditionalInfo && (
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Input id="brand" placeholder="Enter brand name" {...field} />
                )}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Input
                    id="weight"
                    placeholder="Enter product weight"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Controller
                name="dimensions"
                control={control}
                render={({ field }) => (
                  <Input
                    id="dimensions"
                    placeholder="Enter product dimensions"
                    {...field}
                  />
                )}
              />
            </div>
            <DynamicFieldInput
              label="Colors"
              items={colors}
              setItems={setColors}
              placeholder="Enter a color"
            />
            <DynamicFieldInput
              label="Sizes"
              items={sizes}
              setItems={setSizes}
              placeholder="Enter a size"
            />
          </div>
        )}
      </div>

      {/* Predefined Product Information Fields */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Product Information
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleField("capacity")}
            className="w-full sm:w-auto"
          >
            Capacity
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleField("model")}
            className="w-full sm:w-auto"
          >
            Model
          </Button>
        </div>
        <div className="space-y-4">
          {additionalFields.capacity && (
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <Input
                    id="capacity"
                    placeholder="Enter capacity"
                    {...field}
                  />
                )}
              />
            </div>
          )}
          {additionalFields.model && (
            <div>
              <Label htmlFor="model">Model</Label>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <Input id="model" placeholder="Enter model" {...field} />
                )}
              />
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Upload Product
      </Button>
    </form>
  );
}
