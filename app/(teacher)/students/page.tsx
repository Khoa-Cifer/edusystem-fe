"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
  AlertCircle,
  Target,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { StudentPerformanceTable } from "@/components/student-performance-table";
import { StudentApi } from "@/axios/student";
import { StudentResponse } from "@/interfaces/student";
import { FetchParams } from "@/interfaces/user";

export default function StudentsPage() {
  const [studentsData, setStudentsData] = useState<StudentResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FetchParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await StudentApi.getStudents(filters);
        if (response.isSuccess && response.result) {
          setStudentsData(response.result);
        } else {
          setError(response.message || "Failed to fetch students");
        }
      } catch (err) {
        setError("An error occurred while fetching students");
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [filters]);

  const totalStudents = studentsData?.totalCount || 0;
  const activeStudents =
    studentsData?.data?.filter((s) => s.status === 1).length || 0;
  const inactiveStudents =
    studentsData?.data?.filter((s) => s.status === 0).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Students</h1>
          <p className="text-muted-foreground">
            Manage and track student performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="english-9">English Grade 9</SelectItem>
              <SelectItem value="english-10">English Grade 10</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="active">
            <SelectTrigger className="w-[140px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Total Students
            </span>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">
            {loading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              totalStudents
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-accent">
            <TrendingUp className="w-4 h-4" />
            <span>Active: {activeStudents}</span>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Active Students
            </span>
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">
            {loading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              activeStudents
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-accent">
            <TrendingUp className="w-4 h-4" />
            <span>Currently enrolled</span>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Inactive</span>
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">
            {loading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              inactiveStudents
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-destructive">
            <TrendingDown className="w-4 h-4" />
            <span>Not active</span>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Current Page</span>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">
            {loading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              `${studentsData?.currentPage || 0}/${studentsData?.totalPages || 0}`
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-accent">
            <TrendingUp className="w-4 h-4" />
            <span>
              Showing {studentsData?.data?.length || 0} of {totalStudents}
            </span>
          </div>
        </Card>
      </div>

      {/* Tabs for student details */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="performance">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-6">All Students</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">{error}</div>
            ) : (
              <StudentPerformanceTable
                students={studentsData?.data || []}
              />
            )}
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-6">
              Top Performing Students
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">{error}</div>
            ) : studentsData?.data && studentsData.data.length > 0 ? (
              studentsData.data.slice(0, 10).map((student) => (
                <div
                  key={student.studentId}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-2 hover:bg-muted transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {student.applicationUser?.fullName || "N/A"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {student.studentCode} • {student.class || "No Class"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        student.status === 1
                          ? "text-accent border-accent"
                          : "text-secondary border-secondary"
                      }
                    >
                      {student.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No students found
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
