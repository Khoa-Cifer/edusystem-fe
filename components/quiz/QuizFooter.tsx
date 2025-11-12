"use client";

import { Button } from "@/components/ui/button";

export default function QuizFooter({
  page,
  totalPages,
  onPrev,
  onNext,
  onSubmit,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button variant="outline" onClick={onPrev} disabled={page <= 0}>
        Previous
      </Button>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onNext} disabled={page >= totalPages - 1}>
          Next
        </Button>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}