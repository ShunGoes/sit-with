import * as z from "zod";

export const ProgramSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 50 characters"),
  description: z.string().min(2, "Enter a description"),
  price: z.string().min(1, "Price is required"),
  thumbnail: z.union([
    z.string().min(1, "thumbnail is required"),
    z.instanceof(File, { message: "Thumbnail is required" }),
  ]),
  programType: z.enum(["students", "professionals", "leaders"]),
  duration: z.string("Enter a duration"),
});

export type ProgramFormSchema = z.infer<typeof ProgramSchema>;
