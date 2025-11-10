"use client";

import type React from "react";
import { TeacherLayout } from "@/components/teacher-layout";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherRoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // CHỈ ALLOW TEACHER
      if (role !== "TEACHER") {
        router.push("/403");
        return;
      }
    } catch {
      router.push("/login");
      return;
    }
  }, []); // <-- chạy 1 lần khi layout mount

  return <TeacherLayout>{children}</TeacherLayout>;
}
