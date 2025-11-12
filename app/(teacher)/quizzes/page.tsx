"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { QuizApi } from "@/axios/quiz";

export default function QuizzesPage() {
  const searchParams = useSearchParams();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [filters, setFilters] = useState({
    search: "",
    filterOn: "",
    filterQuery: "",
    sortBy: "asc" as "asc" | "desc",
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, [searchParams]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const pageNumber = Number.parseInt(searchParams.get("pageNumber") || "1");
      const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");
      const filterOn = searchParams.get("filterOn") || "";
      const filterQuery = searchParams.get("filterQuery") || "";
      const sortBy = searchParams.get("sortBy") || "asc";

      const response = await QuizApi.getQuizzes({
        pageNumber,
        pageSize,
        filterOn,
        filterQuery,
        sortBy: sortBy as "asc" | "desc",
      });

      if (response.isSuccess && response.result) {
        setQuizzes(response.result.data);
        setPagination({
          currentPage: response.result.currentPage,
          pageSize: response.result.pageSize,
          totalCount: response.result.totalCount,
          totalPages: response.result.totalPages,
          hasPreviousPage: response.result.hasPreviousPage,
          hasNextPage: response.result.hasNextPage,
        });
      }
    } catch (error: any) {
      console.error("Failed to fetch quizzes:", error);
      toast.error(error.response?.data?.message || "Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (quizId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeletingId(quizId);
    try {
      const data = await QuizApi.deleteQuiz(quizId);

      if (data.isSuccess) {
        toast.success(data.message || "Quiz deleted successfully");
        fetchQuizzes();
      } else {
        toast.error(data.message || "Failed to delete quiz");
      }
    } catch (error: any) {
      console.error("Error deleting quiz:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the quiz"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      easy: "bg-green-500/20 text-green-400 border-green-500/30",
      medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      hard: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
      colors[level.toLowerCase()] ||
      "bg-muted/10 text-muted-foreground border-muted/20"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
          <p className="text-muted-foreground">
            Manage your quizzes ({pagination.totalCount} quizzes)
          </p>
        </div>
        <Button asChild>
          <Link href="/quizzes/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Quiz
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                className="pl-9 bg-background"
                onChange={(e) =>
                  setFilters({ ...filters, filterQuery: e.target.value })
                }
                value={filters.filterQuery}
              />
            </div>
            <select
              className="px-3 py-2 bg-background border border-border rounded-md text-sm"
              onChange={(e) =>
                setFilters({ ...filters, filterOn: e.target.value })
              }
              value={filters.filterOn}
            >
              <option value="">Filter by...</option>
              <option value="quizName">Quiz Name</option>
              <option value="englishLevel">English Level</option>
              <option value="skill">Skill Level</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Quizzes List */}
      <div className="space-y-3">
        {loading ? (
          <Card className="p-8 text-center text-muted-foreground">
            Loading quizzes...
          </Card>
        ) : quizzes.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No quizzes found
          </Card>
        ) : (
          quizzes.map((quiz) => (
            <Card
              key={quiz.quizId}
              className="p-5 bg-card border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={getLevelBadge(quiz.englishLevel)}
                    >
                      {quiz.englishLevel}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getLevelBadge(quiz.skill)}
                    >
                      Skill: {quiz.skill}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {quiz.duration} min
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Pass: {quiz.passingScore}
                    </Badge>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-1">
                    {quiz.quizName}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {quiz.description || "No description"}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {quiz.teacherName && (
                      <>
                        <span>By {quiz.teacherName}</span>
                        <span>·</span>
                      </>
                    )}
                    <span>Duration: {quiz.duration} minutes</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/quizzes/${quiz.quizId}/view`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/quizzes/${quiz.quizId}`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(quiz.quizId)}
                    disabled={deletingId === quiz.quizId}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {pagination.currentPage} of {pagination.totalPages} (
          {pagination.totalCount} total)
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled={!pagination.hasPreviousPage}>
            Previous
          </Button>
          <Button variant="outline" disabled={!pagination.hasNextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
