import { Router } from "express"
import AuthMiddleware from "../middleware/auth.middleware.js"
import { registerController, loginController, refreshTokenController, logoutController, deleteAccountController } from "../controllers/auth.controller.js";
const authRouter = Router()
authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.post("/refresh", refreshTokenController)
authRouter.post("/logout", AuthMiddleware, logoutController)
authRouter.delete("/delete-account", AuthMiddleware, deleteAccountController)
export default authRouter