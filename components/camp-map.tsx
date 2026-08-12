"use client"

import {
  Check,
  Hand,
  HelpCircle,
  Heart,
  Lock,
  type LucideIcon,
  Palette,
  Sunrise,
  UtensilsCrossed,
  Users,
  Waves,
  Tent,
  Music,
  Bus,
} from "lucide-react"
import { CURRICULUM, type Unit } from "@/lib/curriculum"
import { cn } from "@/lib/utils"

const ICONS: Record<string, LucideIcon> = {
  wave: Hand,
  help: HelpCircle,
  meal: UtensilsCrossed,
  water: Waves,
  friends: Users,
  routine: Sunrise,
  feelings: Heart,
  numbers: Palette,
  tent: Tent,
  music: Music,
  bus: Bus,
}

function colorClasses(color: Unit["color"]) {
  switch (color) {
    case "sunny":
      return "bg-sunny text-sunny-foreground"
    case "success":
      return "bg-success text-success-foreground"
    case "accent":
      return "bg-accent text-accent-foreground"
    default:
      return "bg-lake text-primary-foreground"
  }
}

// Gentle zig-zag so the path feels like a trail.
const OFFSETS = ["translate-x-0", "translate-x-16", "translate-x-8", "-translate-x-8", "-translate-x-16"]

export function CampMap({
  isUnitUnlocked,
  isLessonComplete,
  onStartLesson,
}: {
  isUnitUnlocked: (index: number) => boolean
  isLessonComplete: (lessonId: string) => boolean
  onStartLesson: (unitId: string, lessonId: string) => void
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      {/* Hero */}
      <section className="mt-4 overflow-hidden rounded-4xl border border-border bg-card shadow-sm">
        <div className="bg-lake px-6 py-6 text-primary-foreground">
          <p className="font-heading text-sm font-bold uppercase tracking-widest opacity-90">
            Camp de la Baie · Aug 17–22
          </p>
          <h1 className="mt-1 font-heading text-3xl font-extrabold text-balance">
            Get ready to speak French all week!
          </h1>
          <p className="mt-2 max-w-md text-sm opacity-90 text-pretty">
            Play through each camp adventure to learn the phrases you&apos;ll
            really use — at the lake, at meals, and with new friends.
          </p>
        </div>
      </section>

      {/* Trail of units */}
      <section className="relative mt-8 flex flex-col items-center gap-4">
        {CURRICULUM.map((unit, i) => {
          const unlocked = isUnitUnlocked(i)
          const completed = unit.lessons.every((l) => isLessonComplete(l.id))
          const nextLesson = unit.lessons.find((l) => !isLessonComplete(l.id)) || unit.lessons[0]
          const Icon = ICONS[unit.icon] ?? Hand
          const offset = OFFSETS[i % OFFSETS.length]

          return (
            <div
              key={unit.id}
              className={cn("flex w-full flex-col items-center", offset)}
            >
              <button
                type="button"
                disabled={!unlocked}
                onClick={() => unlocked && onStartLesson(unit.id, nextLesson.id)}
                aria-label={`${unit.title}${unlocked ? "" : " (locked)"}`}
                className={cn(
                  "relative flex size-20 items-center justify-center rounded-full shadow-md transition-transform",
                  unlocked
                    ? cn(colorClasses(unit.color), "active:translate-y-0.5 hover:scale-105")
                    : "bg-muted text-muted-foreground",
                  unlocked && !completed && "ring-4 ring-offset-2 ring-offset-background ring-sunny/50",
                )}
              >
                {!unlocked ? (
                  <Lock className="size-7" />
                ) : (
                  <Icon className="size-9" />
                )}
                {completed && (
                  <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-success text-success-foreground">
                    <Check className="size-4" />
                  </span>
                )}
              </button>

              <div className="mt-2 max-w-52 text-center">
                <p
                  className={cn(
                    "font-heading text-base font-extrabold",
                    unlocked ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {unit.title}
                </p>
                <p className="text-xs text-muted-foreground text-pretty">
                  {unlocked ? unit.subtitle : "Finish the last stop to unlock"}
                </p>
              </div>

              {i < CURRICULUM.length - 1 && (
                <div
                  className={cn(
                    "mt-3 h-6 w-1.5 rounded-full",
                    completed ? "bg-success" : "bg-border",
                  )}
                  aria-hidden
                />
              )}
            </div>
          )
        })}
      </section>
    </main>
  )
}
