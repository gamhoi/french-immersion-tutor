"use client"

import { Flame, Gem, Star } from "lucide-react"
import type { Progress } from "@/lib/progress"

export function TopBar({ progress }: { progress: Progress }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-lake text-primary-foreground shadow-sm">
            <span className="font-heading text-lg font-extrabold">B</span>
          </div>
          <div className="leading-tight">
            <p className="font-heading text-base font-extrabold text-foreground">
              Parle Français!
            </p>
            <p className="text-xs text-muted-foreground">Camp de la Baie</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Stat icon={<Flame className="size-4" />} value={progress.streakCount} tone="accent" label="day streak" />
          <Stat icon={<Star className="size-4 fill-current" />} value={progress.stars} tone="sunny" label="stars" />
          <Stat icon={<Gem className="size-4" />} value={progress.gems} tone="lake" label="gems" />
        </div>
      </div>
    </header>
  )
}

function Stat({
  icon,
  value,
  tone,
  label,
}: {
  icon: React.ReactNode
  value: number
  tone: "accent" | "sunny" | "lake"
  label: string
}) {
  const toneClass =
    tone === "accent"
      ? "text-accent"
      : tone === "sunny"
        ? "text-sunny"
        : "text-lake"
  return (
    <div
      className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1"
      aria-label={`${value} ${label}`}
    >
      <span className={toneClass}>{icon}</span>
      <span className="font-heading text-sm font-extrabold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  )
}
