import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateSubjectInput {
  name: string;
  code: string;
  classId: string;
  teacherId?: string;
}

interface UpdateSubjectInput {
  name?: string;
  code?: string;
  classId?: string;
  teacherId?: string | null;
}

export class SubjectService {
  static async createSubject(data: CreateSubjectInput) {
    const existingCode = await prisma.subject.findUnique({
      where: { code: data.code },
    });

    if (existingCode) {
      throw new Error(`Subject with code '${data.code}' already exists`);
    }

    return await prisma.subject.create({
      data,
      include: {
        class: true,
        teacher: true,
      },
    });
  }

  static async getAllSubjects() {
    return await prisma.subject.findMany({
      include: {
        class: true,
        teacher: true,
        exams: true,
      },
    });
  }

  static async getSubjectById(id: string) {
    return await prisma.subject.findUnique({
      where: { id },
      include: {
        class: true,
        teacher: true,
        exams: true,
      },
    });
  }

  static async updateSubject(id: string, data: UpdateSubjectInput) {
    return await prisma.subject.update({
      where: { id },
      data,
      include: {
        class: true,
        teacher: true,
      },
    });
  }

  static async deleteSubject(id: string) {
    const subject = await prisma.subject.findUnique({ where: { id } });
    if (!subject) throw new Error("Subject not found");

    return await prisma.subject.delete({ where: { id } });
  }
}