import { useCallback, useEffect, useState } from 'react'
import { bustExcuse, tryParseCommitment } from '../engine/excuseEngine'
import type { ChatMessage, Commitment, Stats } from '../types'

const MESSAGES_KEY = 'excuse-buster.messages'
const COMMITMENTS_KEY = 'excuse-buster.commitments'
const STATS_KEY = 'excuse-buster.stats'

const INTRO: ChatMessage = {
  id: 'intro',
  role: 'buddy',
  text:
    "Hey, I'm Buster — your excuse-busting buddy. Tell me what you keep putting off, and why you haven't done it yet. I'll call it out and push you toward a first step. Say something like \"I'll write the report by 5pm\" and I'll hold you to it.",
  ts: Date.now(),
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => load(MESSAGES_KEY, [INTRO]))
  const [commitments, setCommitments] = useState<Commitment[]>(() => load(COMMITMENTS_KEY, []))
  const [stats, setStats] = useState<Stats>(() =>
    load(STATS_KEY, { excusesBusted: 0, commitmentsKept: 0, streak: 0 }),
  )
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem(COMMITMENTS_KEY, JSON.stringify(commitments))
  }, [commitments])

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  }, [stats])

  const addMessage = useCallback((role: ChatMessage['role'], text: string) => {
    setMessages((prev) => [...prev, { id: uid(), role, text, ts: Date.now() }])
  }, [])

  const sendMessage = useCallback(
    (raw: string) => {
      const text = raw.trim()
      if (!text) return
      addMessage('user', text)

      const commitment = tryParseCommitment(text)

      setIsTyping(true)
      const delay = 500 + Math.random() * 600
      window.setTimeout(() => {
        setIsTyping(false)

        if (commitment) {
          const entry: Commitment = {
            id: uid(),
            task: commitment.task,
            when: commitment.when,
            createdAt: Date.now(),
            done: false,
          }
          setCommitments((prev) => [entry, ...prev])
          setStats((prev) => ({ ...prev, excusesBusted: prev.excusesBusted + 1 }))
          const alreadyMentionsWhen =
            commitment.when && commitment.task.toLowerCase().includes(commitment.when.toLowerCase())
          const whenText = commitment.when && !alreadyMentionsWhen ? ` ${commitment.when}` : ''
          addMessage(
            'buddy',
            `Locked in: "${commitment.task}"${whenText}. I've logged it on your board — come back and mark it done when it's done. No quiet backing out.`,
          )
          return
        }

        const { reply, followUp, category } = bustExcuse(text)
        if (category !== 'greeting' && category !== 'help') {
          setStats((prev) => ({ ...prev, excusesBusted: prev.excusesBusted + 1 }))
        }
        const full = followUp ? `${reply}\n\n${followUp}` : reply
        addMessage('buddy', full)
      }, delay)
    },
    [addMessage],
  )

  const markCommitmentDone = useCallback((id: string) => {
    setCommitments((prev) => prev.map((c) => (c.id === id ? { ...c, done: true } : c)))
    setStats((prev) => ({
      ...prev,
      commitmentsKept: prev.commitmentsKept + 1,
      streak: prev.streak + 1,
    }))
    addMessage('buddy', "That's a win. Logged it — streak's up. What's next on the list?")
  }, [addMessage])

  const dismissCommitment = useCallback((id: string) => {
    setCommitments((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const resetAll = useCallback(() => {
    setMessages([INTRO])
    setCommitments([])
    setStats({ excusesBusted: 0, commitmentsKept: 0, streak: 0 })
  }, [])

  return {
    messages,
    commitments,
    stats,
    isTyping,
    sendMessage,
    markCommitmentDone,
    dismissCommitment,
    resetAll,
  }
}
