import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name must not exceed 255 characters")
    .trim()
    .regex(/^[^\s]+(\s+[^\s]+)*$/, "Product name cannot have trailing spaces"),
  image: z
    .string()
    .min(1, "Product image is required")
    .url("Image must be a valid URL"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long")
    .trim(),
  price: z.number().min(0, "Price must be a positive number"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"], {
    errorMap: () => ({
      message: "Difficulty level must be Beginner, Intermediate, or Advanced",
    }),
  }),
  category: z.string().min(1, "Product category is required").trim(),
  link: z.string().url("Product link must be a valid URL"),
  sellerId: z.string().min(1, "Seller ID is required"),
  isDeleted: z.boolean().optional(),
});

// Contoh validasi
export type AddProductType = z.infer<typeof addProductSchema>;
