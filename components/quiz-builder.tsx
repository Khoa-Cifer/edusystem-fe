"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Save, Plus, Wand2, GripVertical, X } from "lucide-react"
import Link from "next/link"

export function QuizBuilder() {
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([])

  const availableQuestions = [
    { id: 1, type: "MCQ", question: "What is the derivative of x²?", difficulty: "Medium" },
    { id: 2, type: "True/False", question: "Photosynthesis occurs in mitochondria", difficulty: "Easy" },
    { id: 3, type: "Short Answer", question: "Explain the water cycle", difficulty: "Medium" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/quizzes">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Quiz</h1>
            <p className="text-sm text-muted-foreground">Build a new quiz for your students</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Quiz
        </Button>
      </div>

      {/* Quiz Details */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input id="title" placeholder="Enter quiz title" className="bg-background" />
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
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Brief description of the quiz" className="bg-background" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Time Limit (minutes)</Label>
              <Input id="duration" type="number" placeholder="45" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passing">Passing Score (%)</Label>
              <Input id="passing" type="number" placeholder="70" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input id="due-date" type="date" className="bg-background" />
            </div>
          </div>
        </div>
      </Card>

      {/* Question Selection */}
      <Card className="p-6 bg-card border-border">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="manual">Manual Selection</TabsTrigger>
            <TabsTrigger value="auto">Auto Generate</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Selected Questions ({selectedQuestions.length})</h3>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Browse Question Bank
              </Button>
            </div>

            {selectedQuestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No questions added yet</p>
                <p className="text-sm mt-1">Browse the question bank to add questions</p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedQuestions.map((q, index) => (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {q.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {q.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm">{q.question}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="auto" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="algebra">Algebra</SelectItem>
                      <SelectItem value="calculus">Calculus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Total Questions</Label>
                  <Input type="number" placeholder="20" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>MCQ</Label>
                  <Input type="number" placeholder="10" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>True/False</Label>
                  <Input type="number" placeholder="5" className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Difficulty Distribution</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Easy</Label>
                    <Input type="number" placeholder="30%" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Medium</Label>
                    <Input type="number" placeholder="50%" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Hard</Label>
                    <Input type="number" placeholder="20%" className="bg-background" />
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Quiz
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
