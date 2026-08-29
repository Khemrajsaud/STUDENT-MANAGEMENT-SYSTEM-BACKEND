import { z } from "zod";

export const markAttendanceSchema = z.object({
  date: z.string().datetime({ message: "Invalid ISO date string" }),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
  studentId: z.string().uuid("Invalid Student ID"),
});

export const batchAttendanceSchema = z.object({
  date: z.string().datetime({ message: "Invalid ISO date string" }),
  records: z.array(
    z.object({
      studentId: z.string().uuid("Invalid Student ID"),
      status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
    })
  ).min(1, "At least one attendance record is required"),
});