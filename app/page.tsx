import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Brain, BarChart3, Users, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">EduFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="text-muted-foreground">Learning made</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              intelligent
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            A comprehensive learning management system with smart review algorithms, collaborative lesson planning, and
            powerful analytics to enhance education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <Link href="/signup">Get started free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
              <Link href="/demo">View demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to teach and learn</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed for teachers, students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lesson Planning</h3>
            <p className="text-muted-foreground leading-relaxed">
              Rich-text editor with templates. Create, organize, and share lesson plans with your team.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Review</h3>
            <p className="text-muted-foreground leading-relaxed">
              Spaced repetition using SM-2 algorithm. Optimize learning retention with intelligent review scheduling.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground leading-relaxed">
              Track progress, analyze performance, and identify areas for improvement with detailed insights.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-chart-3" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Question Bank</h3>
            <p className="text-muted-foreground leading-relaxed">
              Create and manage MCQ, True/False, and short answer questions. Build quizzes automatically or manually.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-chart-4" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
            <p className="text-muted-foreground leading-relaxed">
              PWA support with offline capabilities. Take quizzes and review materials without internet connection.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-chart-5/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-chart-5" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
            <p className="text-muted-foreground leading-relaxed">
              Secure permissions for teachers, students, and admins. Control who can access and modify content.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your learning experience?</h2>
            <p className="text-muted-foreground text-lg mb-8">Join thousands of educators and students using EduFlow</p>
            <Button size="lg" asChild>
              <Link href="/signup">Start learning today</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">EduFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 EduFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
