"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Edit, Trash, Eye } from "lucide-react";
import Link from "next/link";
import { Question } from "@/interfaces/question";
import { QuestionApi } from "@/axios/question";
import { AnswerApi } from "@/axios/answer";
import { toast } from "sonner";

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [questionAnswerStatus, setQuestionAnswerStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchQuestions();
  }, [searchParams]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const pageNumber = Number.parseInt(searchParams.get("pageNumber") || "1");
      const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");
      const filterOn = searchParams.get("filterOn") || "";
      const filterQuery = searchParams.get("filterQuery") || "";
      const sortBy = searchParams.get("sortBy") || "asc";

      const response = await QuestionApi.getQuestions({
        pageNumber,
        pageSize,
        filterOn,
        filterQuery,
        sortBy: sortBy as "asc" | "desc",
      });

      if (response.isSuccess && response.result) {
        setQuestions(response.result.data);
        setPagination({
          currentPage: response.result.currentPage,
          pageSize: response.result.pageSize,
          totalCount: response.result.totalCount,
          totalPages: response.result.totalPages,
          hasPreviousPage: response.result.hasPreviousPage,
          hasNextPage: response.result.hasNextPage,
        });

        // Fetch answer status for each question
        fetchAnswerStatus(response.result.data);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswerStatus = async (questions: Question[]) => {
    const statusMap: Record<string, boolean> = {};
    
    await Promise.all(
      questions.map(async (question) => {
        try {
          const data = await AnswerApi.getAnswersByQuestionId(question.questionId);
          statusMap[question.questionId] = data.isSuccess && data.result && data.result.length > 0;
        } catch (error) {
          statusMap[question.questionId] = false;
        }
      })
    );

    setQuestionAnswerStatus(statusMap);
  };

  const handleFilterChange = (filterOn: string) => {
    setFilters((prev) => ({ ...prev, filterOn, filterQuery: "" }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, filterQuery: value }));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getQuestionTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("mcq")) return "default";
    if (lowerType.includes("true") || lowerType.includes("false"))
      return "secondary";
    return "outline";
  };

  const getLevelColor = (level: string) => {
    const lowerLevel = level.toLowerCase();
    if (lowerLevel.includes("easy")) return "border-accent text-accent";
    if (lowerLevel.includes("medium")) return "border-chart-3 text-chart-3";
    if (lowerLevel.includes("hard"))
      return "border-destructive text-destructive";
    return "border-muted-foreground text-muted-foreground";
  };

  const handleDeleteClick = async (questionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question? This action cannot be undone."
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const data = await QuestionApi.deleteQuestion(questionId);

      if (data.isSuccess) {
        toast.success(data.message || "Question deleted successfully");
        fetchQuestions(); // Refresh the list
      } else {
        toast.error(data.message || "Failed to delete question");
      }
    } catch (error: any) {
      console.error("Error deleting question:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the question"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
          <p className="text-muted-foreground">
            Manage your question library ({pagination.totalCount} questions)
          </p>
        </div>
        <Button asChild>
          <Link href="/questions/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
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
                placeholder="Search questions..."
                className="pl-9 bg-background"
                onChange={(e) => handleSearchChange(e.target.value)}
                value={filters.filterQuery}
              />
            </div>
            <select
              className="px-3 py-2 bg-background border border-border rounded-md text-sm"
              onChange={(e) => handleFilterChange(e.target.value)}
              value={filters.filterOn}
            >
              <option value="">Filter by...</option>
              <option value="questionType">Question Type</option>
              <option value="level">Level</option>
              <option value="skillType">Skill Type</option>
              <option value="englishLevel">English Level</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Questions List */}
      <div className="space-y-3">
        {loading ? (
          <Card className="p-8 text-center text-muted-foreground">
            Loading questions...
          </Card>
        ) : questions.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No questions found
          </Card>
        ) : (
          questions.map((question) => (
            <Card
              key={question.questionId}
              className="p-5 bg-card border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge
                      variant={getQuestionTypeColor(question.questionType)}
                      className="text-xs"
                    >
                      {question.questionType}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getLevelColor(question.level)}`}
                    >
                      {question.level}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {question.englishLevel}
                    </Badge>
                    {/* Answer Status Badge */}
                    {questionAnswerStatus[question.questionId] !== undefined && (
                      questionAnswerStatus[question.questionId] ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Answered
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-400 border-orange-500/30">
                          Not Answered Yet
                        </Badge>
                      )
                    )}
                  </div>

                  <p className="font-medium mb-2 line-clamp-2">
                    {question.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span>{question.skillType}</span>
                    <span>·</span>
                    <span>Score: {question.score}</span>
                    <span>·</span>
                    <span>By {question.createdBy}</span>
                    <span>·</span>
                    <span>{formatDate(question.createdTime)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/questions/${question.questionId}/view`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/questions/${question.questionId}`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(question.questionId)}
                    disabled={isDeleting}
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
