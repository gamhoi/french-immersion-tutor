"use client"

import { useCallback, useEffect, useState } from "react"
import { CURRICULUM } from "./curriculum"

const STORAGE_KEY = "cdlb-progress-v1"

export type Progress = {
  completedLessons: string[]
  stars: number
  gems: number
  streakCount: number
  lastActiveDay: string | null // YYYY-MM-DD
}

const DEFAULT_PROGRESS: Progress = {
  completedLessons: [],
  stars: 0,
  gems: 0,
  streakCount: 0,
  lastActiveDay: null,
}

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setProgress({ ...DEFAULT_PROGRESS, ...JSON.parse(raw) })
      }
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true)
  }, [])

  const persist = useCallback((next: Progress) => {
    setProgress(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore quota errors
    }
  }, [])

  const completeLesson = useCallback(
    (lessonId: string, starsEarned: number, gemsEarned: number) => {
      setProgress((prev) => {
        const alreadyDone = prev.completedLessons.includes(lessonId)

        // streak logic
        const today = todayKey()
        let streakCount = prev.streakCount
        if (prev.lastActiveDay !== today) {
          streakCount =
            prev.lastActiveDay === yesterdayKey() ? prev.streakCount + 1 : 1
        }
        if (streakCount === 0) streakCount = 1

        const next: Progress = {
          completedLessons: alreadyDone
            ? prev.completedLessons
            : [...prev.completedLessons, lessonId],
          // replaying an old lesson still gives a small reward but not full
          stars: prev.stars + (alreadyDone ? 0 : starsEarned),
          gems: prev.gems + gemsEarned,
          streakCount,
          lastActiveDay: today,
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [],
  )

  const reset = useCallback(() => {
    persist(DEFAULT_PROGRESS)
  }, [persist])

  const isLessonComplete = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons],
  )

  const isUnitUnlocked = useCallback(
    (unitIndex: number) => {
      if (unitIndex === 0) return true
      const prevUnit = CURRICULUM[unitIndex - 1]
      return prevUnit.lessons.every((l) =>
        progress.completedLessons.includes(l.id),
      )
    },
    [progress.completedLessons],
  )

  return {
    progress,
    loaded,
    completeLesson,
    reset,
    isLessonComplete,
    isUnitUnlocked,
  }
}
