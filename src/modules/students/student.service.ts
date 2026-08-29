import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { CreateStudentInput, UpdateStudentInput } from "./student.validation";

const prisma = new PrismaClient();

export class StudentService {
  // Create Student (Handles User creation + Student profile creation in transaction)
  static async createStudent(data: CreateStudentInput) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) throw new Error("Email already in use");

    const existingRoll = await prisma.student.findUnique({ where: { rollNumber: data.rollNumber } });
    if (existingRoll) throw new Error("Roll number already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: "STUDENT",
        },
      });

      const student = await tx.student.create({
        data: {
          userId: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          rollNumber: data.rollNumber,
          gender: data.gender,
          dob: data.dob ? new Date(data.dob) : null,
          classId: data.classId,
        },
        include: { user: { select: { email: true, role: true } }, class: true },
      });

      return student;
    });
  }

  // Get All Students
  static async getAllStudents() {
    return await prisma.student.findMany({
      include: {
        user: { select: { email: true, role: true } },
        class: true,
      },
    });
  }

  // Get Student By ID
  static async getStudentById(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { user: { select: { email: true, role: true } }, class: true },
    });
    if (!student) throw new Error("Student not found");
    return student;
  }

  // Update Student Profile
  static async updateStudent(id: string, data: UpdateStudentInput) {
    await this.getStudentById(id);

    return await prisma.student.update({
      where: { id },
      data: {
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.rollNumber && { rollNumber: data.rollNumber }),
        ...(data.gender && { gender: data.gender }),
        ...(data.dob && { dob: new Date(data.dob) }),
        ...(data.classId && { classId: data.classId }),
      },
      include: { user: { select: { email: true } }, class: true },
    });
  }

  // Delete Student (Cascades to delete User record)
  static async deleteStudent(id: string) {
    const student = await this.getStudentById(id);
    return await prisma.user.delete({ where: { id: student.userId } });
  }
}