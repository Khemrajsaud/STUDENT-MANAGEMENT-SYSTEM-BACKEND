import { PrismaClient } from "@prisma/client";
import { calculateGrade } from "./result.utils";

const prisma = new PrismaClient();

interface CreateResultInput {
  marksObtained: number;
  totalMarks?: number;
  examId: string;
  studentId: string;
}

interface BatchResultInput {
  examId: string;
  results: {
    studentId: string;
    marksObtained: number;
    totalMarks?: number;
  }[];
}

export class ResultService {
  static async createResult(data: CreateResultInput) {
    const totalMarks = data.totalMarks || 100;
    const grade = calculateGrade(data.marksObtained, totalMarks);

    return await prisma.result.upsert({
      where: {
        examId_studentId: {
          examId: data.examId,
          studentId: data.studentId,
        },
      },
      update: {
        marksObtained: data.marksObtained,
        totalMarks,
        grade,
      },
      create: {
        examId: data.examId,
        studentId: data.studentId,
        marksObtained: data.marksObtained,
        totalMarks,
        grade,
      },
      include: {
        exam: true,
        student: true,
      },
    });
  }

  static async batchCreateResults(data: BatchResultInput) {
    const operations = data.results.map((item) => {
      const totalMarks = item.totalMarks || 100;
      const grade = calculateGrade(item.marksObtained, totalMarks);

      return prisma.result.upsert({
        where: {
          examId_studentId: {
            examId: data.examId,
            studentId: item.studentId,
          },
        },
        update: {
          marksObtained: item.marksObtained,
          totalMarks,
          grade,
        },
        create: {
          examId: data.examId,
          studentId: item.studentId,
          marksObtained: item.marksObtained,
          totalMarks,
          grade,
        },
      });
    });

    return await prisma.$transaction(operations);
  }

  static async getResultsByExam(examId: string) {
    return await prisma.result.findMany({
      where: { examId },
      include: {
        student: true,
        exam: { include: { subject: true } },
      },
    });
  }

  static async getResultsByStudent(studentId: string) {
    return await prisma.result.findMany({
      where: { studentId },
      include: {
        exam: { include: { subject: true, class: true } },
      },
    });
  }

  static async deleteResult(id: string) {
    const result = await prisma.result.findUnique({ where: { id } });
    if (!result) throw new Error("Result record not found");

    return await prisma.result.delete({ where: { id } });
  }
}