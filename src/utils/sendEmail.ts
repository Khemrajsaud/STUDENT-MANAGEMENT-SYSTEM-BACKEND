import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (to: string, otp: string): Promise<void> => {
  const mailOptions = {
    from: `"School Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Use the OTP code below to proceed:</p>
        <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};