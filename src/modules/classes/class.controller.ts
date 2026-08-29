import { Request, Response } from "express";
import { ClassService } from "./class.service";

export class ClassController {
  static async createClass(req: Request, res: Response) {
    try {
      const result = await ClassService.createClass(req.body);
      res.status(201).json({ success: true, message: "Class created successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllClasses(_req: Request, res: Response) {
    try {
      const result = await ClassService.getAllClasses();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getClassById(req: Request, res: Response) {
    try {
      const result = await ClassService.getClassById(req.params.id as string);
      if (!result) return res.status(404).json({ success: false, message: "Class not found" });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateClass(req: Request, res: Response) {
    try {
      const result = await ClassService.updateClass(req.params.id as string, req.body);
      res.status(200).json({ success: true, message: "Class updated successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteClass(req: Request, res: Response) {
    try {
      await ClassService.deleteClass(req.params.id as string);
      res.status(200).json({ success: true, message: "Class deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}