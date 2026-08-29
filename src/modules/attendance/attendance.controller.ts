import { Request, Response } from "express";
import { AttendanceService } from "./attendance.service";

export class AttendanceController {
  static async markAttendance(req: Request, res: Response) {
    try {
      const result = await AttendanceService.markAttendance(req.body);
      res.status(200).json({ success: true, message: "Attendance recorded", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async batchMarkAttendance(req: Request, res: Response) {
    try {
      const result = await AttendanceService.batchMarkAttendance(req.body);
      res.status(200).json({ success: true, message: "Batch attendance recorded", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAttendanceByStudent(req: Request, res: Response) {
    try {
      const result = await AttendanceService.getAttendanceByStudent(req.params.studentId as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAttendanceByDate(req: Request, res: Response) {
    try {
      const date = req.query.date as string;
      if (!date) return res.status(400).json({ success: false, message: "Date query parameter is required" });

      const result = await AttendanceService.getAttendanceByDate(date);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}