import React from "react";

type QuizHeaderProps = {
  quizId: string;
  page: number;
  totalPages: number;
  answeredCount: number;
  totalQuestions: number;
};

export default function QuizHeader({ quizId, page, totalPages, answeredCount, totalQuestions }: QuizHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Take Quiz</h1>
        <p>Quiz ID: {quizId}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-md border border-primary bg-primary text-primary-foreground px-2 py-1 text-sm">
          Page {page} of {totalPages}
        </span>
        <span className="inline-flex items-center rounded-md border border-primary bg-primary text-primary-foreground px-2 py-1 text-sm">
          Answered {answeredCount}/{totalQuestions}
        </span>
      </div>
    </div>
  );
}