"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { Lesson } from "@/lib/curriculum"
import { WordBank } from "./exercises/word-bank"
import { Spelling } from "./exercises/spelling"
import { ChooseResponse } from "./exercises/choose-response"
import { ReadAlong } from "./exercises/read-along"
import { Listen } from "./exercises/listen"
import { Celebration } from "./celebration"

export function LessonPlayer({
  lesson,
  onExit,
  onFinish,
}: {
  lesson: Lesson
  onExit: () => void
  onFinish: (stars: number, gems: number) => void
}) {
  const [index, setIndex] = useState(0)
  const [scored, setScored] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const [finalStars, setFinalStars] = useState(0)
  const [finalGems, setFinalGems] = useState(0)

  const total = lesson.exercises.length
  const exercise = lesson.exercises[index]
  const progressPct = (index / total) * 100

  const accuracy = scored === 0 ? 100 : Math.round((correct / scored) * 100)

  const handleComplete = (wasCorrect: boolean) => {
    const isScored = exercise.type !== "read"
    const newScored = scored + (isScored ? 1 : 0)
    const newCorrect = correct + (isScored && wasCorrect ? 1 : 0)
    setScored(newScored)
    setCorrect(newCorrect)

    if (index + 1 >= total) {
      const acc = newScored === 0 ? 100 : Math.round((newCorrect / newScored) * 100)
      const stars = acc >= 90 ? 3 : acc >= 60 ? 2 : 1
      const gems = newCorrect * 2 + 5
      setFinalStars(stars)
      setFinalGems(gems)
      setDone(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (done) {
    return (
      <Celebration
        starsEarned={finalStars}
        gemsEarned={finalGems}
        accuracy={accuracy}
        onContinue={() => onFinish(finalStars, finalGems)}
      />
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Progress header */}
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-4">
        <button
          type="button"
          onClick={onExit}
          aria-label="Quit lesson"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="size-6" />
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-success transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Current exercise (key resets internal state per step) */}
      {exercise.type === "word-bank" && (
        <WordBank key={index} exercise={exercise} onComplete={handleComplete} />
      )}
      {exercise.type === "spelling" && (
        <Spelling key={index} exercise={exercise} onComplete={handleComplete} />
      )}
      {exercise.type === "choose" && (
        <ChooseResponse key={index} exercise={exercise} onComplete={handleComplete} />
      )}
      {exercise.type === "read" && (
        <ReadAlong key={index} exercise={exercise} onComplete={handleComplete} />
      )}
      {exercise.type === "listen" && (
        <Listen key={index} exercise={exercise} onComplete={handleComplete} />
      )}
    </div>
  )
}
