import { z } from "zod";

export const campTierSchema = z.object({
  label: z.string().min(1, "Label is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price must be a positive number"),
  inclusions: z
    .array(z.object({ text: z.string().min(1, "Inclusion name is required") }))
    .min(1, "Add at least one inclusion"),
  seatsPerUnit: z.number().min(1, "Seats per unit must be at least 1"),
  maxUnits: z.number().nullable(),
  order: z.number().min(0, "Order must be a non-negative number"),
  isFeatured: z.boolean(),
});

export type CampTierFormSchema = z.infer<typeof campTierSchema>;
