import { z } from "zod"

export const nameSchema = z.string().trim().min(1, "Name is required").max(100, "Name must be at most 100 characters long")

export const emailSchema = z.string().trim().email("Invalid email address").min(1).max(255)

export const passwordSchema = z.string()
   .trim()
   .min(8)
   .max(12)
   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
   .regex(/[0-9]/, "Password must contain at least one number")
   .regex(/[\W_]/, "Password must contain at least one special character")
export const photoUrlSchema = z.string().url("Invalid URL").optional()

export const registerSchema = z.object({
   name: nameSchema,
   email: emailSchema,
   password: passwordSchema
})

export const loginSchema = z.object({
   email: emailSchema,
   password: passwordSchema
})
export const oauthSchema = z.object({
   name: nameSchema,
   email: emailSchema,
   photoUrl: photoUrlSchema
})
export const updatePasswordSchema = z.object({
   oldPassword: passwordSchema,
   newPassword: passwordSchema
})

export type registerSchemaType = z.infer<typeof registerSchema>
export type loginSchemaType = z.infer<typeof loginSchema>
export type oauthSchemaType = z.infer<typeof oauthSchema>
export type updatePasswordType = z.infer<typeof updatePasswordSchema>