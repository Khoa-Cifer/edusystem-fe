"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function QuizDynamicStatus({ quizId, baseStatus }: { quizId: string; baseStatus: string }) {
  const [inProgress, setInProgress] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const rawState = localStorage.getItem(`quiz:${quizId}:state`);
      const rawResult = localStorage.getItem(`quiz:${quizId}:result`);
      const hasResult = !!rawResult;
      setSubmitted(hasResult);
      let isProg = false;
      if (!hasResult && rawState) {
        try {
          const data = JSON.parse(rawState) as { page?: number; answers?: Record<number, string> };
          const answered = data.answers ? Object.keys(data.answers).length > 0 : false;
          const progressed = typeof data.page === "number" ? data.page > 0 : false;
          isProg = answered || progressed;
        } catch {}
      }
      setInProgress(isProg);
    } catch {
      setSubmitted(false);
      setInProgress(false);
    }
  }, [quizId]);

  return (
    <div className="flex items-center gap-2">
      <Badge variant={baseStatus === "Open" ? "default" : "secondary"}>{baseStatus}</Badge>
      {baseStatus === "Open" && inProgress && <Badge variant="secondary">In Progress</Badge>}
      {submitted && <Badge variant="secondary">Submitted</Badge>}
    </div>
  );
}