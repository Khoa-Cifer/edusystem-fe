"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizFooter from "@/components/quiz/QuizFooter";
import { useSonner } from "@/hooks/use-sonner";
import { QuizQuestionApi } from "@/axios/quiz-question";
import { AnswerApi } from "@/axios/answer";

type Question = {
  id: number;
  text: string;
  options: { key: string; label: string }[];
  correctKey: string;
};

const QUESTIONS_PER_PAGE = 10;

const KEYS = ["A", "B", "C", "D", "E", "F", "G", "H"];

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
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const pageQuestions = useMemo(() => {
    const start = page * QUESTIONS_PER_PAGE;
    return questions.slice(start, start + QUESTIONS_PER_PAGE);
  }, [page, questions]);

  const handleSelect = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleSubmit = () => {
    const correctCount = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctKey ? 1 : 0), 0);
    const total = questions.length;
    try {
      const payload = { answers, questions, correctCount, total };
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

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await QuizQuestionApi.getQuizQuestions(quizId);
        const rawItems: any[] = Array.isArray(res?.result)
          ? res.result
          : Array.isArray(res?.result?.data)
          ? res.result.data
          : [];
        const mapped = await Promise.all(
          rawItems.map(async (item: any, idx: number) => {
            const qId = String(item.questionId || item.id);
            let answersRes: any = null;
            try {
              answersRes = await AnswerApi.getAnswersByQuestionId(qId);
            } catch {}
            const answersData: any[] = Array.isArray(answersRes?.result)
              ? answersRes.result
              : Array.isArray(answersRes?.result?.data)
              ? answersRes.result.data
              : [];
            const options = answersData.map((ans, i) => ({
              key: KEYS[i] || String(i + 1),
              label: String(ans.content ?? ans.text ?? ""),
            }));
            const correctIndex = answersData.findIndex((a) => a.isCorrect === true);
            const correctKey = correctIndex >= 0 ? (KEYS[correctIndex] || String(correctIndex + 1)) : (options[0]?.key || "A");
            const question: Question = {
              id: Number(item.questionOrder ?? idx + 1),
              text: String(item.questionText ?? item.content ?? ""),
              options,
              correctKey,
            };
            return question;
          })
        );
        const sorted = mapped.sort((a, b) => a.id - b.id);
        if (mounted) setQuestions(sorted);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [quizId]);

  return (
    <div className="container mx-auto py-8">
      <QuizHeader
        quizId={quizId}
        page={page + 1}
        totalPages={totalPages}
        answeredCount={Object.keys(answers).length}
        totalQuestions={questions.length}
      />

      <div className="space-y-6">
        {(loading ? [] : pageQuestions).map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[q.id]}
            onSelect={(val: string) => handleSelect(q.id, val)}
          />
        ))}
        {(!loading && pageQuestions.length === 0) && (
          <div className="text-center text-muted-foreground">No questions available</div>
        )}
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