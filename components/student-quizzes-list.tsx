"use client";

import { useState } from "react";
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
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const mockQuizzes: Quiz[] = [
  {
    id: "q1",
    title: "Algebra Basics Quiz",
    description: "Test your knowledge of basic algebraic expressions and equations.",
    subject: "Mathematics",
    grade: "Grade 8",
    questions: 15,
    duration: "20 min",
    teacher: "Ms. Johnson",
    publishedAt: "2024-01-15",
    difficulty: "Beginner",
  },
  {
    id: "q2",
    title: "Photosynthesis Quiz",
    description: "Assess your understanding of the photosynthesis process in plants.",
    subject: "Biology",
    grade: "Grade 9",
    questions: 20,
    duration: "25 min",
    teacher: "Mr. Smith",
    publishedAt: "2024-01-14",
    difficulty: "Intermediate",
  },
  {
    id: "q3",
    title: "World War II Quiz",
    description: "Evaluate knowledge on major WWII events and impacts.",
    subject: "History",
    grade: "Grade 10",
    questions: 25,
    duration: "30 min",
    teacher: "Mrs. Davis",
    publishedAt: "2024-01-13",
    difficulty: "Advanced",
  },
  {
    id: "q4",
    title: "Python Fundamentals Quiz",
    description: "Check your grasp of basic Python syntax and concepts.",
    subject: "Computer Science",
    grade: "Grade 11",
    questions: 18,
    duration: "22 min",
    teacher: "Mr. Wilson",
    publishedAt: "2024-01-12",
    difficulty: "Beginner",
  },
  {
    id: "q5",
    title: "Chemical Reactions Quiz",
    description: "Test understanding of types of chemical reactions.",
    subject: "Chemistry",
    grade: "Grade 9",
    questions: 16,
    duration: "20 min",
    teacher: "Dr. Brown",
    publishedAt: "2024-01-11",
    difficulty: "Intermediate",
  },
  {
    id: "q6",
    title: "Literary Analysis Quiz",
    description: "Quiz on techniques used for analyzing literature.",
    subject: "English Literature",
    grade: "Grade 12",
    questions: 22,
    duration: "28 min",
    teacher: "Ms. Garcia",
    publishedAt: "2024-01-10",
    difficulty: "Advanced",
  },
];

export function StudentQuizzesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const subjects = [
    "all",
    ...Array.from(new Set(mockQuizzes.map((quiz) => quiz.subject))),
  ];
  const grades = ["all", ...Array.from(new Set(mockQuizzes.map((quiz) => quiz.grade)))];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredQuizzes = mockQuizzes.filter((quiz) => {
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