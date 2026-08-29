import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateExamInput {
  title: string;
  date: string;
  classId: string;
  subjectId: string;
}

interface UpdateExamInput {
  title?: string;
  date?: string;
  classId?: string;
  subjectId?: string;
}

export class ExamService {
  static async createExam(data: CreateExamInput) {
    // Verify class exists
    const classExists = await prisma.class.findUnique({ where: { id: data.classId } });
    if (!classExists) throw new Error("Class not found");

    // Verify subject exists
    const subjectExists = await prisma.subject.findUnique({ where: { id: data.subjectId } });
    if (!subjectExists) throw new Error("Subject not found");

    return await prisma.exam.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        classId: data.classId,
        subjectId: data.subjectId,
      },
      include: {
        class: true,
        subject: true,
      },
    });
  }

  static async getAllExams() {
    return await prisma.exam.findMany({
      include: {
        class: true,
        subject: true,
        results: true,
      },
      orderBy: { date: "asc" },
    });
  }

  static async getExamById(id: string) {
    return await prisma.exam.findUnique({
      where: { id },
      include: {
        class: true,
        subject: true,
        results: {
          include: { student: true },
        },
      },
    });
  }

  static async updateExam(id: string, data: UpdateExamInput) {
    const exam = await prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new Error("Exam not found");

    return await prisma.exam.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
      include: {
        class: true,
        subject: true,
      },
    });
  }

  static async deleteExam(id: string) {
    const exam = await prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new Error("Exam not found");

    return await prisma.exam.delete({ where: { id } });
  }
}