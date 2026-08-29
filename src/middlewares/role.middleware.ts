import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized access" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false, 
        message: "Forbidden: You do not have permission to perform this action" 
      });
      return;
    }

    next();
  };
};