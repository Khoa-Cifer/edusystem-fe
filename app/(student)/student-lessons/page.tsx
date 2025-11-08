import type { Metadata } from "next";
import { StudentLessonsList } from "@/components/student-lessons-list";

export const metadata: Metadata = {
  title: "Student Lessons",
  description: "Browse and learn from published lessons",
};

export default function StudentLessonsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Student Lessons</h1>
        <p className="text-muted-foreground">
          Browse and learn from lessons published by teachers
        </p>
      </div>
      <StudentLessonsList />
    </div>
  );
}