"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function QuizScoreBadge({ quizId }: { quizId: string }) {
  const [score10, setScore10] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`quiz:${quizId}:result`);
      if (!raw) {
        setScore10(null);
        return;
      }
      const data = JSON.parse(raw) as { correctCount: number; total: number };
      const total = data.total || 0;
      const correct = data.correctCount || 0;
      const score = total > 0 ? Math.round((correct / total) * 10) : 0;
      setScore10(score);
    } catch {
      setScore10(null);
    }
  }, [quizId]);

  if (score10 == null) return null;
  return <Badge variant="secondary">Score: {score10}/10</Badge>;
}
