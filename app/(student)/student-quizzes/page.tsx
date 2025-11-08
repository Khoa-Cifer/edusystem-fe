import type { Metadata } from "next";
import { StudentQuizzesList } from "@/components/student-quizzes-list";

export const metadata: Metadata = {
  title: "Student Quizzes",
  description: "Practice and take quizzes published by teachers",
};

export default function StudentQuizzesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Student Quizzes</h1>
        <p className="text-muted-foreground">
          Practice and take quizzes published by teachers
        </p>
      </div>
      <StudentQuizzesList />
    </div>
  );
}