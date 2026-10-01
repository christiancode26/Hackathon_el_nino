import React from 'react'
import { AlertTriangle, CloudRain, Flame, Droplets, ChevronRight, Share2 } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'

export default function AlertCard({
  title = 'Chuva forte hoje à noite',
  description = 'Evite áreas alagadas entre 19h e 23h.',
  level = 'laranja', // verde, amarelo, laranja, vermelho
  type = 'Enchente',
  time = 'Hoje entre 19h e 23h',
  compact = false,
  actions = [],
  onNotifyNeighbors,
  onClick,
  className = '',
}) {
  const levelStyles = {
    verde: {
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      badgeLevel: 'verde',
      iconColor: 'text-[#2E9E5B]',
      tagBg: 'bg-[#2E9E5B]',
    },
    amarelo: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      badgeLevel: 'amarelo',
      iconColor: 'text-[#F4C430]',
      tagBg: 'bg-[#F4C430]',
    },
    laranja: {
      bg: 'bg-orange-50/70',
      border: 'border-orange-200',
      badgeLevel: 'laranja',
      iconColor: 'text-[#F28C28]',
      tagBg: 'bg-[#F28C28]',
    },
    vermelho: {
      bg: 'bg-red-50/70',
      border: 'border-red-200',
      badgeLevel: 'vermelho',
      iconColor: 'text-[#D64545]',
      tagBg: 'bg-[#D64545]',
    },
  }

  const currentLevel = levelStyles[level] || levelStyles.laranja

  const renderIcon = () => {
    switch (type?.toLowerCase()) {
      case 'enchente':
      case 'chuva':
        return <CloudRain className={`w-6 h-6 ${currentLevel.iconColor}`} />
      case 'saúde':
      case 'calor':
        return <Flame className={`w-6 h-6 ${currentLevel.iconColor}`} />
      case 'seca':
        return <Droplets className={`w-6 h-6 ${currentLevel.iconColor}`} />
      default:
        return <AlertTriangle className={`w-6 h-6 ${currentLevel.iconColor}`} />
    }
  }

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${currentLevel.bg} border ${currentLevel.border}`}>
            {renderIcon()}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-0.5">
              Alerta do seu bairro
            </div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">{title}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-3xl p-5 border ${currentLevel.border} shadow-sm space-y-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${currentLevel.bg} border ${currentLevel.border}`}>
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="risk" level={level}>
                Nível {level.toUpperCase()}
              </Badge>
              {type && (
                <span className="text-xs font-semibold text-gray-400">• {type}</span>
              )}
            </div>
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
            {time && <p className="text-xs text-gray-500">{time}</p>}
          </div>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
          {description}
        </p>
      )}

      {actions && actions.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            O que fazer agora:
          </div>
          <ul className="space-y-1.5 text-xs text-gray-700">
            {actions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-brand-green font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2 flex items-center justify-between border-t border-gray-100">
        <Button
          variant="outline"
          size="sm"
          icon={<Share2 className="w-4 h-4" />}
          onClick={onNotifyNeighbors}
        >
          Avisar vizinhos
        </Button>
      </div>
    </div>
  )
}
