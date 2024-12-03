import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name must not exceed 255 characters")
    .trim()
    .regex(/^[^\s]+(\s+[^\s]+)*$/, "Product name cannot have trailing spaces"),
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

  category: z.enum(
    ["Movie Song", "Original Arrangement", "Classic", "Pop", "Anime"],
    {
      errorMap: () => ({
        message: "Product category must be one of the predefined values",
      }),
    }
  ),
  link: z.string().url("Product link must be a valid URL"),
});

// Contoh validasi
export type AddProductType = z.infer<typeof addProductSchema>;
