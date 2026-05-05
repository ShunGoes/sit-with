import { z } from "zod";

export const CampSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  // price: z.union([z.number(), z.string()]).refine(
  //   (val) => {
  //     const parsed = typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val;
  //     return !isNaN(parsed) && parsed >= 0;
  //   },
  //   { message: "Price must be a positive number" }
  // ),
  capacity: z.string().min(1, "Capacity must be at least 1"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  thumbnail: z.union([z.string(), z.any()]).optional(),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "End date must be greater than or equal to start date",
  path: ["endDate"],
});

export type CampFormSchema = z.infer<typeof CampSchema>;


export const CampBookingFormSchema = z.object({
  fullName: z.string().min(3, "Your full name is required"),
  phone: z.string(),
  emergencyName: z.string().min(1, "You are required to provide a name"),
  emergencyPhone: z.string().min(1, "You are required to provide a name"),
  emergencyStatus: z.string().min(1, "You are required to provide a STATUS"),
  dietaryRestrictions: z.string(),
  accommodationPreference: z.string(),
  notes: z.string(),
  partyMembers: z.array(z.object({text: z.string().min(1, "Provide a name")}))
})

export type CampBookingFormSchemaTpe = z.infer<typeof CampBookingFormSchema>