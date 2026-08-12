"use client"

import { useMemo, useState } from "react"
import type { WordBankExercise } from "@/lib/curriculum"
import { cn } from "@/lib/utils"
import { SpeakButton } from "@/components/speak-button"
import { FeedbackBar, type CheckStatus } from "./feedback-bar"

type Tile = { id: number; word: string }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function WordBank({
  exercise,
  onComplete,
}: {
  exercise: WordBankExercise
  onComplete: (correct: boolean) => void
}) {
  const allTiles = useMemo<Tile[]>(() => {
    const words = [...exercise.answer.split(" "), ...exercise.distractors]
    return shuffle(words.map((word, id) => ({ id, word })))
  }, [exercise])

  const [picked, setPicked] = useState<Tile[]>([])
  const [status, setStatus] = useState<CheckStatus>("idle")

  const pickedIds = new Set(picked.map((t) => t.id))
  const sentence = picked.map((t) => t.word).join(" ")

  const pick = (tile: Tile) => {
    if (status !== "idle") return
    setPicked((p) => [...p, tile])
  }
  const unpick = (tile: Tile) => {
    if (status !== "idle") return
    setPicked((p) => p.filter((t) => t.id !== tile.id))
  }

  const check = () => {
    const correct = sentence.trim() === exercise.answer.trim()
    setStatus(correct ? "correct" : "wrong")
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-4">
        <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Build the sentence
        </p>
        <div className="mt-2 flex items-center gap-3">
          <SpeakButton text={exercise.answer} />
          <p className="font-heading text-2xl font-extrabold leading-tight text-foreground text-balance">
            {exercise.english}
          </p>
        </div>

        {/* Answer area */}
        <div className="mt-6 min-h-16 border-b-2 border-dashed border-border pb-3">
          <div className="flex flex-wrap gap-2">
            {picked.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => unpick(tile)}
                className="animate-pop-in rounded-xl border border-border bg-card px-3 py-2 font-heading text-lg font-bold text-foreground shadow-sm"
              >
                {tile.word}
              </button>
            ))}
          </div>
        </div>

        {/* Word bank */}
        <div className="mt-6 flex flex-wrap gap-2">
          {allTiles.map((tile) => {
            const used = pickedIds.has(tile.id)
            return (
              <button
                key={tile.id}
                type="button"
                disabled={used || status !== "idle"}
                onClick={() => pick(tile)}
                className={cn(
                  "rounded-xl border border-border bg-card px-3 py-2 font-heading text-lg font-bold text-foreground shadow-sm transition-all active:translate-y-px",
                  used && "pointer-events-none opacity-30",
                )}
              >
                {tile.word}
              </button>
            )
          })}
        </div>
      </div>

      <FeedbackBar
        status={status}
        canCheck={picked.length > 0}
        onCheck={check}
        onContinue={() => onComplete(status === "correct")}
        solution={exercise.answer}
        meaning={exercise.english}
      />
    </div>
  )
}
