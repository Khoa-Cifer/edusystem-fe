"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"

export function QuestionForm() {
  const [questionType, setQuestionType] = useState<"mcq" | "true-false" | "short-answer">("mcq")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/questions">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add Question</h1>
            <p className="text-sm text-muted-foreground">Create a new question for your bank</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Question
        </Button>
      </div>

      {/* Question Details */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Question Type</Label>
              <Select value={questionType} onValueChange={(value: any) => setQuestionType(value)}>
                <SelectTrigger id="type" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger id="subject" className="bg-background">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select>
                <SelectTrigger id="difficulty" className="bg-background">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic/Tags</Label>
            <Input id="topic" placeholder="e.g., Algebra, Calculus" className="bg-background" />
          </div>
        </div>
      </Card>

      {/* Question Content */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              className="bg-background min-h-[100px] resize-none"
            />
          </div>

          {/* MCQ Options */}
          {questionType === "mcq" && (
            <div className="space-y-3">
              <Label>Answer Options</Label>
              <RadioGroup value={correctAnswer.toString()} onValueChange={(v) => setCorrectAnswer(Number.parseInt(v))}>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="bg-background flex-1"
                    />
                    {options.length > 2 && (
                      <Button variant="ghost" size="icon" onClick={() => removeOption(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </RadioGroup>
              <Button variant="outline" size="sm" onClick={addOption} className="bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>
          )}

          {/* True/False */}
          {questionType === "true-false" && (
            <div className="space-y-3">
              <Label>Correct Answer</Label>
              <RadioGroup defaultValue="true">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true" className="font-normal cursor-pointer">
                    True
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false" className="font-normal cursor-pointer">
                    False
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Short Answer */}
          {questionType === "short-answer" && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="answer">Accepted Answer(s)</Label>
                <Input id="answer" placeholder="Enter accepted answers (comma separated)" className="bg-background" />
                <p className="text-xs text-muted-foreground">
                  Multiple answers can be separated by commas. Case-insensitive by default.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="manual-grading" />
                <Label htmlFor="manual-grading" className="text-sm font-normal cursor-pointer">
                  Requires manual grading
                </Label>
              </div>
            </div>
          )}

          {/* Explanation */}
          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <Textarea
              id="explanation"
              placeholder="Explain why this is the correct answer..."
              className="bg-background min-h-[80px] resize-none"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
