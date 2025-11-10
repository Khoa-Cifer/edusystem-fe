"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lesson, LessonContent } from "@/interfaces/lesson"
import { ChevronDown, ChevronUp, Eye, Edit, Trash, ExternalLink } from "lucide-react"

export interface LessonContentRowProps {
  lesson: Lesson;
  isExpanded: boolean;
  onToggle: () => void;
  contents: LessonContent[];
  isLoadingContents: boolean;
  getSkillColor: (skill: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
}

export function LessonContentRow({
  lesson,
  isExpanded,
  onToggle,
  contents,
  getSkillColor,
  getStatusBadge,
}: LessonContentRowProps) {
  return (
    <>
      {/* Main lesson row */}
      <tr className="border-b border-border hover:bg-muted/50 transition-colors">
        <td className="py-3 px-4">
          <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </td>
        <td className="py-3 px-4">
          <div>
            <div className="font-medium text-sm line-clamp-1">{lesson.lessonName}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">{lesson.content}</div>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className="text-sm">{lesson.unitName}</span>
        </td>
        <td className="py-3 px-4">
          <Badge variant="outline" className={`text-xs ${getSkillColor(lesson.skill)}`}>
            {lesson.skill}
          </Badge>
        </td>
        <td className="py-3 px-4">
          <span className="text-sm">{lesson.duration} min</span>
        </td>
        <td className="py-3 px-4">
          <span className="text-sm text-muted-foreground">{lesson.createBy}</span>
        </td>
        <td className="py-3 px-4">{getStatusBadge(lesson.status)}</td>
        <td className="py-3 px-4">
          <span className="text-sm text-muted-foreground">{lesson.createTime}</span>
        </td>
        <td className="py-3 px-4 text-right">
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </td>
      </tr>

      {/* Expanded content row */}
      {isExpanded && (
        <tr className="bg-muted/30 border-b border-border">
          <td colSpan={9} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">Lesson Content ({contents.length} items)</h4>
              </div>

              {contents.length === 0 ? (
                <div className="text-sm text-muted-foreground py-4 text-center">No content available</div>
              ) : (
                <div className="space-y-2">
                  {contents.map((content) => (
                    <div
                      key={content.lessonContentId}
                      className="bg-background rounded-lg p-3 border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                              {content.resourceType}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                content.status === "1"
                                  ? "bg-accent/20 text-accent border-accent/30"
                                  : "bg-muted/20 text-muted-foreground"
                              }`}
                            >
                              {content.status === "1" ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium line-clamp-1">{content.description}</p>
                          <div className="mt-2 text-xs text-muted-foreground space-y-1">
                            <p>Created by: {content.createdBy}</p>
                            <p>
                              Date:{" "}
                              {new Date(content.createdTime).toLocaleDateString() +
                                " " +
                                new Date(content.createdTime).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <a
                          href={content.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 mt-1"
                        >
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
