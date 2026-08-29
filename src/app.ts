import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import studentRoutes from "./modules/students/student.routes";
import teacherRoutes from "./modules/teachers/teacher.routes";
import { classRoutes } from "./modules/classes/class.routes";
import { subjectRoutes } from "./modules/subjects/subject.routes";
import  attendanceRoutes  from "./modules/attendance/attendance.routes";
import { examRoutes } from "./modules/exams/exam.routes";
import { resultRoutes } from "./modules/results/result.routes";
import { feeRoutes } from "./modules/fees/fee.routes";
import { passwordResetRoutes } from "./modules/password-reset/password-reset.routes";




const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/password-reset", passwordResetRoutes);



export default app;