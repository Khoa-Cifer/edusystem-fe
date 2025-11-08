"use client";

import { useState } from "react";
import { Search, BookOpen, Clock, User, Filter } from "lucide-react";
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

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  duration: string;
  teacher: string;
  publishedAt: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to Algebra",
    description:
      "Learn the basics of algebraic expressions and equations with practical examples.",
    subject: "Mathematics",
    grade: "Grade 8",
    duration: "45 min",
    teacher: "Ms. Johnson",
    publishedAt: "2024-01-15",
    difficulty: "Beginner",
  },
  {
    id: "2",
    title: "Photosynthesis Process",
    description:
      "Understanding how plants convert sunlight into energy through photosynthesis.",
    subject: "Biology",
    grade: "Grade 9",
    duration: "60 min",
    teacher: "Mr. Smith",
    publishedAt: "2024-01-14",
    difficulty: "Intermediate",
  },
  {
    id: "3",
    title: "World War II Overview",
    description:
      "A comprehensive look at the major events and impacts of World War II.",
    subject: "History",
    grade: "Grade 10",
    duration: "90 min",
    teacher: "Mrs. Davis",
    publishedAt: "2024-01-13",
    difficulty: "Advanced",
  },
  {
    id: "4",
    title: "Basic Python Programming",
    description:
      "Introduction to Python programming language with hands-on exercises.",
    subject: "Computer Science",
    grade: "Grade 11",
    duration: "75 min",
    teacher: "Mr. Wilson",
    publishedAt: "2024-01-12",
    difficulty: "Beginner",
  },
  {
    id: "5",
    title: "Chemical Reactions",
    description:
      "Explore different types of chemical reactions and their applications.",
    subject: "Chemistry",
    grade: "Grade 9",
    duration: "50 min",
    teacher: "Dr. Brown",
    publishedAt: "2024-01-11",
    difficulty: "Intermediate",
  },
  {
    id: "6",
    title: "Literary Analysis Techniques",
    description:
      "Learn how to analyze literary works using various critical approaches.",
    subject: "English Literature",
    grade: "Grade 12",
    duration: "80 min",
    teacher: "Ms. Garcia",
    publishedAt: "2024-01-10",
    difficulty: "Advanced",
  },
];

export function StudentLessonsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const subjects = [
    "all",
    ...Array.from(new Set(mockLessons.map((lesson) => lesson.subject))),
  ];
  const grades = [
    "all",
    ...Array.from(new Set(mockLessons.map((lesson) => lesson.grade))),
  ];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredLessons = mockLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || lesson.subject === selectedSubject;
    const matchesGrade = selectedGrade === "all" || lesson.grade === selectedGrade;
    const matchesDifficulty =
      selectedDifficulty === "all" || lesson.difficulty === selectedDifficulty;

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
            placeholder="Search lessons..."
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
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
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

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <BookOpen className="h-8 w-8 text-primary" />
                <Badge className={getDifficultyColor(lesson.difficulty)}>
                  {lesson.difficulty}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold line-clamp-2">
                  {lesson.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {lesson.description}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Subject:</span>
                  <Badge variant="secondary">{lesson.subject}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Grade:</span>
                  <Badge variant="outline">{lesson.grade}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{lesson.teacher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration}</span>
                </div>
              </div>

              <Button className="w-full" variant="default">
                Start Learning
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}