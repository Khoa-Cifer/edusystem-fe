"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowLeft, ListChecks } from "lucide-react";

export default function UnitPage() {
  const params = useParams<{ id: string }>();
  const lessonId = params?.id as string;

  // Static placeholder UI for Unit information
  const unit = {
    title: "Unit Overview",
    unitName: "Unit 3: Communication",
    skill: "Speaking",
    duration: 45,
    objectives: [
      "Understand key phrases for effective communication",
      "Practice conversation flow and active listening",
      "Apply speaking strategies in role-play scenarios",
    ],
    sections: [
      { title: "Warm-up", description: "Icebreaker and topic introduction" },
      { title: "Vocabulary", description: "Key words and phrases" },
      { title: "Practice", description: "Pair work and role-play" },
      { title: "Wrap-up", description: "Reflection and homework" },
    ],
    prerequisites: ["Basic grammar", "Common expressions"],
  };

  const getSkillColor = (skill?: string) => {
    switch (skill) {
      case "Speaking":
        return "bg-green-100 text-green-800";
      case "Listening":
        return "bg-blue-100 text-blue-800";
      case "Reading":
        return "bg-yellow-100 text-yellow-800";
      case "Writing":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student-lessons" aria-label="Back to Lessons">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Unit</h1>
        </div>
      </div>

      {/* Unit Summary */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{unit.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{unit.unitName}</Badge>
                <Badge className={getSkillColor(unit.skill)}>{unit.skill}</Badge>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{unit.duration} min</span>
                </div>
              </div>
            </div>
          </div>
          <Button asChild>
            {/* Navigate into the actual lesson detail page */}
            <Link href={`/student-lessons/${lessonId}`}>
              Start Lesson
            </Link>
          </Button>
        </div>
      </Card>

      {/* Objectives */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Objectives</h3>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {unit.objectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </Card>

      {/* Sections */}
      <div className="grid md:grid-cols-2 gap-4">
        {unit.sections.map((sec, i) => (
          <Card key={i} className="p-6">
            <h4 className="font-semibold mb-2">{sec.title}</h4>
            <p className="text-sm text-muted-foreground">{sec.description}</p>
          </Card>
        ))}
      </div>

      {/* Prerequisites */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
        <div className="flex flex-wrap gap-2">
          {unit.prerequisites.map((pre, i) => (
            <Badge key={i} variant="outline">
              {pre}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}