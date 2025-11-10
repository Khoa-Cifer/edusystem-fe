"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, BookOpen, Clock, User, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/axios/http";
interface ApiLesson {
  lessonId: string;
  unitName: string;
  lessonName: string;
  skill: string;
  content: string;
  duration: number;
  orderIndex: number;
  status: string;
  createBy: string;
  createTime: string;
  updateBy: string | null;
  updateTime: string | null;
}

export function StudentLessonsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [lessons, setLessons] = useState<ApiLesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get("/lesson/get/all", {
          params: { pageNumber: 1, pageSize: 10 },
        });
        const data: ApiLesson[] = res.data.result?.data ?? [];
        setLessons(data);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load lessons");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const skills = ["all", ...Array.from(new Set(lessons.map((l) => l.skill)))];
  const units = ["all", ...Array.from(new Set(lessons.map((l) => l.unitName)))];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === "all" || lesson.skill === selectedSkill;
    const matchesUnit = selectedUnit === "all" || lesson.unitName === selectedUnit;
    return matchesSearch && matchesSkill && matchesUnit;
  });

  const getSkillColor = (skill: string) => {
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
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Skill
            </label>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill" />
              </SelectTrigger>
              <SelectContent>
                {skills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill === "all" ? "All Skills" : skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Unit</label>
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit === "all" ? "All Units" : unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="col-span-full text-center text-muted-foreground">Loading lessons...</div>
        )}
        {error && (
          <div className="col-span-full text-center text-red-600">{error}</div>
        )}
        {!isLoading && !error && filteredLessons.map((lesson) => (
          <Card key={lesson.lessonId} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <BookOpen className="h-8 w-8 text-primary" />
                <Badge className={getSkillColor(lesson.skill)}>
                  {lesson.skill}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold line-clamp-2">
                  {lesson.lessonName}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {lesson.content}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Unit:</span>
                  <Badge variant="secondary">{lesson.unitName}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <Badge variant="outline">{lesson.status}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{lesson.createBy}</span>
                </div>
              <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration} min</span>
                </div>
              </div>

              <Button className="w-full" variant="default" asChild>
                <Link href={`/student-lessons/${lesson.lessonId}/unit`}>
                  Start Learning
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {!isLoading && !error && filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}