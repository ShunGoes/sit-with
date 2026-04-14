import * as z from "zod";

export const ModuleSchema = z.object({
  moduleTitle: z.string().min(1, "Module title is required"),
  description: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  duration: z.string().min(1, "Duration is required"),
  contentLink: z.string().url("Must be a valid URL"),
  embedCode: z.string().optional(),
});

export const WeekSchema = z.object({
  weekTitle: z.string().min(1, "Week title is required"),
  description: z.string().optional(),
  learningObjectives: z.array(z.string()),
  modules: z.array(ModuleSchema),
});

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
  programType: z.enum(["student", "professional", "leader"]),
  duration: z.string().min(1, "Enter a duration"),
  hoursPerWeek: z.string().min(1, "Enter hours per week"),
  date: z.string().min(1, "Date is required"),
  learningObjectives: z.array(z.object({ text: z.string().min(1, "Objective is required") })).optional(),
  facilitatorName: z.string().min(1, "Facilitator name is required"),
  facilitatorEmail: z.string().email("Valid email is required"),
  weeks: z.array(WeekSchema).optional(),
});

export type ModuleFormData = z.infer<typeof ModuleSchema>;
export type WeekFormData = z.infer<typeof WeekSchema>;
export type ProgramFormSchema = z.infer<typeof ProgramSchema>;
