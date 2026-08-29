import { PrismaClient, Role, Gender } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface CreateTeacherInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phone?: string;
}

export class TeacherService {
  static async createTeacher(data: CreateTeacherInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: Role.TEACHER,
        },
      });

      const teacher = await tx.teacher.create({
        data: {
          userId: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          phone: data.phone,
        },
      });

      return teacher;
    });
  }

  static async getAllTeachers() {
    return await prisma.teacher.findMany({
      include: {
        user: { select: { id: true, email: true, role: true } },
        classes: true,
        subjects: true,
      },
    });
  }

  static async getTeacherById(id: string) {
    return await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, role: true } },
        classes: true,
        subjects: true,
      },
    });
  }

  static async deleteTeacher(id: string) {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new Error("Teacher not found");

    return await prisma.user.delete({ where: { id: teacher.userId } });
  }
}