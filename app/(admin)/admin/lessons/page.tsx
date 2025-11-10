"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Lesson, LessonContent } from "@/interfaces/lesson";
import { LessonApi } from "@/axios/lesson";
import { LessonContentRow } from "@/components/lesson-content";

export default function AdminLessonsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [lessonContents, setLessonContents] = useState<
    Record<string, LessonContent[]>
  >({});
  const [contentLoading, setContentLoading] = useState<Record<string, boolean>>(
    {}
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  // Get URL parameters
  const pageNumber = Number.parseInt(searchParams.get("pageNumber") || "1");
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");
  const filterOn = searchParams.get("filterOn") || "";
  const filterQuery = searchParams.get("filterQuery") || "";
  const _sortParam = searchParams.get("sortBy");
  const sortBy: "asc" | "desc" = _sortParam === "desc" ? "desc" : "asc";

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await LessonApi.getLessons({
          pageNumber,
          pageSize,
          filterOn,
          filterQuery,
          sortBy,
        });

        if (response.isSuccess && response.result) {
          setLessons(response.result.data);
          setPagination({
            currentPage: response.result.currentPage,
            pageSize: response.result.pageSize,
            totalCount: response.result.totalCount,
            totalPages: response.result.totalPages,
            hasPreviousPage: response.result.hasPreviousPage,
            hasNextPage: response.result.hasNextPage,
          });
        } else {
          console.error("[v0] Failed to fetch lessons:", response.message);
        }
      } catch (error) {
        console.error("[v0] Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [pageNumber, pageSize, filterOn, filterQuery, sortBy]);

  const fetchLessonContents = async (lessonId: string) => {
    if (lessonContents[lessonId]) return;

    try {
      setContentLoading((prev) => ({ ...prev, [lessonId]: true }));
      const response = await LessonApi.getLessonContents({
        pageSize: 100,
        filterOn: lessonId,
      });

      if (response.isSuccess && response.result && response.result.data) {
        setLessonContents((prev) => ({
          ...prev,
          [lessonId]: response.result ? response.result.data : [],
        }));
      } else {
        console.error("Failed to fetch lesson contents:", response.message);
      }
    } catch (error) {
      console.error("Error fetching lesson contents:", error);
    } finally {
      setContentLoading((prev) => ({ ...prev, [lessonId]: false }));
    }
  };

  // Update URL with new parameters
  const updateParams = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    updateParams({ pageNumber: page });
  };

  const getSkillColor = (skill: string) => {
    const colors: Record<string, string> = {
      Speaking: "bg-primary/10 text-primary border-primary/20",
      Listening: "bg-secondary/10 text-secondary border-secondary/20",
      Reading: "bg-accent/10 text-accent border-accent/20",
      Writing: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    };
    return colors[skill] || "bg-muted/10 text-muted-foreground border-muted/20";
  };

  const getStatusBadge = (status: string) => {
    return status === "1" ? (
      <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="text-muted-foreground">
        Inactive
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lessons Management</h1>
          <p className="text-muted-foreground">
            View and manage all lessons in the system
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 bg-card border-border">
        <div className="space-y-4">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Filter By
              </label>
              <Select
                value={filterOn}
                onValueChange={(value) =>
                  updateParams({ filterOn: value, pageNumber: 1 })
                }
              >
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select column..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unitName">Unit Name</SelectItem>
                  <SelectItem value="skill">Skill</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filterOn && (
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Search Value
                </label>
                <Input
                  placeholder={`Search by ${filterOn}...`}
                  className="bg-background border-border"
                  value={filterQuery}
                  onChange={(e) =>
                    updateParams({
                      filterQuery: e.target.value,
                      pageNumber: 1,
                    })
                  }
                />
              </div>
            )}

            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Sort
              </label>
              <Select
                value={sortBy}
                onValueChange={(value) =>
                  updateParams({ sortBy: value, pageNumber: 1 })
                }
              >
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Oldest First</SelectItem>
                  <SelectItem value="desc">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Page Size
              </label>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) =>
                  updateParams({ pageSize: value, pageNumber: 1 })
                }
              >
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {filterOn && filterQuery && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              <Badge
                variant="outline"
                className="gap-2 cursor-pointer"
                onClick={() =>
                  updateParams({
                    filterOn: "",
                    filterQuery: "",
                    pageNumber: 1,
                  })
                }
              >
                {filterOn}: {filterQuery}
                <span>×</span>
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="text-2xl font-bold">{pagination.totalCount}</div>
          <div className="text-sm text-muted-foreground">Total Lessons</div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-2xl font-bold">
            {lessons.filter((l) => l.status === "1").length}
          </div>
          <div className="text-sm text-muted-foreground">Active Lessons</div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-2xl font-bold">
            {lessons.filter((l) => l.status === "0").length}
          </div>
          <div className="text-sm text-muted-foreground">Inactive Lessons</div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-2xl font-bold">{pagination.totalPages}</div>
          <div className="text-sm text-muted-foreground">Pages</div>
        </Card>
      </div>

      {/* Lessons Table */}
      <Card className="p-6 bg-card border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading lessons...</div>
          </div>
        ) : lessons.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Filter className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
              <div className="text-muted-foreground">
                No lessons found matching your criteria
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground w-8"></th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Lesson Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Unit
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Skill
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Duration
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Created By
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Date
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <LessonContentRow
                      key={lesson.lessonId}
                      lesson={lesson}
                      isExpanded={expandedLessonId === lesson.lessonId}
                      onToggle={() => {
                        setExpandedLessonId(
                          expandedLessonId === lesson.lessonId
                            ? null
                            : lesson.lessonId
                        );
                        if (expandedLessonId !== lesson.lessonId) {
                          fetchLessonContents(lesson.lessonId);
                        }
                      }}
                      contents={lessonContents[lesson.lessonId] || []}
                      isLoadingContents={
                        contentLoading[lesson.lessonId] || false
                      }
                      getSkillColor={getSkillColor}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {pagination.hasPreviousPage && (
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                    )}

                    {/* Page Numbers */}
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === pagination.currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {pagination.hasNextPage && (
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Results Info */}
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Showing {(pagination.currentPage - 1) * pagination.pageSize + 1}{" "}
              to{" "}
              {Math.min(
                pagination.currentPage * pagination.pageSize,
                pagination.totalCount
              )}{" "}
              of {pagination.totalCount} lessons
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
