import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { createStudentSchema, updateStudentSchema } from "./student.validation";

export class StudentController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const validated = createStudentSchema.parse(req.body);
      const student = await StudentService.createStudent(validated);
      res.status(201).json({ success: true, data: student });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json({ success: true, data: students });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const student = await StudentService.getStudentById(req.params.id as string);
      res.status(200).json({ success: true, data: student });
    } catch (error: any) {
      res.status(444).json({ success: false, message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const validated = updateStudentSchema.parse(req.body);
      const student = await StudentService.updateStudent(req.params.id as string, validated);
      res.status(200).json({ success: true, data: student });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      await StudentService.deleteStudent(req.params.id as string);
      res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}