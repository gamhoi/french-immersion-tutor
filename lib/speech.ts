"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// ---- Text to speech (standard French pronunciation) ----

let cachedVoice: SpeechSynthesisVoice | null = null

function pickFrenchVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null
  if (cachedVoice) return cachedVoice
  const voices = window.speechSynthesis.getVoices()
  const fr =
    voices.find((v) => v.lang?.toLowerCase().startsWith("fr-fr")) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith("fr"))
  cachedVoice = fr || null
  return cachedVoice
}

export function speakFrench(text: string, opts?: { slow?: boolean }) {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = pickFrenchVoice()
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang || "fr-FR"
  utterance.rate = opts?.slow ? 0.65 : 0.92
  utterance.pitch = 1.05
  window.speechSynthesis.speak(utterance)
}

export function useSpeechReady() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return
    // Warm up voice list (some browsers load asynchronously).
    pickFrenchVoice()
    const handler = () => {
      cachedVoice = null
      pickFrenchVoice()
    }
    window.speechSynthesis.addEventListener("voiceschanged", handler)
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", handler)
  }, [])
}

// ---- Microphone recorder (record + play back to compare) ----

type RecorderState = {
  supported: boolean
  recording: boolean
  audioUrl: string | null
  playing: boolean
  error: string | null
}

export function useRecorder() {
  const [state, setState] = useState<RecorderState>({
    supported: true,
    recording: false,
    audioUrl: null,
    playing: false,
    error: null,
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const urlRef = useRef<string | null>(null)

  useEffect(() => {
    const supported =
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia &&
      typeof window !== "undefined" &&
      "MediaRecorder" in window
    setState((s) => ({ ...s, supported }))
  }, [])

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        if (urlRef.current) URL.revokeObjectURL(urlRef.current)
        const url = URL.createObjectURL(blob)
        urlRef.current = url
        setState((s) => ({ ...s, audioUrl: url, recording: false }))
        streamRef.current?.getTracks().forEach((t) => t.stop())
      }
      recorder.start()
      setState((s) => ({ ...s, recording: true, error: null }))
    } catch {
      setState((s) => ({
        ...s,
        recording: false,
        error: "Microphone permission is needed to record.",
      }))
    }
  }, [])

  const stop = useCallback(() => {
    mediaRecorderRef.current?.state === "recording" &&
      mediaRecorderRef.current.stop()
  }, [])

  const play = useCallback(() => {
    if (!urlRef.current) return
    if (!audioRef.current) audioRef.current = new Audio()
    audioRef.current.src = urlRef.current
    audioRef.current.onended = () => setState((s) => ({ ...s, playing: false }))
    audioRef.current.play()
    setState((s) => ({ ...s, playing: true }))
  }, [])

  const clear = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = null
    setState((s) => ({ ...s, audioUrl: null, playing: false }))
  }, [])

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  return { ...state, start, stop, play, clear }
}
