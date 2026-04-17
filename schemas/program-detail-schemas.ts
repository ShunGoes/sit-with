/**
 * Zod schemas and TypeScript types for the Program Detail page.
 *
 * Architecture:
 * - These schemas are used inside modal-scoped useForm instances (NOT a page-level form).
 * - addWeekSchema validates the Add Week modal fields.
 *   learningObjectives are managed via local useState inside the modal, not through Zod.
 * - addModuleSchema validates the Add Module modal fields.
 * - DraftWeek / DraftModule types represent the local page-level state shape.
 */

import * as z from "zod";

// ---------- Add Week Modal Schema ----------
export const addWeekSchema = z.object({
  weekTitle: z.string().min(1, "Week title is required"),
  description: z.string().optional(),
});

export type AddWeekFormData = z.infer<typeof addWeekSchema>;

// ---------- Add Module Modal Schema ----------
export const addModuleSchema = z.object({
  moduleTitle: z.string().min(1, "Module title is required"),
  description: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  duration: z.string().min(1, "Duration is required"),
  contentLink: z.string().min(1, "Content link is required"),
  embedCode: z.string().optional(),
});

export type AddModuleFormData = z.infer<typeof addModuleSchema>;

// ---------- Local draft types (page-level useState) ----------
export type DraftModule = {
  title: string;
  description?: string;
  type: string;
  duration: string;
  contentUrl: string;
  embedCode?: string;
};

export type DraftWeek = {
  id: string; // local-only uuid for React keying — not sent to API
  weekTitle: string;
  description?: string;
  learningObjectives: string[];
  modules: DraftModule[];
};
