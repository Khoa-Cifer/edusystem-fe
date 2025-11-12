"use client";

import React from "react";

type Option = { key: string; label: string };
type Question = { id: number; text: string; options: Option[] };

type QuestionCardProps = {
  question: Question;
  selected?: string;
  onSelect: (value: string) => void;
};

export default function QuestionCard({ question, selected, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white shadow-sm border rounded-lg">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-black">{question.text}</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((opt) => {
            const inputId = `${question.id}-${opt.key}`;
            const isSelected = selected === opt.key;
            return (
              <div key={opt.key} className="relative">
                <input
                  id={inputId}
                  type="radio"
                  name={`q-${question.id}`}
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => onSelect(opt.key)}
                />
                <label
                  htmlFor={inputId}
                  className={`flex items-center gap-3 rounded-md border px-4 py-3 cursor-pointer transition-colors bg-white text-black ${isSelected ? "border-primary shadow" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <span className="flex items-center justify-center h-5 w-5 rounded-full border border-black bg-white">
                    {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </span>
                  <span className="text-base text-black font-sans">{opt.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}