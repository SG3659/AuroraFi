import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from '@/routes/common/routePath'
import { useLoginMutation, useOtpVerifyMutation, } from "@/api/auth/authApi"
import { toast } from "sonner"
import { setCredentials } from '@/redux/slice/authSlice'
import { useDispatch } from 'react-redux'
import { OAuth } from './OAuth'

const loginSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string().min(8, "Password must be at least 8 characters").max(12)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
})

const otpSchema = z.object({
   otp: z.string().length(6),
})

type LoginFormValues = z.infer<typeof loginSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;




const SignInForm = () => {
   const navigate = useNavigate()
   const [isOTPRequested, setIsOTPRequested] = useState(false);
   const dispatch = useDispatch()
   const [email, setEmail] = useState("   ");
   // const [isOTPRequested, setIsOTPRequested] = useState(true);
   // const [email, setEmail] = useState("sahilgupta43384@gmail.com");

   const loginForm = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: ""
      }
   });

   const otpForm = useForm<OtpFormValues>({
      resolver: zodResolver(otpSchema),
      defaultValues: {
         otp: ""
      }

   });

   const [login, { isLoading: isLoginLoading }] = useLoginMutation();
   const [otpVerify, { isLoading: isOtpVerifying }] = useOtpVerifyMutation();

   const onLoginSubmit = async (values: LoginFormValues) => {
      try {
         setEmail(values.email);
         await login(values).unwrap();
         otpForm.reset({
            otp: "",
         });
         setIsOTPRequested(true);
         // otpForm.setValue("email", values.email);
         toast.success("Please check your email for the OTP.");
      } catch (error) {
         const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Failed to send OTP";
         toast.error(errorMessage);
      }
   };


   const onOtpSubmit = async (values: OtpFormValues) => {
      try {
         const result = await otpVerify({ email, otp: values.otp }).unwrap();
         toast.success("Login successful!");
         dispatch(setCredentials(result))
         setTimeout(() => {
            navigate(PROTECTED_ROUTES.OVERVIEW)
         }, 1000)

      } catch (error) {
         const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Invalid OTP";
         toast.error(errorMessage);
      }
   };

   const handleBackToLogin = () => {
      setIsOTPRequested(false);
      loginForm.reset();
      otpForm.reset();
   };

   return (
      <>
         {!isOTPRequested ? (
            <Form {...loginForm} key='login-form'>
               <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className={cn("flex flex-col gap-6")}
               >
                  <div className="flex flex-col items-center gap-2 text-center">
                     <h1 className="text-2xl font-bold">Login to your account</h1>
                     <p className="text-balance text-sm text-muted-foreground">
                        Enter your email and password to login to your account
                     </p>
                  </div>
                  <div className="grid gap-6">
                     <FormField
                        control={loginForm.control}
                        name="email"
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="!font-normal">Email</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="your.email@example.com"
                                    type="email"
                                    disabled={isLoginLoading}
                                    {...field}

                                 />

                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="!font-normal">Password</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="••••••••"
                                    type="password"
                                    disabled={isLoginLoading}
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type="submit" className="w-full" disabled={isLoginLoading}>
                        {isLoginLoading ? "Sending OTP..." : "Send OTP"}
                     </Button>
                     <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-[var(--bg-color)] dark:bg-background px-2 text-muted-foreground">
                           Or continue with
                        </span>
                     </div>
                     <OAuth />
                  </div>
                  <div className="text-center text-sm">
                     Don&apos;t have an account?{" "}
                     <Link
                        to={AUTH_ROUTES.SIGN_UP}
                        className="underline underline-offset-4"
                     >
                        Sign up
                     </Link>
                  </div>
               </form>
            </Form >
         ) : (
            <Form {...otpForm} key='otp-form'>
               <form
                  onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                  className={cn("flex flex-col gap-6")}
               >
                  <div className="flex flex-col items-center gap-2 text-center">
                     <h1 className="text-2xl font-bold">Verify OTP</h1>
                     <p className="text-balance text-sm text-muted-foreground">
                        Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
                     </p>
                  </div>
                  <div className="grid gap-6">
                     <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>OTP</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="000000"
                                    maxLength={6}
                                    disabled={isOtpVerifying}
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type="submit" className="w-full" disabled={isOtpVerifying}>
                        {isOtpVerifying ? "Verifying..." : "Verify OTP"}
                     </Button>
                     <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={handleBackToLogin}
                        disabled={isOtpVerifying}
                     >
                        Back to Login
                     </Button>
                  </div>
               </form>
            </Form>
         )}
      </>
   )
}

export default SignInForm