"use client";

import { Badge } from "@/components/ui/badge";

export default function QuizHeader({
  quizId,
  page,
  totalPages,
  answeredCount,
  totalQuestions,
}: {
  quizId: string;
  page: number;
  totalPages: number;
  answeredCount: number;
  totalQuestions: number;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold">Quiz</span>
        <Badge variant="secondary">{quizId}</Badge>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span>
          Page {page}/{totalPages}
        </span>
        <span>
          Answered {answeredCount}/{totalQuestions}
        </span>
      </div>
    </div>
  );
}