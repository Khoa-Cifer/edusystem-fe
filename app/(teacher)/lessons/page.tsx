"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/axios/http"; // chắc chắn đã có baseURL = backend
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  Search,
  Share2,
  Copy,
  MoreVertical,
  Filter,
} from "lucide-react";
import Link from "next/link";

interface Lesson {
  lessonId: string;
  unitName: string;
  lessonName: string;
  skill: string;
  content: string;
  duration: number;
  orderIndex: number;
  createBy?: string;
  createTime?: string;
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const templates = [
    "Standard Lesson",
    "Lab Activity",
    "Discussion",
    "Assessment",
  ];

  // Fetch lessons on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("Decoded token:", decoded);
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }

    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/lessons", {
          params: { pageNumber: 1, pageSize: 50 },
        });

        const data: Lesson[] = res.data?.result?.data || [];

        setLessons(data);
        setFilteredLessons(data);
      } catch (err: any) {
        console.error(
          "Failed to fetch lessons",
          err?.response || err?.message || err
        );
        setError("Failed to fetch lessons. Check backend URL or network.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Search/filter logic
  useEffect(() => {
    if (!search) {
      setFilteredLessons(lessons);
    } else {
      const lower = search.toLowerCase();
      setFilteredLessons(
        lessons.filter(
          (l) =>
            l.lessonName?.toLowerCase().includes(lower) ||
            l.unitName?.toLowerCase().includes(lower) ||
            l.skill?.toLowerCase().includes(lower) ||
            l.createBy?.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, lessons]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lesson Plans</h1>
          <p className="text-muted-foreground">
            Create and manage your lesson plans
          </p>
        </div>
        <Button asChild>
          <Link href="/lessons/new" aria-label="Create new lesson">
            <Plus className="w-4 h-4 mr-2" />
            New Lesson
          </Link>
        </Button>
      </div>

      {/* Search & Filter */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              className="pl-9 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search lessons"
            />
          </div>
          <Button
            variant="outline"
            className="bg-transparent"
            aria-label="Filter lessons"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Lessons Grid */}
      {loading ? (
        <p className="text-center text-muted-foreground mt-6">
          Loading lessons...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : filteredLessons.length === 0 ? (
        <p className="text-center text-muted-foreground mt-6">
          No lessons found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <Card
              key={lesson.lessonId}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => router.push(`/lessons/${lesson.lessonId}`)}
            >
              <div>
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>

                  {/* More button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="More options"
                    onClick={(e) => e.stopPropagation()} // prevent Card onClick
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                {/* Lesson Info */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {lesson.lessonName}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {lesson.unitName}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {lesson.skill}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{lesson.createTime ?? "N/A"}</span>
                  <span>
                    {lesson.duration ? `${lesson.duration} min` : null}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/lessons/${lesson.lessonId}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Copy lesson">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Share lesson">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Templates Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Lesson Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <Card
              key={template}
              className="p-6 bg-card border-border border-dashed hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
            >
              <Link
                href={`/(teacher)/lessons/new?template=${encodeURIComponent(
                  template
                )}`}
                className="text-center block"
                aria-label={`Create lesson from ${template} template`}
              >
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">{template}</h3>
                <p className="text-xs text-muted-foreground">
                  Use this template
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
