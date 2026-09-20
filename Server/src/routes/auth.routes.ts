import { Router } from "express"
import AuthMiddleware from "../middleware/auth.middleware.js"
import { registerController, loginController, logoutController, deleteAccountController, updatePasswordController, otpVerifyController, oauthLoginController } from "../controllers/auth.controller.js";
const authRouter = Router()
authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.post("/otp-verify", otpVerifyController)
authRouter.post("/logout", AuthMiddleware, logoutController)
authRouter.delete("/delete-account", AuthMiddleware, deleteAccountController)
authRouter.put("/update-password", AuthMiddleware, updatePasswordController)
authRouter.post("/oauth-login", oauthLoginController)
export default authRouter