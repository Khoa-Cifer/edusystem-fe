"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Option = { key: string; label: string };
type Question = { id: number; text: string; options: Option[]; correctKey: string };

export default function QuizResultPage() {
  const params = useSearchParams();
  const router = useRouter();
  const quizId = params.get("id") || "";
  const resultKey = useMemo(() => (quizId ? `quiz:${quizId}:result` : ""), [quizId]);
  const [result, setResult] = useState<{
    answers: Record<number, string>;
    questions: Question[];
    correctCount: number;
    total: number;
  } | null>(null);

  const handleRetake = () => {
    if (!quizId) return;
    try {
      localStorage.removeItem(`quiz:${quizId}:state`);
      localStorage.removeItem(`quiz:${quizId}:result`);
    } catch {}
    router.push(`/student-quizzes?id=${quizId}`);
  };

  useEffect(() => {
    if (!resultKey) return;
    try {
      const raw = localStorage.getItem(resultKey);
      if (raw) setResult(JSON.parse(raw));
    } catch {}
  }, [resultKey]);

  if (!quizId) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold">Quiz Result</h1>
          <p className="text-muted-foreground mt-2">Quiz ID is missing.</p>
          <div className="mt-4">
            <Button asChild>
              <Link href="/student-quizzes">Back to quizzes</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold">Quiz Result</h1>
          <p className="text-muted-foreground mt-2">No submission found for {quizId}.</p>
          <div className="mt-4 flex gap-3">
            <Button variant="destructive" asChild>
              <Link href="/student-quizzes">Back to quizzes</Link>
            </Button>
            <Button onClick={handleRetake}>Retake quiz</Button>
          </div>
        </Card>
      </div>
    );
  }

  const percentage = Math.round((result.correctCount / result.total) * 100);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Result</h1>
          <p className="text-muted-foreground">Quiz ID: {quizId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Score {result.correctCount}/{result.total}</Badge>
          <Badge variant="secondary">{percentage}%</Badge>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex gap-3">
          <Button onClick={handleRetake}>Retake</Button>
          <Button asChild variant="destructive">
            <Link href="/student-quizzes">Back to list</Link>
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        {result.questions.map((q) => {
          const selectedKey = result.answers[q.id];
          const selectedLabel = q.options.find((o) => o.key === selectedKey)?.label || "Not answered";
          const correctLabel = q.options.find((o) => o.key === q.correctKey)?.label || q.correctKey;
          const isCorrect = selectedKey === q.correctKey;
          return (
            <Card key={q.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{q.text}</h2>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Your answer:</span>
                      <Badge variant={isCorrect ? "default" : "destructive"}>{selectedLabel}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Correct answer:</span>
                      <Badge variant="secondary">{correctLabel}</Badge>
                    </div>
                  </div>
                </div>
                <Badge variant={isCorrect ? "default" : "destructive"}>{isCorrect ? "Correct" : "Incorrect"}</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}