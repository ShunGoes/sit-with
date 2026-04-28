import { z } from "zod";

export const testimonialSchema = z.object({
  campId: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  quote: z.string().min(1, "Quote is required"),
  isPublished: z.boolean(),
  avatar: z.any().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
