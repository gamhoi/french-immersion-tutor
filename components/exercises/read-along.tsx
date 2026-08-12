"use client"

import { Headphones, Mic, Play, RotateCcw, Square } from "lucide-react"
import type { ReadExercise } from "@/lib/curriculum"
import { cn } from "@/lib/utils"
import { useRecorder } from "@/lib/speech"
import { SpeakButton } from "@/components/speak-button"

export function ReadAlong({
  exercise,
  onComplete,
}: {
  exercise: ReadExercise
  onComplete: (correct: boolean) => void
}) {
  const rec = useRecorder()

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-4">
        <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Listen, then say it out loud
        </p>

        <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <div
            className="animate-float-y flex size-20 items-center justify-center rounded-full bg-lake/15 text-lake"
            aria-hidden
          >
            <Headphones className="size-10" />
          </div>
          <div>
            <p className="font-heading text-3xl font-extrabold leading-tight text-foreground text-balance">
              {exercise.french}
            </p>
            <p className="mt-2 text-lg text-muted-foreground">{exercise.english}</p>
          </div>

          <div className="flex items-center gap-3">
            <SpeakButton text={exercise.french} />
            <SpeakButton text={exercise.french} slow />
          </div>
          <p className="text-xs text-muted-foreground">
            Blue = normal speed · Orange = slow
          </p>

          {/* Recorder */}
          <div className="w-full rounded-3xl border border-border bg-card p-5 shadow-sm">
            {!rec.supported ? (
              <p className="text-sm text-muted-foreground">
                Recording isn&apos;t available on this device, but you can still
                listen and repeat!
              </p>
            ) : (
              <div className="flex flex-col items-center gap-3">
                {!rec.recording ? (
                  <button
                    type="button"
                    onClick={rec.start}
                    className="flex items-center gap-2 rounded-2xl bg-accent px-5 py-3 font-heading text-lg font-extrabold text-accent-foreground shadow-sm transition-transform active:translate-y-px"
                  >
                    <Mic className="size-5" />
                    {rec.audioUrl ? "Record again" : "Record yourself"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={rec.stop}
                    className="flex items-center gap-2 rounded-2xl bg-destructive px-5 py-3 font-heading text-lg font-extrabold text-primary-foreground shadow-sm"
                  >
                    <Square className="size-5 fill-current" />
                    Stop recording
                  </button>
                )}

                {rec.recording && (
                  <div className="flex items-center gap-1.5 text-destructive">
                    <span className="size-2.5 animate-pulse rounded-full bg-destructive" />
                    <span className="text-sm font-bold">Recording…</span>
                  </div>
                )}

                {rec.audioUrl && !rec.recording && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <SpeakButton text={exercise.french} size="sm" />
                    <span className="text-xs font-semibold text-muted-foreground">
                      vs
                    </span>
                    <button
                      type="button"
                      onClick={rec.play}
                      className={cn(
                        "flex items-center gap-1.5 rounded-2xl bg-lake px-4 py-2.5 font-heading font-extrabold text-primary-foreground shadow-sm",
                        rec.playing && "animate-wiggle",
                      )}
                    >
                      <Play className="size-4 fill-current" />
                      Play mine
                    </button>
                    <button
                      type="button"
                      onClick={rec.clear}
                      aria-label="Delete recording"
                      className="flex size-9 items-center justify-center rounded-2xl bg-muted text-muted-foreground"
                    >
                      <RotateCcw className="size-4" />
                    </button>
                  </div>
                )}

                {rec.error && (
                  <p className="text-xs text-destructive">{rec.error}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border/70 bg-background/90 px-4 pb-6 pt-4 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => onComplete(true)}
            className="h-14 w-full rounded-2xl bg-primary font-heading text-lg font-extrabold uppercase tracking-wide text-primary-foreground shadow-md transition-transform active:translate-y-px"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
