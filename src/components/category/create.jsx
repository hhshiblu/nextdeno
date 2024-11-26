"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addCategory } from "@/action/category";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add Category"}
    </Button>
  );
}

export default function AddCategory() {
  const { toast } = useToast();
  // async function handleSubmit(formData, event) {
  //   const result = await addCategory(formData);

  //   if (result.error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: result.error,
  //     });
  //   } else if (result.success) {
  //     toast({
  //       title: "Success",
  //       description: result.message,
  //     });
  //     event.target.reset();
  //     formData.set("name", "");
  //   }
  // }
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target); // Create FormData from the form element

    const result = await addCategory(formData);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.success) {
      toast({
        variant: "success",
        title: "Success",
        description: result.message,
      });

      // Reset the form
      event.target.reset();
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Category Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            className="w-full"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
