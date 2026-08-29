import { z } from "zod";

export const createFeeSchema = z.object({
  title: z.string().min(1, "Fee title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  dueDate: z.string().datetime({ message: "Invalid ISO date string" }),
  status: z.enum(["PENDING", "PAID", "OVERDUE"]).optional(),
  studentId: z.string().uuid("Invalid Student ID"),
});

export const batchFeeSchema = z.object({
  title: z.string().min(1, "Fee title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  dueDate: z.string().datetime({ message: "Invalid ISO date string" }),
  studentIds: z.array(z.string().uuid("Invalid Student ID")).min(1, "At least one student ID is required"),
});

export const updateFeeStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "OVERDUE"]),
});