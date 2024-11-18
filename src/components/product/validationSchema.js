// validationSchema.js
import * as yup from "yup";

export const productUploadSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  sku: yup.string().required("SKU is required"),
  stock: yup
    .number()
    .typeError("Stock quantity must be a number")
    .min(0, "Stock must be non-negative")
    .required("Stock quantity is required"),
  brand: yup.string().notRequired(),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be positive")
    .notRequired(),
});
