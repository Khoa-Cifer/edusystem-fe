"use client";

import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Question = {
  id: number;
  text: string;
  options: { key: string; label: string }[];
  correctKey: string;
};

export default function QuestionCard({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="font-medium">{question.text}</div>
        <RadioGroup value={selected} onValueChange={onSelect} className="grid gap-3">
          {question.options.map((opt) => (
            <div key={opt.key} className="flex items-center gap-3">
              <RadioGroupItem id={`q-${question.id}-${opt.key}`} value={opt.key} />
              <Label htmlFor={`q-${question.id}-${opt.key}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
}