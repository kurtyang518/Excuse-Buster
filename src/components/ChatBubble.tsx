import type { ChatMessage } from '../types'

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isBuddy = message.role === 'buddy'
  return (
    <div className={`flex ${isBuddy ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] gap-2.5 ${isBuddy ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBuddy && (
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-sm shadow-sm shadow-orange-900/40">
            🔥
          </div>
        )}
        <div
          className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${
            isBuddy
              ? 'rounded-tl-sm bg-slate-800 text-slate-100'
              : 'rounded-tr-sm bg-orange-600 text-white'
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  )
}

export function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[85%] gap-2.5">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-sm shadow-sm shadow-orange-900/40">
          🔥
        </div>
        <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
        </div>
      </div>
    </div>
  )
}
