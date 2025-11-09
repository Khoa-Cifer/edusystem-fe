"use client";

import { useEffect, useState } from "react";
import { Search, ListChecks, Clock, User, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/axios/http";

interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  questions: number;
  duration: string;
  teacher: string;
  publishedAt: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
}

// 

export function StudentQuizzesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/quiz/get/all", {
          params: { pageNumber: 1, pageSize: 10 },
        });
        const items: any[] = res?.data?.result?.data ?? [];
        const normalized: Quiz[] = items.map((item: any, idx: number) => ({
          id: String(item.id ?? item.quizId ?? idx),
          title: item.title ?? item.quizName ?? "Untitled Quiz",
          description: item.description ?? "",
          subject: item.subject ?? item.category ?? "",
          grade: item.grade ?? item.gradeLevel ?? "",
          questions: Number(item.questionCount ?? item.questions ?? 0),
          duration: item.durationInMinutes
            ? `${item.durationInMinutes} min`
            : typeof item.duration === "number"
            ? `${item.duration} min`
            : item.duration ?? "",
          teacher: item.createdBy ?? item.teacher ?? "",
          publishedAt:
            typeof item.createdAt === "string"
              ? item.createdAt.slice(0, 10)
              : item.publishedAt ?? "",
          difficulty: item.difficulty ?? "",
        }));
        setQuizzes(normalized);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ?? "Failed to load quizzes. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const subjects = [
    "all",
    ...Array.from(new Set(quizzes.map((quiz) => quiz.subject).filter(Boolean))),
  ];
  const grades = [
    "all",
    ...Array.from(new Set(quizzes.map((quiz) => quiz.grade).filter(Boolean))),
  ];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || quiz.subject === selectedSubject;
    const matchesGrade = selectedGrade === "all" || quiz.grade === selectedGrade;
    const matchesDifficulty = selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesGrade && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Subject
            </label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Grade</label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade === "all" ? "All Grades" : grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty</label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <ListChecks className="h-8 w-8 text-primary" />
                <Badge className={getDifficultyColor(quiz.difficulty)}>
                  {quiz.difficulty}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold line-clamp-2">{quiz.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{quiz.description}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Subject:</span>
                  <Badge variant="secondary">{quiz.subject}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Grade:</span>
                  <Badge variant="outline">{quiz.grade}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{quiz.teacher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{quiz.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Badge variant="outline">{quiz.questions} questions</Badge>
                <span className="text-muted-foreground">Published: {quiz.publishedAt}</span>
              </div>

              <Button className="w-full" variant="default">
                Start Quiz
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <ListChecks className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No quizzes found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}