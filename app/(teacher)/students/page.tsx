"use client";

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
} from "lucide-react";
import { StudentPerformanceTable } from "@/components/student-performance-table";

export default function StudentsPage() {
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
          <div className="text-3xl font-bold mb-1">268</div>
          <div className="flex items-center gap-1 text-sm text-accent">
            <TrendingUp className="w-4 h-4" />
            <span>+4% from last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Top Performers
            </span>
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">42</div>
          <div className="flex items-center gap-1 text-sm text-accent">
            <TrendingUp className="w-4 h-4" />
            <span>+2 from last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">At Risk</span>
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">12</div>
          <div className="flex items-center gap-1 text-sm text-destructive">
            <TrendingDown className="w-4 h-4" />
            <span>Below 60% average</span>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Average Score</span>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">84.5%</div>
          <div className="flex items-center gap-1 text-sm text-accent">
            <TrendingUp className="w-4 h-4" />
            <span>+3.2% from last month</span>
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
            <StudentPerformanceTable />
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-6">
              Top Performing Students
            </h3>
            {[
              {
                name: "Nguyen Van A",
                score: 98,
                status: "Excellent",
              },
              {
                name: "Tran Thi B",
                score: 95,
                status: "Excellent",
              },
              {
                name: "Le Van C",
                score: 88,
                status: "Good",
              },
            ].map((student, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-2 hover:bg-muted transition-colors"
              >
                <span className="font-medium">{student.name}</span>
                <div className="flex items-center gap-3">
                  <span>{student.score}%</span>
                  <Badge
                    variant="outline"
                    className={
                      student.score >= 90
                        ? "text-accent border-accent"
                        : "text-secondary border-secondary"
                    }
                  >
                    {student.status}
                  </Badge>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
