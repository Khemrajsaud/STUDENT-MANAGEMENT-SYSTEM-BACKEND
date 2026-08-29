import { z } from "zod";

export const createResultSchema = z.object({
  marksObtained: z.number().min(0, "Marks cannot be negative"),
  totalMarks: z.number().positive("Total marks must be greater than 0").default(100),
  examId: z.string().uuid("Invalid Exam ID"),
  studentId: z.string().uuid("Invalid Student ID"),
});

export const batchResultSchema = z.object({
  examId: z.string().uuid("Invalid Exam ID"),
  results: z.array(
    z.object({
      studentId: z.string().uuid("Invalid Student ID"),
      marksObtained: z.number().min(0),
      totalMarks: z.number().positive().default(100),
    })
  ).min(1, "At least one result record is required"),
});

export const updateResultSchema = z.object({
  marksObtained: z.number().min(0).optional(),
  totalMarks: z.number().positive().optional(),
});