import React from 'react'
import { Droplet, Leaf, Shield, Check, Clock } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'

export default function MissionCard({
  mission,
  status = 'pendente', // 'pendente' | 'em_validacao' | 'concluida'
  monthColor = '#EC6FA3',
  onComplete,
  onClick,
  className = '',
}) {
  const {
    id,
    titulo = 'Mapeie um ponto de alagamento',
    descricao = 'Ajude a vizinhança a evitar áreas de risco.',
    pontos = 10,
    eixo = 'A',
  } = mission || {}

  // Escolhe ícone temático de acordo com eixo
  const renderIcon = () => {
    switch (eixo) {
      case 'C':
        return <Droplet className="w-5 h-5 text-blue-500" />
      case 'D':
        return <Leaf className="w-5 h-5 text-emerald-500" />
      case 'B':
        return <Shield className="w-5 h-5 text-amber-500" />
      default:
        return <Droplet className="w-5 h-5 text-pink-500" />
    }
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
          {renderIcon()}
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900 leading-tight">
              {titulo}
            </h4>
            <Badge variant="points" points={pontos} />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            {descricao}
          </p>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-end">
        {status === 'concluida' ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>Concluída</span>
          </div>
        ) : status === 'em_validacao' ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Em validação</span>
          </div>
        ) : (
          <Button
            size="sm"
            variant="primary"
            monthColor={monthColor}
            onClick={(e) => {
              e.stopPropagation()
              if (onComplete) onComplete(mission)
            }}
          >
            Concluir
          </Button>
        )}
      </div>
    </div>
  )
}
