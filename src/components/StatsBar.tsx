import type { Stats } from '../types'

function Stat({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-slate-800/60 px-1.5 py-1 sm:gap-1.5 sm:px-2.5 sm:py-1.5">
      <span className="text-xs sm:text-sm">{emoji}</span>
      <span className="text-xs font-semibold text-slate-100 sm:text-sm">{value}</span>
      <span className="hidden text-xs text-slate-400 sm:inline">{label}</span>
    </div>
  )
}

export function StatsBar({ stats }: { stats: Stats }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Stat label="busted" value={stats.excusesBusted} emoji="🥊" />
      <Stat label="kept" value={stats.commitmentsKept} emoji="✅" />
      <Stat label="streak" value={stats.streak} emoji="🔥" />
    </div>
  )
}
