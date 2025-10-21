"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Brain, FileQuestion, BarChart3, Users, Bell, Menu, X, Home, Share2, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeacherLayoutProps {
  children: React.ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const teacherNav = [
    { name: "Dashboard", href: "/(teacher)/dashboard", icon: Home },
    { name: "Lessons", href: "/(teacher)/lessons", icon: BookOpen },
    { name: "Question Bank", href: "/(teacher)/questions", icon: FileQuestion },
    { name: "Quizzes", href: "/(teacher)/quizzes", icon: Brain },
    { name: "Analytics", href: "/(teacher)/analytics", icon: BarChart3 },
    { name: "Students", href: "/(teacher)/students", icon: Users },
    { name: "Shared", href: "/(teacher)/shared", icon: Share2 },
  ]

  return (
    <div className="min-h-screen bg-background dark">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link href="/(teacher)/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">EduFlow</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {teacherNav.map((item) => {
              const isActive = pathname.includes(item.href.replace("/(teacher)", ""))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">PS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Professor Smith</div>
                <div className="text-xs text-muted-foreground">Teacher</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/50 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
