import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
const reportRouter = Router();
import { getAllReposrtController, updateReportSettingController, generateReportController } from "../controllers/report.controller.js";

reportRouter.get("/all", AuthMiddleware, getAllReposrtController)
reportRouter.get("/generate", AuthMiddleware, generateReportController)

reportRouter.put("/update-setting", AuthMiddleware, updateReportSettingController)
export default reportRouter