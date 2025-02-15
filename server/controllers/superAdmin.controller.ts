import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import SuperAdminModel from "../models/superAdmin.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";

// Register super admin
export const registerSuperAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isSuperAdminExist = await SuperAdminModel.findOne({ email });

      if (isSuperAdminExist) {
        return next(new ErrorHandler("Super Admin already exists", 400));
      }

      const superAdmin = await SuperAdminModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        superAdmin,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Login super admin
export const loginSuperAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const superAdmin = await SuperAdminModel.findOne({ email }).select(
        "+password"
      );

      if (!superAdmin) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      const isPasswordMatch = await superAdmin.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      sendToken(superAdmin, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get super admin dashboard data
export const getSuperAdminDashboard = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superAdminId = req.user?._id;
      const superAdmin = await SuperAdminModel.findById(superAdminId);

      if (!superAdmin) {
        return next(new ErrorHandler("Super Admin not found", 404));
      }

      res.status(200).json({
        success: true,
        superAdmin,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
