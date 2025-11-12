import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import TakeQuiz from "@/components/quiz/TakeQuiz";
import QuizScoreBadge from "@/components/quiz/QuizScoreBadge";
import TakeQuizButton from "@/components/quiz/TakeQuizButton";
import QuizDynamicStatus from "@/components/quiz/QuizDynamicStatus";
import QuizActions from "@/components/quiz/QuizActions";

export const metadata: Metadata = {
  title: "Student Quizzes",
  description: "Practice and take quizzes published by teachers",
};

export default async function StudentQuizzesPage({ searchParams }: { searchParams?: Promise<{ id?: string }> }) {
  const sp = await searchParams;
  if (sp?.id) {
    return <TakeQuiz quizId={sp.id} />;
  }

  let items: any[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/quizzes?pageNumber=1&pageSize=10`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      items = data?.result?.data ?? [];
    }
  } catch {}

  const quizzes = items.map((item: any, idx: number) => ({
    id: String(item.quizId ?? item.id ?? idx),
    title: String(item.quizName ?? item.title ?? "Untitled Quiz"),
    description: String(item.description ?? ""),
    questionsCount: Number(item.questionCount ?? 0),
    durationMinutes: Number(item.duration ?? item.durationInMinutes ?? 0),
    status: "Open",
    updatedAt: typeof item.updatedAt === "string" ? item.updatedAt.slice(0, 10) : "",
  }));

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
        {(quizzes.length ? quizzes : []).map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <QuizDynamicStatus quizId={quiz.id} baseStatus={quiz.status} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{quiz.description}</p>
              <div className="text-sm grid grid-cols-2 gap-2">
                <span>Questions: {quiz.questionsCount}</span>
                <span>Duration: {quiz.durationMinutes} minutes</span>
                <span className="col-span-2">Updated: {quiz.updatedAt}</span>
                <span className="col-span-2">
                  <QuizScoreBadge quizId={quiz.id} />
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <QuizActions quizId={quiz.id} isOpen={quiz.status === "Open"} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
