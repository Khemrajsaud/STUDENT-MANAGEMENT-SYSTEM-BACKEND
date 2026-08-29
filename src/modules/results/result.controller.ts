import { Request, Response } from "express";
import { ResultService } from "./result.service";

export class ResultController {
  static async createResult(req: Request, res: Response) {
    try {
      const result = await ResultService.createResult(req.body);
      res.status(201).json({ success: true, message: "Result saved successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async batchCreateResults(req: Request, res: Response) {
    try {
      const result = await ResultService.batchCreateResults(req.body);
      res.status(201).json({ success: true, message: "Batch results saved successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getResultsByExam(req: Request, res: Response) {
    try {
      const result = await ResultService.getResultsByExam(req.params.examId as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getResultsByStudent(req: Request, res: Response) {
    try {
      const result = await ResultService.getResultsByStudent(req.params.studentId as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteResult(req: Request, res: Response) {
    try {
      await ResultService.deleteResult(req.params.id as string);
      res.status(200).json({ success: true, message: "Result deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}