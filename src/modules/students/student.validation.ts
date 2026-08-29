import { optional, z } from "zod";

export const createStudentSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dob: z.string().optional(),
  classId: z.string().uuid("Invalid class ID format").optional(),
});

export const updateStudentSchema = createStudentSchema.partial().omit({
  email: true,
  password: true,
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;