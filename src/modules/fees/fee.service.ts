import { PrismaClient, FeeStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateFeeInput {
  title: string;
  amount: number;
  dueDate: string;
  status?: FeeStatus;
  studentId: string;
}

interface BatchFeeInput {
  title: string;
  amount: number;
  dueDate: string;
  studentIds: string[];
}


export class FeeService {
  static async createFee(data: CreateFeeInput) {
    const student = await prisma.student.findUnique({ where: { id: data.studentId } });
    if (!student) throw new Error("Student not found");

    return await prisma.fee.create({
      data: {
        title: data.title,
        amount: data.amount,
        dueDate: new Date(data.dueDate),
        status: data.status || FeeStatus.PENDING,
        studentId: data.studentId,
      },
      include: {
        student: true,
      },
    });
  }

  static async batchCreateFees(data: BatchFeeInput) {
    const dueDate = new Date(data.dueDate);

    const feeRecords = data.studentIds.map((studentId) => ({
      title: data.title,
      amount: data.amount,
      dueDate,
      studentId,
      status: FeeStatus.PENDING,
    }));

    return await prisma.fee.createMany({
      data: feeRecords,
    });
  }

  static async getAllFees() {
    return await prisma.fee.findMany({
      include: {
        student: true,
      },
      orderBy: { dueDate: "asc" },
    });
  }

  static async getFeesByStudent(studentId: string) {
    return await prisma.fee.findMany({
      where: { studentId },
      orderBy: { dueDate: "asc" },
    });
  }

  static async updateFeeStatus(id: string, status: FeeStatus) {
    const fee = await prisma.fee.findUnique({ where: { id } });
    if (!fee) throw new Error("Fee record not found");

    return await prisma.fee.update({
      where: { id },
      data: { status },
      include: { student: true },
    });
  }

  static async deleteFee(id: string) {
    const fee = await prisma.fee.findUnique({ where: { id } });
    if (!fee) throw new Error("Fee record not found");

    return await prisma.fee.delete({ where: { id } });
  }
}