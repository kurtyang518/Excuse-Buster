import { useEffect, useRef, useState } from 'react'
import { ChatBubble, TypingBubble } from './components/ChatBubble'
import { ChatInput } from './components/ChatInput'
import { CommitmentsPanel } from './components/CommitmentsPanel'
import { StatsBar } from './components/StatsBar'
import { useChat } from './hooks/useChat'

function App() {
  const {
    messages,
    commitments,
    stats,
    isTyping,
    sendMessage,
    markCommitmentDone,
    dismissCommitment,
    resetAll,
  } = useChat()
  const [panelOpen, setPanelOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex h-svh flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-lg shadow-sm shadow-orange-900/40">
            🔥
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold leading-tight text-slate-50 sm:text-base">
              <span className="sm:hidden">Buster</span>
              <span className="hidden sm:inline">Excuse Buster</span>
            </h1>
            <p className="hidden truncate text-xs text-slate-400 sm:block">
              your no-nonsense accountability buddy
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatsBar stats={stats} />
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="whitespace-nowrap rounded-lg border border-slate-700 px-2 py-1.5 text-xs text-slate-300 hover:border-slate-500 lg:hidden"
          >
            {panelOpen ? 'Chat' : `Board (${commitments.filter((c) => !c.done).length})`}
          </button>
          <button
            onClick={() => {
              if (confirm('Reset chat, stats, and commitments?')) resetAll()
            }}
            className="hidden rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:border-slate-500 sm:block"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <main className={`flex min-h-0 flex-1 flex-col ${panelOpen ? 'hidden lg:flex' : 'flex'}`}>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-6">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}
            {isTyping && <TypingBubble />}
          </div>
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </main>

        <aside
          className={`w-full shrink-0 border-slate-800 bg-slate-900/40 lg:flex lg:w-80 lg:border-l ${
            panelOpen ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <CommitmentsPanel
            commitments={commitments}
            onDone={markCommitmentDone}
            onDismiss={dismissCommitment}
          />
        </aside>
      </div>
    </div>
  )
}

export default App
