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
import { AUTH_ROUTES } from '@/routes/common/routePath'
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRegisterMutation } from "@/api/auth/authApi"
import { generatePasswordStrenght } from '@/utils/hleper'
import { OAuth } from './OAuth'
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(12)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),

})
type FormValues = z.infer<typeof schema>;

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });


  // const passwordValue = form.watch("password");
  // const passwordStrength = generatePasswordStrenght(passwordValue || "");
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate()
  const submitHandler = (values: FormValues) => {
    register(values)
      .then(() => {
        form.reset()
        toast.success("Sign up successful");
        navigate(AUTH_ROUTES.SIGN_IN)

      }).catch((error) => {
        console.log(error);
        toast.error(error.data?.message || "Failed to sign up");
      })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Fill information below to sign up
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const strength = generatePasswordStrenght(field.value || "")
              return (
                < FormItem >
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••"
                      {...field} />


                  </FormControl>
                  {field.value && (
                    <p
                      className={`text-sm font-medium mt-1 ${strength === "weak"
                        ? "text-red-500"
                        : strength === "fair"
                          ? "text-yellow-500"
                          : "text-green-600"
                        }`}
                    >
                      Password strength: {strength.toUpperCase()}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )
            }}
          />


          <Button type="submit" className="w-full">
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            Sign up
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-[var(--bg-color)] dark:bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <OAuth />
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to={AUTH_ROUTES.SIGN_IN}
            className="underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form >
  )
}

export default SignUpForm
