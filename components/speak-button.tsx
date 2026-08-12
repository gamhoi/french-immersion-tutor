"use client"

import { Turtle, Volume2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { speakFrench } from "@/lib/speech"

export function SpeakButton({
  text,
  slow = false,
  size = "md",
  className,
}: {
  text: string
  slow?: boolean
  size?: "sm" | "md"
  className?: string
}) {
  const [active, setActive] = useState(false)

  const handle = () => {
    speakFrench(text, { slow })
    setActive(true)
    window.setTimeout(() => setActive(false), 600)
  }

  const dim = size === "sm" ? "size-9" : "size-12"
  const icon = size === "sm" ? "size-4" : "size-6"

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={slow ? "Listen slowly" : "Listen"}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl text-primary-foreground shadow-sm transition-transform active:translate-y-px",
        slow ? "bg-accent text-accent-foreground" : "bg-lake",
        active && "animate-wiggle",
        dim,
        className,
      )}
    >
      {slow ? <Turtle className={icon} /> : <Volume2 className={icon} />}
    </button>
  )
}
