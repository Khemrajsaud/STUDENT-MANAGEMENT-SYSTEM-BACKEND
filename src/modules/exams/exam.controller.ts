import { Request, Response } from "express";
import { ExamService } from "./exam.service";

export class ExamController {
  static async createExam(req: Request, res: Response) {
    try {
      const result = await ExamService.createExam(req.body);
      res.status(201).json({ success: true, message: "Exam created successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllExams(_req: Request, res: Response) {
    try {
      const result = await ExamService.getAllExams();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getExamById(req: Request, res: Response) {
    try {
      const result = await ExamService.getExamById(req.params.id as string);
      if (!result) return res.status(404).json({ success: false, message: "Exam not found" });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateExam(req: Request, res: Response) {
    try {
      const result = await ExamService.updateExam(req.params.id as string, req.body);
      res.status(200).json({ success: true, message: "Exam updated successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteExam(req: Request, res: Response) {
    try {
      await ExamService.deleteExam(req.params.id as string);
      res.status(200).json({ success: true, message: "Exam deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}