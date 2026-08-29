import { Request, Response } from "express";
import { TeacherService } from "./teacher.service";

export class TeacherController {
  static async createTeacher(req: Request, res: Response) {
    try {
      const result = await TeacherService.createTeacher(req.body);
      res.status(201).json({ success: true, message: "Teacher created successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllTeachers(_req: Request, res: Response) {
    try {
      const result = await TeacherService.getAllTeachers();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getTeacherById(req: Request, res: Response) {
    try {
      const result = await TeacherService.getTeacherById(req.params.id as string);
      if (!result) return res.status(404).json({ success: false, message: "Teacher not found" });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteTeacher(req: Request, res: Response) {
    try {
      await TeacherService.deleteTeacher(req.params.id as string);
      res.status(200).json({ success: true, message: "Teacher deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}