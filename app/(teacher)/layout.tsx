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
       const decoded = jwtDecode(token) as any;
       const role =
         decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
       if (role !== "STUDENT") router.push("/403");
     } catch {
       router.push("/login");
     }
   }, [router]);
 
   return <TeacherLayout>{children}</TeacherLayout>;
}
