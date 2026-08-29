import { z } from "zod";

export const createClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  section: z.string().min(1, "Section is required"),
  teacherId: z.string().uuid("Invalid teacher ID").optional(),
});

export const updateClassSchema = z.object({
  name: z.string().optional(),
  section: z.string().optional(),
  teacherId: z.string().uuid("Invalid teacher ID").nullable().optional(),
});