"use client"

const ACCENTS = ["é", "è", "ê", "à", "ç", "î", "ï", "ô", "û", "œ", "’"]

export function AccentKeys({ onInsert }: { onInsert: (char: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ACCENTS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onInsert(c)}
          className="h-9 min-w-9 rounded-xl border border-border bg-card px-2 font-heading text-base font-bold text-foreground shadow-sm transition-transform active:translate-y-px hover:bg-muted"
        >
          {c}
        </button>
      ))}
    </div>
  )
}
