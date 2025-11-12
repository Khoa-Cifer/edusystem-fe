"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserApi } from "@/axios/user";
import { useAuth } from "@/context/auth-context";
import type { UserProfile } from "@/interfaces/user";

export default function StudentProfile() {
  const { authenticatedUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(authenticatedUser);
  const [loading, setLoading] = useState<boolean>(!authenticatedUser);
  const [error, setError] = useState<string>("");

  const displayName = profile?.fullName || "Student";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await UserApi.getUserInfo();
      setProfile(res.result);
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Không thể tải thông tin hồ sơ. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authenticatedUser) {
      fetchProfile();
    }
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Hồ sơ cá nhân</h1>
        <Button onClick={fetchProfile} disabled={loading}>
          {loading ? "Đang tải..." : "Làm mới"}
        </Button>
      </div>

      {error && (
        <Card className="p-4 mb-6 bg-destructive/10 border-destructive">
          <p className="text-destructive text-sm">{error}</p>
        </Card>
      )}

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl font-semibold">{profile?.fullName || "—"}</div>
            <div className="text-sm text-muted-foreground">{profile?.userName || "—"}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile?.roles || []).map((r) => (
                <Badge key={r} variant="outline">
                  {r}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{profile?.email || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Số điện thoại</span><span>{profile?.phoneNumber || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Địa chỉ</span><span>{profile?.address || "—"}</span></div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Ngày sinh</span><span>{profile?.birthDate || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Giới tính</span><span>{profile?.gender || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tuổi</span><span>{profile?.age ?? "—"}</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}