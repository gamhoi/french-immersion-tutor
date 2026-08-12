"use client"

import { useMemo } from "react"
import { Gem, Star, Target } from "lucide-react"

const CONFETTI_COLORS = [
  "var(--lake)",
  "var(--sunny)",
  "var(--accent)",
  "var(--success)",
]

export function Celebration({
  starsEarned,
  gemsEarned,
  accuracy,
  onContinue,
}: {
  starsEarned: number
  gemsEarned: number
  accuracy: number
  onContinue: () => void
}) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 1.8 + Math.random() * 1.4,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 8,
      })),
    [],
  )

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 text-center">
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {confetti.map((c) => (
          <span
            key={c.id}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              animation: `confetti-fall ${c.duration}s linear ${c.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative animate-pop-in">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-sunny text-sunny-foreground shadow-lg">
          <Star className="size-14 fill-current" />
        </div>
        <h2 className="mt-6 font-heading text-3xl font-extrabold text-foreground">
          Lesson complete!
        </h2>
        <p className="mt-1 text-muted-foreground">Tu es une championne!</p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <ResultCard
            icon={<Star className="size-6 fill-current" />}
            tone="text-sunny"
            value={`+${starsEarned}`}
            label="Stars"
          />
          <ResultCard
            icon={<Target className="size-6" />}
            tone="text-success"
            value={`${accuracy}%`}
            label="Accuracy"
          />
          <ResultCard
            icon={<Gem className="size-6" />}
            tone="text-lake"
            value={`+${gemsEarned}`}
            label="Gems"
          />
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-8 h-14 w-full max-w-sm rounded-2xl bg-primary font-heading text-lg font-extrabold uppercase tracking-wide text-primary-foreground shadow-md transition-transform active:translate-y-px"
        >
          Back to camp map
        </button>
      </div>
    </div>
  )
}

function ResultCard({
  icon,
  tone,
  value,
  label,
}: {
  icon: React.ReactNode
  tone: string
  value: string
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <span className={tone}>{icon}</span>
      <span className="font-heading text-xl font-extrabold text-foreground">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
