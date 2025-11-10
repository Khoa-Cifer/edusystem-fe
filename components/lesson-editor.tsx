"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Save,
  Share2,
  Eye,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import api from "@/axios/http"
import axios from "axios"
interface LessonEditorProps {
  lessonId?: string;          // <--- thêm dòng này
  initialData?: {
    title: string
    subject: string
    grade: string
    content: string
  }
}

export function LessonEditor({ lessonId, initialData }: LessonEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [subject, setSubject] = useState(initialData?.subject || "")
  const [grade, setGrade] = useState(initialData?.grade || "")
  const [content, setContent] = useState(initialData?.content || "")
  const router = useRouter()
  // C:\Users\peolu\SWP391\SWD392\edusystem-fe\components\lesson-editor.tsx:60

const handleSave = async () => {
  if (!lessonId) {
    alert("lessonId is required for update");
    return;
  }

  // --- 1. Define the JSON Request Body ---
  const requestBody = {
    lessonId: lessonId,
    unitId: "actual-unit-uuid", // Ensure this is a real UUID
    lessonName: title,
    skill: subject,
    content: content,
    duration: 0,
    orderIndex: 0,
    grade: grade,
  };

  try {
    // --- 2. Call PUT update lesson using JSON (Axios defaults to 'application/json') ---
    await api.put("/lesson/update", requestBody); // Content-Type: application/json

    alert("Lesson updated successfully!");
    router.push("/lessons");
  } catch (err: any) {
    // If error is 401, try refresh token
    if (err.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        // --- 3. Define the JSON Request Body for Refresh Token ---
        const refreshBody = {
          refreshToken: refreshToken
        };

        // --- 4. Call POST refresh token using JSON ---
        const refreshRes = await axios.post(
          "https://edusystem-cbetcqczbbb2gchx.southeastasia-01.azurewebsites.net/api/auth/refresh-token",
          refreshBody, // Pass URLSearchParams object directly
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
);

        // Save new tokens
        localStorage.setItem("accessToken", refreshRes.data.accessToken);
        localStorage.setItem("refreshToken", refreshRes.data.refreshToken);

        // Retry PUT with the new token (Axios interceptor should handle Authorization header)
        // We can call the original PUT again, relying on the 'api' interceptor to use the new token
        await api.put("/lesson/update", requestBody); 

        alert("Lesson updated successfully after token refresh!");
        router.push("/lessons");
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        alert("Failed to refresh token. Please login again.");
      }
    } else {
      console.error("Error updating lesson:", err.response?.data || err);
      alert(`Failed to save lesson: ${err.response?.data?.title || err.message}`);
    }
  }
};
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/lessons">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{initialData ? "Edit Lesson" : "New Lesson"}</h1>
            <p className="text-sm text-muted-foreground">Create your lesson plan</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-transparent">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {lessonId ? "Save Changes" : "Create Lesson"}
          </Button>

        </div>
      </div>

      {/* Lesson Details */}
      <Card className="p-6 bg-card border-border">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              placeholder="Enter lesson title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject" className="bg-background">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Literature">Literature</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Grade Level</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade" className="bg-background">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 11">Grade 11</SelectItem>
                <SelectItem value="Grade 12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Rich Text Editor */}
      <Card className="bg-card border-border">
        {/* Toolbar */}
        <div className="border-b border-border p-3 flex flex-wrap gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bold className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Italic className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Underline className="w-4 h-4" />
          </Button>
          <div className="w-px h-8 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ListOrdered className="w-4 h-4" />
          </Button>
          <div className="w-px h-8 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ImageIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Editor Content */}
        <div className="p-6">
          <Textarea
            placeholder="Start writing your lesson plan..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] bg-background border-0 focus-visible:ring-0 resize-none text-base leading-relaxed"
          />
        </div>
      </Card>

      {/* Lesson Structure Template */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold mb-4">Lesson Structure</h3>
        <div className="space-y-4">
          {[
            { title: "Learning Objectives", placeholder: "What will students learn?" },
            { title: "Materials Needed", placeholder: "List required materials" },
            { title: "Introduction (10 min)", placeholder: "How will you introduce the topic?" },
            { title: "Main Activity (30 min)", placeholder: "Describe the main learning activity" },
            { title: "Assessment", placeholder: "How will you assess understanding?" },
            { title: "Homework", placeholder: "What will students do at home?" },
          ].map((section, i) => (
            <div key={i} className="space-y-2">
              <Label className="text-sm font-medium">{section.title}</Label>
              <Textarea placeholder={section.placeholder} className="bg-background min-h-[80px] resize-none" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
