import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../../utils/sendEmail";

const prisma = new PrismaClient();

export class PasswordResetService {
  static async requestOtp(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User with this email does not exist");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.otp.deleteMany({ where: { userId: user.id } });
    await prisma.otp.create({
      data: {
        code,
        expiresAt,
        userId: user.id,
      },
    });

    await sendOtpEmail(email, code);

    return { message: "OTP code sent to your email" };
  }

  static async resetPassword(email: string, code: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const otpRecord = await prisma.otp.findFirst({
      where: { userId: user.id, code },
    });

    if (!otpRecord) throw new Error("Invalid OTP code");

    if (new Date() > otpRecord.expiresAt) {
      await prisma.otp.delete({ where: { id: otpRecord.id } });
      throw new Error("OTP code has expired. Please request a new one");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.otp.deleteMany({ where: { userId: user.id } }),
    ]);

    return { message: "Password updated successfully" };
  }
}