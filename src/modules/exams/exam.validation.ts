import { z } from "zod";

export const createExamSchema = z.object({
  title: z.string().min(1, "Exam title is required"),
  date: z.string().datetime({ message: "Invalid ISO date string" }),
  classId: z.string().uuid("Invalid Class ID"),
  subjectId: z.string().uuid("Invalid Subject ID"),
});

export const updateExamSchema = z.object({
  title: z.string().optional(),
  date: z.string().datetime({ message: "Invalid ISO date string" }).optional(),
  classId: z.string().uuid("Invalid Class ID").optional(),
  subjectId: z.string().uuid("Invalid Subject ID").optional(),
});