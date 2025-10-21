"use client";

import { AdminLayout } from "@/components/admin-layout";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function AdminRoleLayout({
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
      if (role !== "ADMIN") router.push("/403");
    } catch {
      router.push("/login");
    }
  }, [router]);

  return <AdminLayout>{children}</AdminLayout>;
}
