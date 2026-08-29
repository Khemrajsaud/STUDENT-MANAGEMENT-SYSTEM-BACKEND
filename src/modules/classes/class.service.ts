import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateClassInput {
  name: string;
  section: string;
  teacherId?: string;
}

interface UpdateClassInput {
  name?: string;
  section?: string;
  teacherId?: string | null;
}

export class ClassService {
  static async createClass(data: CreateClassInput) {
    const existingClass = await prisma.class.findUnique({
      where: {
        name_section: {
          name: data.name,
          section: data.section,
        },
      },
    });

    if (existingClass) {
      throw new Error(`Class ${data.name} section ${data.section} already exists`);
    }

    return await prisma.class.create({
      data,
      include: {
        teacher: true,
      },
    });
  }

  static async getAllClasses() {
    return await prisma.class.findMany({
      include: {
        teacher: true,
        students: true,
        subjects: true,
      },
    });
  }

  static async getClassById(id: string) {
    return await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: true,
        students: true,
        subjects: true,
        exams: true,
      },
    });
  }

  static async updateClass(id: string, data: UpdateClassInput) {
    return await prisma.class.update({
      where: { id },
      data,
      include: {
        teacher: true,
      },
    });
  }

  static async deleteClass(id: string) {
    const existingClass = await prisma.class.findUnique({ where: { id } });
    if (!existingClass) throw new Error("Class not found");

    return await prisma.class.delete({ where: { id } });
  }
}