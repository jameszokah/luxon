
import express from "express";
import { 
  registerSuperAdmin,
  loginSuperAdmin,
  getSuperAdminDashboard
} from "../controllers/superAdmin.controller";
import { authorizeSuperAdmin, isAutheticated } from "../middleware/auth";

const superAdminRouter = express.Router();

superAdminRouter.post("/register-super-admin", registerSuperAdmin);
superAdminRouter.post("/login-super-admin", loginSuperAdmin);
superAdminRouter.get("/super-admin-dashboard", isAutheticated, authorizeSuperAdmin, getSuperAdminDashboard);

export default superAdminRouter;