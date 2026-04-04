import { z } from "zod";

export const addBlogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  author: z.string().min(2, "Author must be at least 2 characters"),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt must be at most 300 characters"),
  coverImage: z.union([
    z.string().min(1, "Cover image is required"),
    z.instanceof(File, { message: "Cover image is required" }),
  ]),
  content: z
    .string()
    .min(1, "Blog content cannot be empty")
    .refine((val) => val !== "<p></p>", {
      message: "Blog content cannot be empty",
    }),
});

export type AddBlogFormValues = z.infer<typeof addBlogSchema>;
