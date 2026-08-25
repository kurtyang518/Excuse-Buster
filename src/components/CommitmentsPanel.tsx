import type { Commitment } from '../types'

export function CommitmentsPanel({
  commitments,
  onDone,
  onDismiss,
}: {
  commitments: Commitment[]
  onDone: (id: string) => void
  onDismiss: (id: string) => void
}) {
  const active = commitments.filter((c) => !c.done)
  const done = commitments.filter((c) => c.done)

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          On the hook ({active.length})
        </h2>
        {active.length === 0 && (
          <p className="text-sm text-slate-500">
            Nothing yet. Tell Buster what you'll do — e.g. "I'll clean the kitchen by 8pm" — and it
            shows up here.
          </p>
        )}
        <ul className="flex flex-col gap-2">
          {active.map((c) => (
            <li
              key={c.id}
              className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 text-sm"
            >
              <p className="text-slate-100">{c.task}</p>
              {c.when && <p className="mt-0.5 text-xs text-orange-300">{c.when}</p>}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => onDone(c.id)}
                  className="rounded-lg bg-emerald-600/90 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-500"
                >
                  Mark done
                </button>
                <button
                  onClick={() => onDismiss(c.id)}
                  className="rounded-lg border border-slate-600 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-500"
                >
                  Drop it
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {done.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Done ({done.length})
          </h2>
          <ul className="flex flex-col gap-1.5">
            {done.map((c) => (
              <li
                key={c.id}
                className="rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-slate-500 line-through"
              >
                {c.task}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
