"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { motion } from "motion/react";
import { useFormStatus } from "react-dom";
import { loginAction, loginGoogle, LoginState } from "@/services/authActions";
import { useActionState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full"
      variant={pending ? "loading" : "default"}
    >
      Login
    </Button>
  );
}

function LoginGoogleButton() {
  async function handleGoogleLogin() {
    const res = await loginGoogle();
    if (res?.url) {
      window.location.href = res.url;
    } else if (res?.error) {
      console.error(res.error);
      alert("Google login failed: " + res.error);
    }
  }

  return (
    <Button variant="secondary" className="w-full" onClick={handleGoogleLogin}>
      <FaGoogle />
      Login with Google
    </Button>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState<LoginState, FormData>(
    loginAction,
    { error: null }
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div
        className={cn(
          "flex flex-col justify-center items-center gap-12",
          className
        )}
        {...props}
      >
        <Card
          className="relative overflow-hidden rounded-2xl
                border border-white/15 bg-black/50 backdrop-blur-xl
                shadow-xl w-md
                /* TOP SHINY LINE */
                before:content-[''] before:pointer-events-none
                before:absolute before:inset-x-6 before:top-0 before:h-px
                before:bg-gradient-to-r
                before:from-transparent before:via-white/80 before:to-transparent
                before:opacity-90
                /* BOTTOM SHINY LINE */
                after:content-[''] after:pointer-events-none
                after:absolute after:inset-x-6 after:bottom-0 after:h-px
                after:bg-gradient-to-r
                after:from-transparent after:via-white/80 after:to-transparent
                after:opacity-90"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <LoginGoogleButton />
                </div>
                <div className="relative text-center text-sm flex items-center">
                  <div className="flex-grow border-t border-muted-foreground"></div>
                  <span className="text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-muted-foreground"></div>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="someone@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="/auth/forgot-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      placeholder="********"
                    />
                  </div>
                  {state.error && (
                    <p className="text-sm text-red-500 text-center">
                      {state.error}
                    </p>
                  )}
                  <SubmitButton />
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
