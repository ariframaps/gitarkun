import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name must not exceed 255 characters")
    .trim()
    .regex(/^[^\s]+(\s+[^\s]+)*$/, "Product name cannot have trailing spaces"),
  // image: z
  //   .any()
  //   .refine((file) => file?.size <= 5, `Max image size is 5MB.`)
  //   .refine(
  //     (file) => [".jpg", ".jpeg", ".png", "webp"].includes(file?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
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
});

// Contoh validasi
export type AddProductType = z.infer<typeof addProductSchema>;
