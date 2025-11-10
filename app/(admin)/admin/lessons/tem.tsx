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
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LessonApi } from "@/axios/lesson";
import { FetchParams } from "@/interfaces/user";
import { Lesson } from "@/interfaces/lesson";
import { LessonContentRow } from "@/components/lesson-content";

export default function LessonsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
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
  const filterOn = searchParams.get("filterOn") || "unitName";
  const filterQuery = searchParams.get("filterQuery") || "";
  const sortBy = searchParams.get("sortBy") || "asc";
  const searchQuery = searchParams.get("search") || "";

  const lessonContents: Record<string, any[]> = {
    "65d037b8-0081-4c9b-a740-3d5802a78140": [
      {
        lessonContentId: "352c170e-c7ff-47c5-8c86-b17edbfaf920",
        lessonId: "65d037b8-0081-4c9b-a740-3d5802a78140",
        resourceType: "Essay",
        resourceUrl:
          "https://www.scribd.com/document/769800650/Essay-Examples-Comprehensive",
        description: "Link about Essay Content",
        status: "0",
        createdBy: "Trần Thị Hoa",
        createdTime: "2025-11-06T10:29:42.355278Z",
        updatedBy: "Trần Thị Hoa",
        updatedTime: "2025-11-06T10:29:42.355278Z",
      },
      {
        lessonContentId: "68e1ac84-fb37-443a-aec1-60d830f57d27",
        lessonId: "65d037b8-0081-4c9b-a740-3d5802a78140",
        resourceType: "Essay",
        resourceUrl:
          "https://www.scribd.com/document/769800650/Essay-Examples-Comprehensive",
        description: "Link about Essay #1",
        status: "1",
        createdBy: "Trần Thị Hoa",
        createdTime: "2025-11-06T10:29:42.355278Z",
        updatedBy: null,
        updatedTime: null,
      },
    ],
    "0dfd4a4d-d395-4ef7-b38f-e00649115b43": [
      {
        lessonContentId: "abc123",
        lessonId: "0dfd4a4d-d395-4ef7-b38f-e00649115b43",
        resourceType: "Audio",
        resourceUrl: "https://example.com/audio.mp3",
        description: "Hello & Goodbye Pronunciation Guide",
        status: "1",
        createdBy: "Emma Johnson",
        createdTime: "2025-11-02T14:58:07.000000Z",
        updatedBy: null,
        updatedTime: null,
      },
    ],
  };

  // Mock data - Replace with actual API call
  useEffect(() => {
    setLoading(true);

    // Simulated API response based on your data structure
    const mockData = [
      {
        lessonId: "65d037b8-0081-4c9b-a740-3d5802a78140",
        unitName: "Conversational English",
        lessonName: "John's talking with Emma",
        skill: "Speaking",
        content: "John meet a lovely girl at the park",
        duration: 10,
        orderIndex: 1,
        status: "1",
        createBy: "Lê Văn Cường",
        createTime: "11/5/2025 6:02:43 PM",
        updateBy: null,
        updateTime: null,
      },
      {
        lessonId: "0dfd4a4d-d395-4ef7-b38f-e00649115b43",
        unitName: "Listening and Comprehension",
        lessonName: "Say Hello & Goodbye",
        skill: "Speaking",
        content:
          "Learn 10 ways to greet people in the morning, afternoon, and evening + 5 polite goodbye phrases. Mini-dialogue + pronunciation audio.",
        duration: 12,
        orderIndex: 1,
        status: "1",
        createBy: "Emma Johnson",
        createTime: "11/2/2025 2:58:07 PM",
        updateBy: null,
        updateTime: null,
      },
      {
        lessonId: "ebda0a09-8553-4080-8447-7a59683ee5ea",
        unitName: "Listening and Comprehension",
        lessonName: "Say Hello & Goodbye",
        skill: "Listening",
        content:
          "Learn 10 ways to greet people in the morning, afternoon, and evening + 5 polite goodbye phrases. Mini-dialogue + pronunciation audio.",
        duration: 12,
        orderIndex: 1,
        status: "1",
        createBy: "Emma Johnson",
        createTime: "11/2/2025 2:44:56 PM",
        updateBy: null,
        updateTime: null,
      },
      {
        lessonId: "2946dc3c-7fbe-4f3b-b5a2-e57eb77dec43",
        unitName: "Business English",
        lessonName: "Meeting Room Etiquette",
        skill: "Writing",
        content: "Professional communication guidelines for business meetings",
        duration: 15,
        orderIndex: 2,
        status: "1",
        createBy: "John Smith",
        createTime: "11/1/2025 10:30:00 AM",
        updateBy: null,
        updateTime: null,
      },
      {
        lessonId: "3cd70714-73e4-41ed-9604-14846cb42a8d",
        unitName: "Conversational English",
        lessonName: "Casual Conversations",
        skill: "Speaking",
        content: "Practice everyday casual English conversations",
        duration: 20,
        orderIndex: 3,
        status: "0",
        createBy: "Emma Johnson",
        createTime: "10/28/2025 3:15:00 PM",
        updateBy: "Admin",
        updateTime: "11/2/2025 6:25:09 PM",
      },
    ];

    let filteredData = mockData;

    // Apply search filter
    if (searchQuery) {
      filteredData = filteredData.filter(
        (lesson) =>
          lesson.lessonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply column-based filter
    if (filterOn && filterQuery) {
      filteredData = filteredData.filter((lesson) => {
        const fieldValue = lesson[filterOn as keyof typeof lesson]
          ?.toString()
          .toLowerCase();
        return fieldValue?.includes(filterQuery.toLowerCase());
      });
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      const aVal = a.createTime;
      const bVal = b.createTime;
      if (sortBy === "asc") {
        return aVal < bVal ? -1 : 1;
      } else {
        return aVal > bVal ? -1 : 1;
      }
    });

    const totalCount = filteredData.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    setLessons(paginatedData);
    setPagination({
      currentPage: pageNumber,
      pageSize,
      totalCount,
      totalPages,
      hasPreviousPage: pageNumber > 1,
      hasNextPage: pageNumber < totalPages,
    });

    setLoading(false);
  }, [pageNumber, pageSize, filterOn, filterQuery, sortBy, searchQuery]);

  // Update URL with new parameters
  const updateParams = (newParams: Record<string, string | number>) => {
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
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons by name or content..."
              className="pl-9 bg-background"
              value={searchQuery}
              onChange={(e) =>
                updateParams({ search: e.target.value, pageNumber: 1 })
              }
            />
          </div>

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
                    updateParams({ filterQuery: e.target.value, pageNumber: 1 })
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
          {(searchQuery || filterOn) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="gap-2 cursor-pointer"
                  onClick={() => updateParams({ search: "", pageNumber: 1 })}
                >
                  Search: {searchQuery}
                  <span>×</span>
                </Badge>
              )}
              {filterOn && filterQuery && (
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
              )}
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
          <div className="text-2xl font-bold">
            {pagination.totalCount > 0
              ? Math.ceil(pagination.totalCount / 10)
              : 0}
          </div>
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
                  {lessons.map((lesson, i) => (
                    <LessonContentRow
                      key={i}
                      lesson={lesson}
                      isExpanded={expandedLessonId === lesson.lessonId}
                      onToggle={() =>
                        setExpandedLessonId(
                          expandedLessonId === lesson.lessonId
                            ? null
                            : lesson.lessonId
                        )
                      }
                      contents={lessonContents[lesson.lessonId] || []}
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
