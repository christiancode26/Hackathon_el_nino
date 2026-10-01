import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Lock, Sparkles, Recycle, ChevronRight } from 'lucide-react'
import { MONTH_COLORS } from '../theme/monthColors'

export default function Calendario() {
  const currentMonth = 10 // Outubro

  const monthsList = Object.values(MONTH_COLORS)

  // Status de cada mês no MVP: 1 a 9 concluídos, 10 em andamento, 11 e 12 bloqueados
  const getMonthStatus = (m) => {
    if (m < currentMonth) return 'concluido'
    if (m === currentMonth) return 'andamento'
    return 'bloqueado'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Banner Principal Topo (Dark Green Hero) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#153B2D] to-[#205C46] rounded-3xl p-6 sm:p-10 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
              Coleção 2026
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Um ano de impacto positivo
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              Complete as missões mensais para colecionar emblemas e desbloquear pulseiras exclusivas de material reciclado.
            </p>
          </div>

          {/* Emblemas Flutuantes Ilustrativos */}
          <div className="flex items-center gap-2 self-center md:self-auto shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#2B7DE9] text-white flex items-center justify-center shadow-lg transform -rotate-6">
              <span className="text-xl">💧</span>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#8E44AD] text-white flex items-center justify-center shadow-lg -mx-2 z-10">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#F4C430] text-white flex items-center justify-center shadow-lg transform rotate-6">
              <span className="text-xl">☀️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grade dos 12 Meses */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900">
            Emblemas das Campanhas
          </h2>
          <span className="text-xs font-bold text-gray-500">
            9 de 12 conquistados
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {monthsList.map((item) => {
            const status = getMonthStatus(item.month)

            if (status === 'concluido') {
              return (
                <div
                  key={item.month}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-2.5 hover:shadow-md transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-sm text-white font-bold text-xs relative group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: item.hex }}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span className="text-[9px] font-black">{item.short}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">{item.name}</h4>
                    <span className="text-[10px] text-gray-400 font-semibold block">Concluído</span>
                  </div>
                </div>
              )
            }

            if (status === 'andamento') {
              return (
                <div
                  key={item.month}
                  className="bg-pink-50/50 rounded-2xl p-4 border-2 border-[#EC6FA3] shadow-md flex flex-col items-center text-center space-y-2.5 relative transform scale-105"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EC6FA3] text-white flex flex-col items-center justify-center font-bold text-xs shadow-sm">
                    <span className="text-sm">🌱</span>
                    <span className="text-[9px] font-black">{item.short}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                    <span className="text-[10px] text-[#EC6FA3] font-bold block">Em andamento</span>
                  </div>
                </div>
              )
            }

            // Bloqueado
            return (
              <div
                key={item.month}
                className="bg-gray-50/60 rounded-2xl p-4 border border-dashed border-gray-200 flex flex-col items-center text-center space-y-2.5 opacity-60"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-600">{item.name}</h4>
                  <span className="text-[10px] text-gray-400 font-medium block">Bloqueado</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Seção Recompensas Reais - Marcos de Pulseira */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
              Recompensas reais
            </span>
            <h3 className="text-lg font-black text-gray-900">
              Marcos de pulseira
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <Recycle className="w-4 h-4 text-emerald-600" />
            <span>Material 100% reciclado</span>
          </div>
        </div>

        {/* Linha do Tempo dos Marcos */}
        <div className="py-4">
          <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
            {/* Barra de fundo cinza */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0" />
            {/* Barra preenchida até o marco alcançado */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-[#EC6FA3] z-0 w-1/2" />

            {/* Marco 1: 3 Meses (Disponível) */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white border-4 border-[#2B7DE9] flex items-center justify-center shadow-md">
                <span className="text-xs font-black text-[#2B7DE9]">PV</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">3 meses</span>
                <span className="text-[10px] font-bold text-emerald-600">Disponível</span>
              </div>
              <Link
                to="/resgate"
                className="mt-1 px-3 py-1 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-xs font-bold rounded-xl shadow-sm hover:shadow"
              >
                Ver pulseira
              </Link>
            </div>

            {/* Marco 2: 6 Meses */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white border-4 border-[#2E9E5B] flex items-center justify-center shadow-md">
                <span className="text-xs font-black text-[#2E9E5B]">PV</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">6 meses</span>
                <span className="text-[10px] font-medium text-gray-400">Faltam 3</span>
              </div>
            </div>

            {/* Marco 3: 12 Meses */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white border-4 border-[#F28C28] flex items-center justify-center shadow-md">
                <span className="text-xs font-black text-[#F28C28]">PV</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">12 meses</span>
                <span className="text-[10px] font-medium text-gray-400">Faltam 9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
