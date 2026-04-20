import * as z from "zod";

export const ConsultationServiceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  calBookingUrl: z
    .string()
    .min(1, "Booking link is required"),
  description: z.string().min(5, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Price must be a positive number",
    }),
  duration: z
    .string()
    .min(1, "Duration is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Duration must be a positive number",
    }),
});

export type ConsultationServiceFormValues = z.infer<typeof ConsultationServiceSchema>;
