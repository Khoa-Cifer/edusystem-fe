"use client";

import type React from "react";
import { StudentLayout } from "@/components/student-layout";
import { jwtDecode } from "jwt-decode";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function StudentRoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    if (pathname === "/student-lessons" || pathname === "/student-quizzes") {
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token) as any;
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (role !== "STUDENT") router.push("/403");
    } catch {
      router.push("/login");
    }
  }, [router, pathname]);

  return <StudentLayout>{children}</StudentLayout>;
}
