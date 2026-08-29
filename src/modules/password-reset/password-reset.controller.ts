import { Request, Response } from "express";
import { PasswordResetService } from "./password-reset.service";

export class PasswordResetController {
  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ success: false, message: "Email is required" });

      await PasswordResetService.requestOtp(email);

      res.status(200).json({
        success: true,
        message: "OTP code sent to your Gmail inbox",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "Email, OTP, and newPassword are required" });
      }

      const result = await PasswordResetService.resetPassword(email, otp, newPassword);
      res.status(200).json({ success: true, message: result.message });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}