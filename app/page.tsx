"use client"

import { useState } from "react"
import { getLesson } from "@/lib/curriculum"
import { useProgress } from "@/lib/progress"
import { useSpeechReady } from "@/lib/speech"
import { TopBar } from "@/components/top-bar"
import { CampMap } from "@/components/camp-map"
import { LessonPlayer } from "@/components/lesson-player"

type Active = { unitId: string; lessonId: string } | null

export default function Page() {
  useSpeechReady()
  const { progress, loaded, completeLesson, reset, isLessonComplete, isUnitUnlocked } =
    useProgress()
  const [active, setActive] = useState<Active>(null)

  if (!loaded) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="font-heading text-lg font-bold text-muted-foreground">
          Loading camp…
        </p>
      </div>
    )
  }

  const activeLesson = active ? getLesson(active.unitId, active.lessonId) : null

  if (active && activeLesson) {
    return (
      <LessonPlayer
        lesson={activeLesson}
        onExit={() => setActive(null)}
        onFinish={(stars, gems) => {
          completeLesson(activeLesson.id, stars, gems)
          setActive(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-dvh">
      <TopBar progress={progress} />
      <CampMap
        isUnitUnlocked={isUnitUnlocked}
        isLessonComplete={isLessonComplete}
        onStartLesson={(unitId, lessonId) => setActive({ unitId, lessonId })}
      />
      <footer className="mx-auto max-w-3xl px-4 pb-10 text-center">
        <button
          type="button"
          onClick={() => {
            if (confirm("Reset all progress? This can't be undone.")) reset()
          }}
          className="text-xs font-semibold text-muted-foreground underline underline-offset-4"
        >
          Reset progress
        </button>
      </footer>
    </div>
  )
}
