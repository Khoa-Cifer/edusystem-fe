"use client";

import TakeQuizButton from "@/components/quiz/TakeQuizButton";
import { Button } from "@/components/ui/button";

export default function QuizActions({ quizId, isOpen }: { quizId: string; isOpen: boolean }) {
  if (!isOpen) return <Button disabled>Take quiz</Button>;
  try {
    const hasResult = !!localStorage.getItem(`quiz:${quizId}:result`);
    if (hasResult) {
      return <TakeQuizButton quizId={quizId} isOpen={true} forceReset label="Retake" />;
    }
  } catch {}
  return <TakeQuizButton quizId={quizId} isOpen={true} label="Take quiz" />;
}