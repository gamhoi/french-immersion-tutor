"use client"

import { useState, useEffect, useMemo } from "react"
import { Volume2 } from "lucide-react"
import type { ListenExercise } from "@/lib/curriculum"
import { cn } from "@/lib/utils"
import { speakFrench } from "@/lib/speech"
import { FeedbackBar, type CheckStatus } from "./feedback-bar"

export function Listen({
  exercise,
  onComplete,
}: {
  exercise: ListenExercise
  onComplete: (correct: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [status, setStatus] = useState<CheckStatus>("idle")

  const shuffledOptions = useMemo(() => {
    const opts = exercise.options.map((text, i) => ({ text, originalIndex: i }))
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[opts[i], opts[j]] = [opts[j], opts[i]]
    }
    return opts
  }, [exercise])

  useEffect(() => {
    const t = setTimeout(() => speakFrench(exercise.audio), 300)
    return () => clearTimeout(t)
  }, [exercise.audio])

  const check = () => {
    if (selected === null) return
    const isCorrect = shuffledOptions[selected].originalIndex === exercise.correct
    setStatus(isCorrect ? "correct" : "wrong")
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-4">
        <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          What did you hear?
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => speakFrench(exercise.audio)}
            className="flex size-24 items-center justify-center rounded-3xl bg-lake text-primary-foreground shadow-lg transition-transform active:translate-y-1 hover:scale-105"
          >
            <Volume2 className="size-10" />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {shuffledOptions.map((opt, i) => {
            const isSelected = selected === i
            const showCorrect = status !== "idle" && opt.originalIndex === exercise.correct
            const showWrong =
              status === "wrong" && isSelected && opt.originalIndex !== exercise.correct
            return (
              <div key={i} className="flex items-center gap-2 animate-pop-in" style={{ animationDelay: `${i * 50}ms` }}>
                <button
                  type="button"
                  disabled={status !== "idle"}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "flex-1 rounded-2xl border-2 bg-card px-4 py-4 text-left font-heading text-lg font-bold text-foreground shadow-sm transition-all active:translate-y-px",
                    isSelected && status === "idle" && "border-lake ring-2 ring-lake/30",
                    !isSelected && status === "idle" && "border-border",
                    showCorrect && "border-success bg-success/10 text-success",
                    showWrong && "border-destructive bg-destructive/10 text-destructive",
                    status !== "idle" && !showCorrect && !showWrong && "border-border opacity-60",
                  )}
                >
                  {opt.text}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <FeedbackBar
        status={status}
        canCheck={selected !== null}
        onCheck={check}
        onContinue={() => onComplete(status === "correct")}
        solution={exercise.options[exercise.correct]}
        meaning={exercise.english}
      />
    </div>
  )
}
