import { PrismaClient, AttendanceStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface MarkAttendanceInput {
  date: string;
  status: AttendanceStatus;
  studentId: string;
}

interface BatchAttendanceInput {
  date: string;
  records: {
    studentId: string;
    status: AttendanceStatus;
  }[];
}

export class AttendanceService {
  // Mark or update attendance for a single student
  static async markAttendance(data: MarkAttendanceInput) {
    const attendanceDate = new Date(data.date);

    return await prisma.attendance.upsert({
      where: {
        studentId_date: {
          studentId: data.studentId,
          date: attendanceDate,
        },
      },
      update: {
        status: data.status,
      },
      create: {
        studentId: data.studentId,
        status: data.status,
        date: attendanceDate,
      },
      include: {
        student: true,
      },
    });
  }

  // Mark attendance for an entire class/group at once
  static async batchMarkAttendance(data: BatchAttendanceInput) {
    const attendanceDate = new Date(data.date);

    const operations = data.records.map((record) =>
      prisma.attendance.upsert({
        where: {
          studentId_date: {
            studentId: record.studentId,
            date: attendanceDate,
          },
        },
        update: {
          status: record.status,
        },
        create: {
          studentId: record.studentId,
          status: record.status,
          date: attendanceDate,
        },
      })
    );

    return await prisma.$transaction(operations);
  }

  static async getAttendanceByStudent(studentId: string) {
    return await prisma.attendance.findMany({
      where: { studentId },
      orderBy: { date: "desc" },
    });
  }

  static async getAttendanceByDate(date: string) {
    const targetDate = new Date(date);
    return await prisma.attendance.findMany({
      where: { date: targetDate },
      include: {
        student: true,
      },
    });
  }
}