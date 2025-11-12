"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TakeQuizButton({ quizId, isOpen, forceReset = false, label = "Take quiz" }: { quizId: string; isOpen: boolean; forceReset?: boolean; label?: string }) {
  const router = useRouter();
  const handleClick = () => {
    if (!isOpen) return;
    try {
      const resultKey = `quiz:${quizId}:result`;
      const stateKey = `quiz:${quizId}:state`;
      const hasResult = !!localStorage.getItem(resultKey);
      if (forceReset || hasResult) {
        localStorage.removeItem(resultKey);
        localStorage.removeItem(stateKey);
      }
    } catch {}
    router.push(`/student-quizzes?id=${quizId}`);
  };
  return (
    <Button onClick={handleClick} disabled={!isOpen}>
      {label}
    </Button>
  );
}