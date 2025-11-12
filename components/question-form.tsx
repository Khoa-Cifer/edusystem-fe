"use client"

import { useState, useEffect } from "react"
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
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { QuestionApi } from "@/axios/question"

interface QuestionFormProps {
  questionId?: string
}

export function QuestionForm({ questionId }: QuestionFormProps) {
  const router = useRouter()
  const isEditMode = !!questionId
  const [questionType, setQuestionType] = useState<"mcq" | "true-false" | "short-answer">("mcq")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    questionType: "Multiple Choice",
    level: "Easy",
    skillType: "",
    englishLevel: "Easy",
    score: 10
  })

  // Fetch question data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchQuestionData()
    }
  }, [questionId])

  const fetchQuestionData = async () => {
    try {
      setLoading(true)
      
      const data = await QuestionApi.getQuestionById(questionId!)

      if (data.isSuccess && data.result) {
        const question = data.result
        
        setFormData({
          title: question.title || question.content || "",
          content: question.content || "",
          questionType: question.questionType || "Multiple Choice",
          level: question.level || "Easy",
          skillType: question.skillType || "",
          englishLevel: question.englishLevel || "Easy",
          score: Number(question.score) || 10
        })
      } else {
        toast.error(data.message || "Failed to load question")
        router.push("/questions")
      }
    } catch (error: any) {
      console.error("Error fetching question:", error)
      toast.error(error.response?.data?.message || "Failed to load question data")
      router.push("/questions")
    } finally {
      setLoading(false)
    }
  }

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

  const handleSaveQuestion = async () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a question title")
      return
    }
    if (!formData.content.trim()) {
      toast.error("Please enter the question content")
      return
    }
    if (!formData.skillType.trim()) {
      toast.error("Please select a subject/skill type")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          questionId: questionId!,
          title: formData.title,
          content: formData.content,
          questionType: formData.questionType,
          level: formData.level,
          skillType: formData.skillType,
          englishLevel: formData.englishLevel,
          score: formData.score
        }
        data = await QuestionApi.updateQuestion(questionId!, requestBody)
      } else {
        const requestBody = {
          title: formData.title,
          content: formData.content,
          questionType: formData.questionType,
          level: formData.level,
          skillType: formData.skillType,
          englishLevel: formData.englishLevel,
          score: formData.score
        }
        data = await QuestionApi.createQuestion(requestBody)
      }

      if (data.isSuccess) {
        toast.success(data.message || `Question ${isEditMode ? 'updated' : 'created'} successfully`)
        router.push("/questions")
      } else {
        toast.error(data.message || `Failed to ${isEditMode ? 'update' : 'create'} question`)
      }
    } catch (error: any) {
      console.error("Error saving question:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the question")
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading question...</p>
      </div>
    )
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
            <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Question' : 'Add Question'}</h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode ? 'Update question details' : 'Create a new question for your bank'}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveQuestion} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Question" : "Save Question"}
        </Button>
      </div>

      {/* Question Details */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Question Type</Label>
              <Select 
                value={formData.questionType} 
                onValueChange={(value) => setFormData({ ...formData, questionType: value })}
              >
                <SelectTrigger id="type" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                  <SelectItem value="True/False">True/False</SelectItem>
                  <SelectItem value="Short Answer">Short Answer</SelectItem>
                  <SelectItem value="Essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject/Skill Type *</Label>
              <Input
                id="subject"
                placeholder="e.g., Lập trình, Toán học"
                value={formData.skillType}
                onChange={(e) => setFormData({ ...formData, skillType: e.target.value })}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger id="difficulty" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="englishLevel">English Level</Label>
              <Select 
                value={formData.englishLevel}
                onValueChange={(value) => setFormData({ ...formData, englishLevel: value })}
              >
                <SelectTrigger id="englishLevel" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input 
                id="score" 
                type="number"
                min="0"
                max="100"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              placeholder="e.g., Lập Trình C"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background"
            />
          </div>
        </div>
      </Card>

      {/* Question Content */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question Content *</Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
