"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { showNotification } from "@/components/notification-helper";
import { Suspense, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { EmailVerificationContent } from "@/components/email-verification-content";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const { confirmVerificationEmail } = useAuth();

  useEffect(() => {
    if (!userId || !token) {
      showNotification.error(
        "Invalid verification link",
        "Missing user or token in the verification link."
      );
      router.push("/");
      return;
    }

    const verifyEmail = async () => {
      try {
        await confirmVerificationEmail(userId, token);
      } catch (error) {
        console.error("Verification error:", error);
        showNotification.error(
          "Verification failed",
          "Your verification link may be invalid or expired."
        );
        router.push("/");
        return;
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading verification data...</p>
        </div>
      }
    >
      <EmailVerificationContent />
    </Suspense>
  );
}
