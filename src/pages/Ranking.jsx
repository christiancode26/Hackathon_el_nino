import React, { useState } from 'react'
import { Trophy, Leaf, ChevronDown } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import RankingItem from '../components/RankingItem'

export default function Ranking() {
  const [period, setPeriod] = useState('Este mês')

  const top3 = [
    {
      rank: 2,
      name: 'Vila Mariana',
      initials: 'VI',
      points: 46780,
      pedestalHeight: 'h-24',
      badgeColor: 'bg-amber-100 text-amber-800',
      pedestalBg: 'bg-[#F9E8B6]',
    },
    {
      rank: 1,
      name: 'Pinheiros',
      initials: 'PI',
      points: 48920,
      pedestalHeight: 'h-32',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      pedestalBg: 'bg-[#DCE7E1]',
    },
    {
      rank: 3,
      name: 'Moema',
      initials: 'MO',
      points: 41340,
      pedestalHeight: 'h-20',
      badgeColor: 'bg-orange-100 text-orange-800',
      pedestalBg: 'bg-[#F2D7C2]',
    },
  ]

  const listNeighborhoods = [
    { rank: 4, initials: 'PE', name: 'Perdizes', points: 38910, percentage: 73 },
    { rank: 5, initials: 'BE', name: 'Bela Vista', points: 36250, percentage: 68 },
    { rank: 6, initials: 'SA', name: 'Saúde', points: 32840, percentage: 62 },
    { rank: 7, initials: 'IT', name: 'Itaim Bibi', points: 31100, percentage: 59 },
    { rank: 8, initials: 'TA', name: 'Tatuapé', points: 29400, percentage: 55 },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Topo do Ranking */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
            Impacto coletivo
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Ranking de bairros
          </h1>
        </div>

        {/* Dropdown de Período */}
        <div className="relative">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-2xl border border-gray-200 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50">
            <span>{period}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Meta da Cidade de São Paulo */}
      <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-100/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-green text-white flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                Meta de São Paulo
              </span>
              <h4 className="text-sm font-bold text-gray-800">
                25.680 de 30.000 ações
              </h4>
            </div>
          </div>
          <span className="text-2xl font-black text-brand-green">86%</span>
        </div>

        <ProgressBar progress={86} color="#EC6FA3" height="h-2.5" />
      </div>

      {/* Pódio dos 3 Melhores Bairros */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-end justify-center gap-4 sm:gap-8 pt-4 pb-2">
          {top3.map((bairro) => (
            <div key={bairro.rank} className="flex flex-col items-center text-center">
              {/* Avatar do Bairro */}
              <div className="relative mb-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-sm shadow-sm">
                  {bairro.initials}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-gray-950 font-black text-xs flex items-center justify-center border-2 border-white shadow">
                  {bairro.rank}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
                {bairro.name}
              </h4>
              <span className="text-[11px] font-extrabold text-gray-500 mb-2">
                {bairro.points.toLocaleString('pt-BR')} pts
              </span>

              {/* Pedestal */}
              <div
                className={`w-20 sm:w-28 ${bairro.pedestalHeight} ${bairro.pedestalBg} rounded-t-2xl shadow-inner flex items-center justify-center`}
              >
                <Trophy className="w-6 h-6 text-gray-700/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Tabela do 4º Lugar em Diante */}
        <div className="pt-4 space-y-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 pb-1">
            <span>Posição e Bairro</span>
            <span>Pontos / Meta</span>
          </div>

          <div className="space-y-2">
            {listNeighborhoods.map((item) => (
              <RankingItem
                key={item.rank}
                rank={item.rank}
                name={item.name}
                initials={item.initials}
                points={item.points}
                percentage={item.percentage}
                highlightColor="#EC6FA3"
              />
            ))}
          </div>

          {/* Destaque Fixo do Seu Bairro (Vila Mariana - 2º lugar) */}
          <div className="pt-3">
            <RankingItem
              rank={2}
              name="Vila Mariana"
              initials="VM"
              points={46780}
              isUserNeighborhood={true}
              highlightColor="#EC6FA3"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
