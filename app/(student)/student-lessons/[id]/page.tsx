"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowLeft } from "lucide-react";
import api from "@/axios/http";

interface LessonDetail {
  lessonId?: string;
  lessonName?: string;
  unitName?: string;
  skill?: string;
  content?: string;
  duration?: number;
  status?: string;
  createBy?: string;
  sections?: Array<{ title?: string; body?: string }>;
  [key: string]: any;
}

export default function LessonDetailPage() {
  const params = useParams<{ id: string }>();
  const lessonId = params?.id as string;

  const [data, setData] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!lessonId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/lessoncontent/get/${lessonId}`, {
          // Mark this request to skip auth redirect so we can show UI message
          headers: { "x-skip-auth-redirect": "true" },
        });
        // API expected shape: ResponseDto<LessonDetail>
        const result = res?.data?.result ?? res?.data;
        setData(result ?? null);
      } catch (e: any) {
        const status = e?.response?.status;
        const msg = e?.response?.data?.message || "Failed to load lesson content";
        if (status === 401 || status === 403) {
          setError("Bạn cần đăng nhập hoặc có quyền phù hợp để xem bài học này.");
        } else {
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [lessonId]);

  const getSkillColor = (skill?: string) => {
    switch (skill) {
      case "Speaking":
        return "bg-green-100 text-green-800";
      case "Listening":
        return "bg-blue-100 text-blue-800";
      case "Reading":
        return "bg-yellow-100 text-yellow-800";
      case "Writing":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student-lessons" aria-label="Back to Lessons">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Lesson Detail</h1>
        </div>
      </div>

      {loading && (
        <Card className="p-6">
          <div className="text-muted-foreground">Loading lesson content...</div>
        </Card>
      )}

      {error && (
        <Card className="p-6 border-red-200">
          <div className="text-red-600">{error}</div>
        </Card>
      )}

      {!loading && !error && data && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{data.lessonName ?? "Lesson"}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                    {data.unitName && (
                      <Badge variant="secondary">{data.unitName}</Badge>
                    )}
                    {data.skill && (
                      <Badge className={getSkillColor(data.skill)}>{data.skill}</Badge>
                    )}
                    {typeof data.duration === "number" && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{data.duration} min</span>
                      </div>
                    )}
                    {data.status && (
                      <Badge variant="outline">{data.status}</Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="#content">Start</Link>
              </Button>
            </div>
            {data.content && (
              <p className="mt-4 text-muted-foreground whitespace-pre-line">{data.content}</p>
            )}
          </Card>

          {Array.isArray(data.sections) && data.sections.length > 0 && (
            <div id="content" className="space-y-4">
              {data.sections.map((sec, idx) => (
                <Card key={idx} className="p-6">
                  {sec.title && (
                    <h3 className="text-lg font-semibold mb-2">{sec.title}</h3>
                  )}
                  {sec.body && (
                    <div className="text-muted-foreground whitespace-pre-line">{sec.body}</div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Fallback: show raw data if structure is unknown */}
          {!data.sections && !data.content && (
            <Card className="p-6">
              <div className="text-sm text-muted-foreground">
                No structured content available. Here is the raw data:
              </div>
              <pre className="mt-3 text-xs overflow-auto bg-muted/30 p-4 rounded">
                {JSON.stringify(data, null, 2)}
              </pre>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}