"use client"

import { Check, Volume2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { speakFrench } from "@/lib/speech"

export type CheckStatus = "idle" | "correct" | "wrong"

export function FeedbackBar({
  status,
  canCheck,
  onCheck,
  onContinue,
  solution,
  meaning,
}: {
  status: CheckStatus
  canCheck: boolean
  onCheck: () => void
  onContinue: () => void
  solution?: string
  meaning?: string
}) {
  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 border-t px-4 pb-6 pt-4 transition-colors",
        status === "correct" && "border-success/30 bg-success/10",
        status === "wrong" && "border-destructive/30 bg-destructive/10",
        status === "idle" && "border-border/70 bg-background/90 backdrop-blur",
      )}
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {status === "correct" && (
          <div className="flex items-center gap-2 animate-pop-in">
            <span className="flex size-8 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-5" />
            </span>
            <p className="font-heading text-lg font-extrabold text-success">
              Bravo! Nice work!
            </p>
          </div>
        )}

        {status === "wrong" && (
          <div className="flex items-start gap-2 animate-pop-in">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive text-primary-foreground">
              <X className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-base font-extrabold text-destructive">
                Correct answer:
              </p>
              {solution && (
                <button
                  type="button"
                  onClick={() => speakFrench(solution)}
                  className="mt-0.5 inline-flex items-center gap-1.5 text-left font-heading text-lg font-bold text-foreground"
                >
                  <Volume2 className="size-4 text-lake" />
                  {solution}
                </button>
              )}
              {meaning && (
                <p className="text-sm text-muted-foreground">{meaning}</p>
              )}
            </div>
          </div>
        )}

        {status === "idle" ? (
          <button
            type="button"
            disabled={!canCheck}
            onClick={onCheck}
            className="h-14 w-full rounded-2xl bg-primary font-heading text-lg font-extrabold uppercase tracking-wide text-primary-foreground shadow-md transition-transform active:translate-y-px disabled:opacity-40"
          >
            Check
          </button>
        ) : (
          <button
            type="button"
            onClick={onContinue}
            className={cn(
              "h-14 w-full rounded-2xl font-heading text-lg font-extrabold uppercase tracking-wide text-primary-foreground shadow-md transition-transform active:translate-y-px",
              status === "correct" ? "bg-success" : "bg-destructive",
            )}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
