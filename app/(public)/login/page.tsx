"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSonner } from "@/hooks/use-sonner";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showToast } = useSonner();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("warning", {
        title: "Email or password not found",
        description: "Please input email and password",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await login(email, password);
      if (response.isSuccess) {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;
        if (token) {
          try {
            const decoded = jwtDecode<any>(token);
            const roleClaim =
              decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ];
            const role = Array.isArray(roleClaim) ? roleClaim[0] : roleClaim;

            if (role === "ADMIN") {
              router.push("/admin/users");
              return;
            }
            if (role === "TEACHER") {
              router.push("/lessons");
              return;
            }
            if (role === "STUDENT") {
              router.push("/");
              return;
            }
          } catch {}
        }
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card border-border">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="button"
            onClick={handleLogin}
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
