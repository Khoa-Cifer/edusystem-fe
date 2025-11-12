"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizFooter from "@/components/quiz/QuizFooter";
import { useSonner } from "@/hooks/use-sonner";
// Revert: no external API usage for quiz taking

type Question = {
  id: number;
  text: string;
  options: { key: string; label: string }[];
  correctKey: string;
};

const QUESTIONS_PER_PAGE = 10;

const QUESTIONS: Question[] = Array.from({ length: 20 }).map((_, idx) => {
  const id = idx + 1;
  const keys = ["A", "B", "C", "D"];
  return {
    id,
    text: `Question ${id}: What does option A, B, C, or D represent?`,
    options: [
      { key: "A", label: "Option A" },
      { key: "B", label: "Option B" },
      { key: "C", label: "Option C" },
      { key: "D", label: "Option D" },
    ],
    correctKey: keys[(id - 1) % keys.length],
  };
});

export default function TakeQuiz({ quizId }: { quizId: string }) {
  const { showToast } = useSonner();
  const router = useRouter();
  const storageKey = `quiz:${quizId}:state`;
  const resultKey = `quiz:${quizId}:result`;
  const saved = useMemo(() => {
    if (typeof window === "undefined") return null as null | { page?: number; answers?: Record<number, string> };
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [storageKey]);

  const [page, setPage] = useState<number>(saved?.page ?? 0);
  const [answers, setAnswers] = useState<Record<number, string>>(saved?.answers ?? {});
  // Revert: no attemptId, no remote questions

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
    const correctCount = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correctKey ? 1 : 0), 0);
    const total = QUESTIONS.length;
    try {
      const payload = { answers, questions: QUESTIONS, correctCount, total };
      localStorage.setItem(resultKey, JSON.stringify(payload));
    } catch {}
    showToast("success", {
      title: "Submitted",
      description: `Score: ${correctCount}/${total}`,
      duration: 2000,
      style: { color: "#000000" },
    });
    router.push(`/student-quizzes/result?id=${quizId}`);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const interacted = page > 0 || Object.keys(answers).length > 0;
      if (!interacted) return;
      const data = { page, answers };
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {}
  }, [page, answers, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw) as { page?: number; answers?: Record<number, string> };
        setPage(data.page ?? 0);
        setAnswers(data.answers ?? {});
      }
    } catch {}
  }, [storageKey]);

  // Revert: no remote setup effect

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
            onSelect={(val: string) => handleSelect(q.id, val)}
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