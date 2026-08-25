import { useState } from 'react'
import type { FormEvent } from 'react'

const QUICK_REPLIES = ["I don't have time", "I'm too tired", "I'll do it tomorrow", "I don't know how"]

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState('')

  const submit = (text: string) => {
    if (!text.trim() || disabled) return
    onSend(text)
    setValue('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(value)
  }

  return (
    <div className="border-t border-slate-800 bg-slate-900/80 p-3 sm:p-4">
      <div className="mb-2 flex flex-wrap gap-2">
        {QUICK_REPLIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => submit(q)}
            disabled={disabled}
            className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 transition hover:border-orange-500/60 hover:text-orange-300 disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit(value)
            }
          }}
          placeholder="What are you putting off, and why?"
          rows={1}
          className="max-h-32 flex-1 resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-orange-500/60 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="shrink-0 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  )
}
