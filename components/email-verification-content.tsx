"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function EmailVerificationContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <CheckCircle2 className="w-16 h-16 text-emerald-500 relative" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-2">
            Email Verified!
          </h1>

          {/* Description */}
          <p className="text-slate-400 mb-8 leading-relaxed">
            Your email has been successfully verified. You can now access all
            features of the learning management system.
          </p>

          {/* Info Box */}
          <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 mb-8">
            <p className="text-sm text-slate-300">
              Your account is ready to use. Log in to start creating lessons,
              managing quizzes, and tracking progress.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
            >
              Go to Login
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 bg-slate-700/50 text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
            >
              Back to Home
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-slate-500 mt-6">
            If you didn&apos;t verify this email, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
