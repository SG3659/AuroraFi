import { Router } from "express"
import AuthMiddleware from "../middleware/auth.middleware.js"
import { getUserProfileController, updateUserProfileController } from "../controllers/user.controller.js";
import { upload } from "../config/cloudnary.config.js";
const userRouter = Router()
userRouter.get("/profile", AuthMiddleware, getUserProfileController)
userRouter.put("/update", AuthMiddleware, upload.single("profilePicture"), updateUserProfileController)
export default userRouter
