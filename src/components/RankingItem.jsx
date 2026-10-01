import React from 'react'
import ProgressBar from './ProgressBar'

export default function RankingItem({
  rank = 1,
  name = 'Vila Mariana',
  initials = 'VM',
  points = 46780,
  percentage = 75,
  isUserNeighborhood = false,
  highlightColor = '#EC6FA3',
  className = '',
}) {
  if (isUserNeighborhood) {
    return (
      <div
        className={`rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-3 ${className}`}
        style={{ backgroundColor: highlightColor }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-extrabold w-5 text-center">{rank}</span>
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white text-xs">
            {initials || name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-85 block">
              Seu bairro
            </span>
            <span className="text-base font-bold">{name}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-base font-extrabold">
            {points.toLocaleString('pt-BR')} <span className="text-xs font-medium">pts</span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="text-xs font-bold text-gray-400 w-4 text-center shrink-0">
          {rank}
        </span>
        <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
          {initials || name.substring(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-gray-800 truncate">{name}</span>
            <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
              <span className="text-gray-400">{percentage}%</span>
              <span className="font-bold text-gray-700">{points.toLocaleString('pt-BR')}</span>
            </div>
          </div>
          <ProgressBar progress={percentage} color={highlightColor} height="h-1.5" />
        </div>
      </div>
    </div>
  )
}
