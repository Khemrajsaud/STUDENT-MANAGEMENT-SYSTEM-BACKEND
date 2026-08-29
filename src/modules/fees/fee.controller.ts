import { Request, Response } from "express";
import { FeeService } from "./fee.service";

export class FeeController {
  static async createFee(req: Request, res: Response) {
    try {
      const result = await FeeService.createFee(req.body);
      res.status(201).json({ success: true, message: "Fee created successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async batchCreateFees(req: Request, res: Response) {
    try {
      const result = await FeeService.batchCreateFees(req.body);
      res.status(201).json({ success: true, message: "Batch fees generated successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllFees(_req: Request, res: Response) {
    try {
      const result = await FeeService.getAllFees();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getFeesByStudent(req: Request, res: Response) {
    try {
      const result = await FeeService.getFeesByStudent(req.params.studentId as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateFeeStatus(req: Request, res: Response) {
    try {
      const result = await FeeService.updateFeeStatus(req.params.id as string, req.body.status);
      res.status(200).json({ success: true, message: "Fee status updated", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteFee(req: Request, res: Response) {
    try {
      await FeeService.deleteFee(req.params.id as string);
      res.status(200).json({ success: true, message: "Fee record deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}