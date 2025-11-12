"use client";

import React, { useMemo, useState } from "react";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizFooter from "@/components/quiz/QuizFooter";
import { useSonner } from "@/hooks/use-sonner";

type Question = {
  id: number;
  text: string;
  options: { key: string; label: string }[];
};

const QUESTIONS_PER_PAGE = 10;

const QUESTIONS: Question[] = Array.from({ length: 20 }).map((_, idx) => {
  const id = idx + 1;
  return {
    id,
    text: `Question ${id}: What does option A, B, C, or D represent?`,
    options: [
      { key: "A", label: "Option A" },
      { key: "B", label: "Option B" },
      { key: "C", label: "Option C" },
      { key: "D", label: "Option D" },
    ],
  };
});

export default function TakeQuiz({ quizId }: { quizId: string }) {
  const { showToast } = useSonner();
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
  const pageQuestions = useMemo(() => {
    const start = page * QUESTIONS_PER_PAGE;
    return QUESTIONS.slice(start, start + QUESTIONS_PER_PAGE);
  }, [page]);

  const handleSelect = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    showToast("success", {
      title: "Submitted",
      description: `You answered ${answeredCount}/${QUESTIONS.length} questions.`,
      duration: 3000,
      style: { color: "#000000" },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <QuizHeader
        quizId={quizId}
        page={page + 1}
        totalPages={totalPages}
        answeredCount={Object.keys(answers).length}
        totalQuestions={QUESTIONS.length}
      />

      <div className="space-y-6">
        {pageQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[q.id]}
            onSelect={(val) => handleSelect(q.id, val)}
          />
        ))}
      </div>

      <QuizFooter
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}