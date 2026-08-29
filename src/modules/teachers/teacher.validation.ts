import { z } from "zod";

export const createTeacherSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  phone: z.string().optional(),
});

export const updateTeacherSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
});