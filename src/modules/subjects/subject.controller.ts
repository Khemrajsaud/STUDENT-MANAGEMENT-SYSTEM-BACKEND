import { Request, Response } from "express";
import { SubjectService } from "./subject.service";

export class SubjectController {
  static async createSubject(req: Request, res: Response) {
    try {
      const result = await SubjectService.createSubject(req.body);
      res.status(201).json({ success: true, message: "Subject created successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllSubjects(_req: Request, res: Response) {
    try {
      const result = await SubjectService.getAllSubjects();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getSubjectById(req: Request, res: Response) {
    try {
      const result = await SubjectService.getSubjectById(req.params.id as string);
      if (!result) return res.status(404).json({ success: false, message: "Subject not found" });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateSubject(req: Request, res: Response) {
    try {
      const result = await SubjectService.updateSubject(req.params.id as string, req.body);
      res.status(200).json({ success: true, message: "Subject updated successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteSubject(req: Request, res: Response) {
    try {
      await SubjectService.deleteSubject(req.params.id as string);
      res.status(200).json({ success: true, message: "Subject deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}