"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type QuizFooterProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export default function QuizFooter({ page, totalPages, onPrev, onNext, onSubmit }: QuizFooterProps) {
  const isFirst = page === 0;
  const isLast = page >= totalPages - 1;

  return (
    <div className="mt-8 flex items-center justify-between">
      <Button onClick={onPrev} disabled={isFirst}>
        Previous
      </Button>

      {!isLast ? (
        <Button onClick={onNext}>Next</Button>
      ) : (
        <div className="flex items-center gap-3">
          <Button asChild variant="destructive">
            <Link href="/student-quizzes">Back to list</Link>
          </Button>
          <Button onClick={onSubmit}>Submit Answers</Button>
        </div>
      )}
    </div>
  );
}