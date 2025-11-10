"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, PlayCircle, NotebookText, ChevronLeft, ChevronRight } from "lucide-react";

export default function StudentUnitList() {
  const params = useParams<{ id: string }>();
  const lessonId = params?.id as string;

  const units = [
    { id: "u1", name: "Unit 1: What is JS?" },
    { id: "u2", name: "Unit 2: Variables" },
    { id: "u3", name: "Unit 3: Functions" },
    { id: "u4", name: "Unit 4: Control Flow" },
    { id: "u5", name: "Unit 5: Arrays" },
  ];

  // Khởi tạo: chưa học gì -> 0%
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedUnits, setCompletedUnits] = useState<boolean[]>(Array(units.length).fill(false));

  useEffect(() => {
    try {
      const key = `unit-progress-${lessonId}`;
      const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        // Clamp giá trị để tránh highlight sai
        if (typeof parsed.currentIndex === "number") {
          const ci = Math.max(0, Math.min(units.length - 1, parsed.currentIndex));
          setCurrentIndex(ci);
        }
        if (Array.isArray(parsed.completedUnits)) {
          const arr = parsed.completedUnits.slice(0, units.length);
          const normalized = Array(units.length)
            .fill(false)
            .map((_, i) => Boolean(arr[i]));
          setCompletedUnits(normalized);
        }
      }
    } catch {}
  }, [lessonId]);

  useEffect(() => {
    try {
      const key = `unit-progress-${lessonId}`;
      const payload = { currentIndex, completedUnits };
      if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(payload));
    } catch {}
  }, [lessonId, currentIndex, completedUnits]);
  const completedCount = completedUnits.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / units.length) * 100);

  const handleSelectUnit = (idx: number) => {
    // Chỉ chuyển unit, KHÔNG cập nhật tiến độ
    setCurrentIndex(idx);
  };

  const handlePrev = () => {
    setCurrentIndex((idx) => Math.max(0, idx - 1));
  };

  const handleNext = () => {
    // Khi bấm Next: đánh dấu unit hiện tại là đã học (độc lập), rồi chuyển sang unit kế tiếp
    setCompletedUnits((prev) => {
      const nextArr = [...prev];
      nextArr[currentIndex] = true;
      return nextArr;
    });
    const next = Math.min(units.length - 1, currentIndex + 1);
    setCurrentIndex(next);
  };

  const handleFinish = () => {
    // Ở unit cuối: đánh dấu unit hiện tại đã học. Tổng % phản ánh số unit đã hoàn thành.
    setCompletedUnits((prev) => {
      const nextArr = [...prev];
      nextArr[currentIndex] = true;
      return nextArr;
    });
  };

  const lesson = {
    title: "Lesson 1: Intro to JavaScript",
    unitTitle: "Unit 2: Variables and Data Types",
  };

  const activeUnit = units[currentIndex];

  const notesByUnit: Record<string, string> = {
    u1: "JavaScript là ngôn ngữ lập trình cho web. Nó chạy trên trình duyệt và cũng có thể chạy trên server (Node.js).",
    u2: "Biến (variables) lưu trữ dữ liệu. Sử dụng let/const để khai báo theo chuẩn hiện đại; 'var' có phạm vi khác biệt.",
    u3: "Hàm (functions) là khối lệnh có thể tái sử dụng. Khai báo bằng function hoặc arrow function.",
    u4: "Control flow gồm if/else, switch, vòng lặp for/while... giúp điều khiển luồng thực thi.",
    u5: "Mảng (arrays) lưu danh sách giá trị, có các phương thức map/filter/reduce hỗ trợ xử lý dữ liệu.",
  };

  // Hiển thị nút "Completed" chỉ khi còn đúng 1 unit chưa học và unit hiện tại chưa học
  const remainingCount = units.length - completedCount;
  const showCompleted = remainingCount === 1 && !completedUnits[currentIndex];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student-lessons" aria-label="Back to Lessons">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="secondary">{lesson.unitTitle}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Units</h2>
          <div className="space-y-2">
            {units.map((u, idx) => {
              const isActive = idx === currentIndex;
              const isCompleted = completedUnits[idx];
              return (
                <Button
                  key={u.id}
                  variant={isActive ? "default" : isCompleted ? "secondary" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleSelectUnit(idx)}
                >
                  {u.name}
                </Button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <Tabs defaultValue="video">
            <TabsList>
              <TabsTrigger value="video">
                <PlayCircle className="w-4 h-4 mr-2" />
                Video Player 🎥
              </TabsTrigger>
              <TabsTrigger value="notes">
                <NotebookText className="w-4 h-4 mr-2" />
                Text/Notes 📖
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="mt-4">
              <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <PlayCircle className="w-10 h-10 mr-2" />
                Video placeholder · {activeUnit.name}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                {notesByUnit[activeUnit.id]}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Prev ◀
            </Button>
            {showCompleted ? (
              <Button onClick={handleFinish}>Completed</Button>
            ) : (
              <Button onClick={handleNext}>
                <ChevronRight className="w-4 h-4 mr-2" />
                Next ▶
              </Button>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Progress: {completedCount}/{units.length} Completed</div>
          <div className="text-sm text-muted-foreground">{progressPercent}%</div>
        </div>
        <Progress value={progressPercent} />
      </Card>
    </div>
  );
}