import type { Metadata } from "next";
// import { StudentQuizzesList } from "@/components/student-quizzes-list";
// Note: Temporarily hard-fix the quizzes page and avoid API calls.
// To enable again, use StudentQuizzesList as before.
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import TakeQuiz from "@/components/quiz/TakeQuiz";

export const metadata: Metadata = {
  title: "Student Quizzes",
  description: "Practice and take quizzes published by teachers",
};

export default function StudentQuizzesPage({ searchParams }: { searchParams?: { id?: string } }) {
  const staticQuizzes = [
    {
      id: "quiz-001",
      title: "JavaScript Basics",
      description: "Test core JS: variables, functions, conditionals.",
      questionsCount: 15,
      durationMinutes: 20,
      status: "Open",
      updatedAt: "2025-11-12",
      grade: 85,
    },
    {
      id: "quiz-002",
      title: "HTML & CSS Fundamentals",
      description: "Review semantic HTML and CSS layouts: flexbox, grid.",
      questionsCount: 20,
      durationMinutes: 30,
      status: "Upcoming",
      updatedAt: "2025-11-10",
    },
    {
      id: "quiz-003",
      title: "React Essentials",
      description: "Props, state, basic hooks, and list rendering.",
      questionsCount: 12,
      durationMinutes: 25,
      status: "Open",
      updatedAt: "2025-11-08",
      grade: 92,
    },
  ];
  if (searchParams?.id) {
    return <TakeQuiz quizId={searchParams.id} />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Student Quizzes</h1>
        <p className="text-muted-foreground">
          Practice and take quizzes published by teachers
        </p>
      </div>
      {/* API component tạm thời comment để cố định UI */}
      {/* <StudentQuizzesList /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticQuizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <Badge variant={quiz.status === "Open" ? "default" : "secondary"}>
                  {quiz.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{quiz.description}</p>
              <div className="text-sm grid grid-cols-2 gap-2">
                <span>Questions: {quiz.questionsCount}</span>
                <span>Duration: {quiz.durationMinutes} minutes</span>
                <span className="col-span-2">Updated: {quiz.updatedAt}</span>
                {quiz.grade !== undefined && (
                  <span className="col-span-2">Grade: {quiz.grade}%</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button asChild disabled={quiz.status !== "Open"}>
                <Link href={`/student-quizzes?id=${quiz.id}`}>Take quiz</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}