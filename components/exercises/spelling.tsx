"use client"

import { useRef, useState } from "react"
import type { SpellingExercise } from "@/lib/curriculum"
import { SpeakButton } from "@/components/speak-button"
import { AccentKeys } from "@/components/accent-keys"
import { FeedbackBar, type CheckStatus } from "./feedback-bar"

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accent-insensitive
    .replace(/[.,!?'’]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function Spelling({
  exercise,
  onComplete,
}: {
  exercise: SpellingExercise
  onComplete: (correct: boolean) => void
}) {
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<CheckStatus>("idle")
  const inputRef = useRef<HTMLInputElement>(null)

  const insert = (char: string) => {
    const el = inputRef.current
    if (!el) {
      setValue((v) => v + char)
      return
    }
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? value.length
    const next = value.slice(0, start) + char + value.slice(end)
    setValue(next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + char.length, start + char.length)
    })
  }

  const check = () => {
    const correct = normalize(value) === normalize(exercise.answer)
    setStatus(correct ? "correct" : "wrong")
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-4">
        <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Write it in French
        </p>
        <div className="mt-2 flex items-center gap-3">
          <SpeakButton text={exercise.answer} />
          <p className="font-heading text-2xl font-extrabold leading-tight text-foreground text-balance">
            {exercise.english}
          </p>
        </div>

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Type here…"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.nativeEvent.isComposing &&
              e.keyCode !== 229 &&
              value.trim() &&
              status === "idle"
            ) {
              check()
            }
          }}
          className="mt-6 w-full rounded-2xl border-2 border-border bg-card px-4 py-4 font-heading text-xl font-bold text-foreground shadow-sm outline-none focus:border-lake disabled:opacity-70"
        />

        <p className="mt-3 mb-2 text-xs font-semibold text-muted-foreground">
          Need an accent? Tap a letter:
        </p>
        <AccentKeys onInsert={insert} />
      </div>

      <FeedbackBar
        status={status}
        canCheck={value.trim().length > 0}
        onCheck={check}
        onContinue={() => onComplete(status === "correct")}
        solution={exercise.answer}
        meaning={exercise.english}
      />
    </div>
  )
}
