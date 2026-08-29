import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  code: z.string().min(1, "Subject code is required"),
  classId: z.string().uuid("Invalid Class ID"),
  teacherId: z.string().uuid("Invalid Teacher ID").optional(),
});

export const updateSubjectSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  classId: z.string().uuid().optional(),
  teacherId: z.string().uuid().nullable().optional(),
});