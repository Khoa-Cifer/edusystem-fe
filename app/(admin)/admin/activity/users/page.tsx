"use client";

import { AddUserDialog } from "@/components/add-user-dialog";
import { StudentsList } from "@/components/students-list";
import { TeachersList } from "@/components/teachers-list";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function AdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("students");

  const handleUserAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage users, students, and teachers
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground">
            User Management
          </h2>
          <AddUserDialog onUserAdded={handleUserAdded} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted rounded-lg p-1">
            <TabsTrigger
              value="students"
              className={`rounded-md transition font-medium py-2 ${
                activeTab === "students"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Students
            </TabsTrigger>

            <TabsTrigger
              value="teachers"
              className={`rounded-md transition font-medium py-2 ${
                activeTab === "teachers"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Teachers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <StudentsList key={refreshKey} />
          </TabsContent>

          <TabsContent value="teachers" className="mt-6">
            <TeachersList key={refreshKey} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
