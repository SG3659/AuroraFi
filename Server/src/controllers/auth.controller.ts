import { type Request, type Response } from "express"
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { registerSchema, loginSchema, updatePasswordSchema,oauthSchema } from "../validators/auth.validator.js";
import { otpSchema } from "../validators/otp.validator.js";
import { registerService, loginService, logoutService, deleteAccountService, updatePasswordService, otpVerifyService, oauthLoginService } from "../services/auth.service.js";
export const registerController = asyncHandler(
   async (req: Request, res: Response) => {
      const body = registerSchema.parse(req.body);
      const result = await registerService(body)
      return res.status(HTTPSTATUS.CREATED).json({
         message: "User registered successfully",
         data: result,
      });
   })


export const loginController = asyncHandler(async (req: Request, res: Response) => {
   const data = loginSchema.parse(req.body);
   await loginService(data)

   return res
      .status(HTTPSTATUS.OK)

      .json({ message: "User logged & email sent successfully" });
})
export const otpVerifyController = asyncHandler(async (req: Request, res: Response) => {
   const data = otpSchema.parse(req.body);
   const options: {
      httpOnly: boolean,
      secure: boolean,
      sameSite: "none"
   } = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   }
   const { accessToken,
      expiresAt, user, reportSetting } = await otpVerifyService(data)
   return res
      .status(HTTPSTATUS.OK)
      .cookie("access", accessToken, options)
      .json({
         message: "User logged in successfully", accessToken, expiresAt, user, reportSetting
      });
})

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
   const userId = req.auth._id;
   await logoutService(userId);
   const options: {
      httpOnly: boolean,
      secure: boolean
   } = {
      httpOnly: true,
      secure: true
   }
   return res
      .status(HTTPSTATUS.OK)
      .clearCookie("refresh", options)
      .clearCookie("access", options)
      .json({ message: "User logged out successfully" })
})


export const deleteAccountController = asyncHandler(async (req: Request, res: Response) => {
   const userId = req.auth._id;
   await deleteAccountService(userId)
   return res.status(HTTPSTATUS.OK).json({ message: "Account deleted successfully" })
})

export const updatePasswordController = asyncHandler(async (req: Request, res: Response) => {
   const userId = req.auth._id;
   const body = updatePasswordSchema.parse(req.body);
   await updatePasswordService(userId, body)
   return res.status(HTTPSTATUS.OK).json({ message: "Password updated successfully" })
})

export const oauthLoginController = asyncHandler(async (req: Request, res: Response) => {
   const data = oauthSchema.parse(req.body);
    const options: {
      httpOnly: boolean,
      secure: boolean,
      sameSite: "none"
   } = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   }
   const {  accessToken, expiresAt, user, reportSetting } = await oauthLoginService(data)
   return res
      .status(HTTPSTATUS.OK)
      .cookie("access", accessToken, options)
      .json({
         message: "User logged in successfully", accessToken,  expiresAt, user, reportSetting
      });
})