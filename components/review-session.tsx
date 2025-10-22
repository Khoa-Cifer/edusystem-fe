"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, RotateCcw, Eye } from "lucide-react"
import Link from "next/link"

export function ReviewSession() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)

  const cards = [
    {
      question: "What is the derivative of x²?",
      answer: "2x",
      subject: "Mathematics",
      topic: "Calculus",
    },
    {
      question: "What is the capital of France?",
      answer: "Paris",
      subject: "Geography",
      topic: "European Capitals",
    },
    {
      question: "What is photosynthesis?",
      answer: "The process by which plants convert light energy into chemical energy",
      subject: "Biology",
      topic: "Plant Biology",
    },
  ]

  const totalCards = cards.length
  const progress = ((currentCard + 1) / totalCards) * 100

  const handleQuality = (quality: number) => {
    // SM-2 algorithm would be implemented here
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1)
      setShowAnswer(false)
    } else {
      setSessionComplete(true)
    }
  }

  if (sessionComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-12 bg-card border-border text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Session Complete!</h2>
          <p className="text-muted-foreground text-lg mb-8">Great job! You&apos;ve reviewed {totalCards} cards today.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/review">Back to Review</Link>
            </Button>
            <Button variant="outline" className="bg-transparent" onClick={() => window.location.reload()}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Review Again
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const card = cards[currentCard]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/review">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            Card {currentCard + 1} of {totalCards}
          </div>
          <Progress value={progress} className="w-32 h-2 mt-2" />
        </div>
        <div className="w-10" />
      </div>

      {/* Card */}
      <Card className="p-8 md:p-12 bg-card border-border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="secondary">{card.subject}</Badge>
          <Badge variant="outline">{card.topic}</Badge>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-8 w-full">
            <div>
              <h3 className="text-sm text-muted-foreground mb-4">Question</h3>
              <p className="text-2xl font-medium leading-relaxed">{card.question}</p>
            </div>

            {showAnswer && (
              <div className="pt-8 border-t border-border">
                <h3 className="text-sm text-muted-foreground mb-4">Answer</h3>
                <p className="text-xl text-accent leading-relaxed">{card.answer}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          {!showAnswer ? (
            <Button className="w-full" size="lg" onClick={() => setShowAnswer(true)}>
              <Eye className="w-5 h-5 mr-2" />
              Show Answer
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground mb-4">How well did you know this?</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => handleQuality(0)}>
                  <div className="text-center">
                    <div className="font-semibold">Again</div>
                    <div className="text-xs text-muted-foreground">Forgot</div>
                  </div>
                </Button>
                <Button variant="outline" className="bg-transparent" onClick={() => handleQuality(3)}>
                  <div className="text-center">
                    <div className="font-semibold">Hard</div>
                    <div className="text-xs text-muted-foreground">Difficult</div>
                  </div>
                </Button>
                <Button variant="outline" className="bg-transparent" onClick={() => handleQuality(4)}>
                  <div className="text-center">
                    <div className="font-semibold">Good</div>
                    <div className="text-xs text-muted-foreground">Recalled</div>
                  </div>
                </Button>
                <Button variant="outline" className="bg-transparent" onClick={() => handleQuality(5)}>
                  <div className="text-center">
                    <div className="font-semibold">Easy</div>
                    <div className="text-xs text-muted-foreground">Perfect</div>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Info */}
      <Card className="p-4 bg-muted/50 border-border">
        <p className="text-sm text-muted-foreground text-center">
          Rate your recall honestly. The algorithm will adjust review intervals based on your performance.
        </p>
      </Card>
    </div>
  )
}
