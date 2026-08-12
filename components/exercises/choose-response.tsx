"use client"

import { useState, useMemo } from "react"
import { Volume2 } from "lucide-react"
import type { ChooseExercise } from "@/lib/curriculum"
import { cn } from "@/lib/utils"
import { speakFrench } from "@/lib/speech"
import { SpeakButton } from "@/components/speak-button"
import { FeedbackBar, type CheckStatus } from "./feedback-bar"

export function ChooseResponse({
  exercise,
  onComplete,
}: {
  exercise: ChooseExercise
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

  const check = () => {
    if (selected === null) return
    const isCorrect = shuffledOptions[selected].originalIndex === exercise.correct
    setStatus(isCorrect ? "correct" : "wrong")
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-4">
        <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Choose the best reply
        </p>

        <div className="mt-3 rounded-2xl bg-secondary p-4">
          <p className="font-heading text-lg font-extrabold text-secondary-foreground text-pretty">
            {exercise.situation}
          </p>
          {exercise.question && (
            <button
              type="button"
              onClick={() => speakFrench(exercise.question!)}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-card px-3 py-2 text-left font-heading text-lg font-bold text-foreground shadow-sm"
            >
              <Volume2 className="size-4 text-lake" />
              {exercise.question}
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {shuffledOptions.map((opt, i) => {
            const isSelected = selected === i
            const showCorrect = status !== "idle" && opt.originalIndex === exercise.correct
            const showWrong =
              status === "wrong" && isSelected && opt.originalIndex !== exercise.correct
            return (
              <div key={i} className="flex items-center gap-2">
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
                <SpeakButton text={opt.text} size="sm" />
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
