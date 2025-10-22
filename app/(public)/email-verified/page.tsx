"use client";

import { Suspense } from "react";
import { EmailVerificationContent } from "@/components/email-verification-content";

export default function VerifyEmailPage() {
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
