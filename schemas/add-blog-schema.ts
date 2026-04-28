import { z } from "zod";

export const addBlogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(2, "Author must be at least 2 characters"),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt must be at most 300 characters"),
  coverImage: z.union([
    z.string().min(1, "Cover image is required"),
    z.instanceof(File, { message: "Cover image is required" }),
  ]),
  body: z
    .string()
    .min(1, "Blog content cannot be empty")
    .refine((val) => val !== "<p></p>", {
      message: "Blog content cannot be empty",
    }),
  category: z.string().min(1, "Category is required"),
  readTimeMinutes: z.union([z.number(), z.string()]).refine(
    (val) => {
      const parsed = typeof val === "string" ? parseInt(val, 10) : val;
      return !isNaN(parsed) && parsed >= 1;
    },
    { message: "Read time is required and must be at least 1 minute" }
  ),
  isPublished: z.boolean(),
});

export type AddBlogFormValues = z.infer<typeof addBlogSchema>;
