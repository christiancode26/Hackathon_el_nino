import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Flame, Zap, Clock, ChevronRight, Check, Droplets, Trophy, Award, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getMonthTheme } from '../theme/monthColors'
import { getMissionsByMonth } from '../data/missions'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import BraceletIcon from '../components/BraceletIcon'

export default function Home() {
  const navigate = useNavigate()
  const { profile, userMissions, completeMission } = useAuth()
  const [toastMessage, setToastMessage] = useState(null)

  // Mês atual (10 = Outubro conforme o Figma)
  const currentMonth = 10
  const theme = getMonthTheme(currentMonth)
  const monthMissions = getMissionsByMonth(currentMonth)

  // Conta missões do mês concluídas
  const completedCount = monthMissions.filter(
    (m) => userMissions[m.id] === 'concluida'
  ).length
  const progressPercent = (completedCount / monthMissions.length) * 100

  // Tratamento da conclusão de missão com bônus
  const handleComplete = async (mission) => {
    const result = await completeMission(mission)
    if (result) {
      if (result.bonusWon) {
        setToastMessage(`🎉 Parabéns! Você completou as missões do mês! Ganhou +${result.pointsWon} pontos (com bônus de +5)!`)
      } else {
        setToastMessage(`✨ Ação concluída! +${result.pointsWon} pontos e sequência aumentada!`)
      }
      setTimeout(() => setToastMessage(null), 4000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Toast de Notificação de Pontos */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#153B2D] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Grid Principal: Conteúdo Central + Coluna Lateral Direita (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna Principal (8 colunas no Desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cabeçalho da Home */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                BOM DIA, {profile?.nome?.split(' ')[0]?.toUpperCase() || 'VIZINHO(A)'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
                Vamos cuidar do nosso bairro?
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {profile?.bairro || 'Vila Mariana'}, {profile?.cidade || 'São Paulo'}
                </span>
              </div>
            </div>

            {/* Badges de Streak e Pontos */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm text-xs font-bold text-gray-700">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{profile?.streak || 7} dias</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm text-xs font-bold text-gray-700">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{profile?.pontos || 380} pontos</span>
              </div>
            </div>
          </div>

          {/* Alerta do Dia (Mock - leva para a aba Alertas) */}
          <Link
            to="/alertas"
            className="block bg-blue-50/70 border border-blue-200/80 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                  <Droplets className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 mb-0.5">
                    Alerta do seu bairro
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    Chuva forte hoje à noite
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Evite áreas alagadas entre 19h e 23h.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </Link>

          {/* Card Hero da Campanha do Mês (Cor do Mês: Rosa #EC6FA3 em Outubro) */}
          <div
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-lg transition-transform"
            style={{ backgroundColor: theme.hex }}
          >
            {/* Decoração de fundo sutil */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="150" cy="50" r="80" fill="#fff" />
                <circle cx="180" cy="150" r="60" fill="#fff" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white">
                  Campanha de {theme.short}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Bairro resiliente
                </h2>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  Prepare sua comunidade para as mudanças do clima e ganhe a pulseira física exclusiva.
                </p>

                {/* Barra de Progresso das missões do mês */}
                <div className="pt-3">
                  <div className="flex justify-between items-center text-xs text-white/90 font-bold mb-1.5">
                    <span>
                      {completedCount} de {monthMissions.length} missões
                    </span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Mascote Ilustrado (Gota amigável estilo Duolingo) */}
              <div className="self-center sm:self-auto shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center p-3 shadow-inner">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    {/* Corpo da gota */}
                    <path
                      d="M50 15 C50 15 20 50 20 70 A30 30 0 0 0 80 70 C80 50 50 15 50 15 Z"
                      fill="#5BC0EB"
                    />
                    {/* Olhinhos */}
                    <circle cx="42" cy="65" r="3.5" fill="#1F2933" />
                    <circle cx="58" cy="65" r="3.5" fill="#1F2933" />
                    {/* Brilho nos olhos */}
                    <circle cx="43" cy="64" r="1.2" fill="#fff" />
                    <circle cx="59" cy="64" r="1.2" fill="#fff" />
                    {/* Sorrisinho */}
                    <path
                      d="M45 74 Q50 78 55 74"
                      stroke="#1F2933"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Bochechinhas coradas */}
                    <circle cx="36" cy="69" r="2.5" fill="#FF8BA7" opacity="0.6" />
                    <circle cx="64" cy="69" r="2.5" fill="#FF8BA7" opacity="0.6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Seção Missões de Hoje */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                  Missões de hoje
                </span>
                <h3 className="text-lg font-black text-gray-900">
                  Pequenas ações, grande impacto
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Renovam em 8h</span>
              </div>
            </div>

            {/* Lista das Missões */}
            <div className="space-y-3">
              {/* Missão 1 do Mês Atual (Dinâmica de missions.js) */}
              {monthMissions.map((mission) => {
                const status = userMissions[mission.id] || 'pendente'
                return (
                  <div
                    key={mission.id}
                    onClick={() => navigate(`/missao/${mission.id}`)}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-pink-50 text-[#EC6FA3] border border-pink-100 flex items-center justify-center shrink-0">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900 leading-tight hover:text-[#EC6FA3] transition-colors">
                            {mission.titulo}
                          </h4>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]">
                            ⚡ +{mission.pontos} pts
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {mission.descricao}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-end">
                      {status === 'concluida' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          <Check className="w-3.5 h-3.5" />
                          <span>Concluída</span>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="primary"
                          monthColor={theme.hex}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleComplete(mission)
                          }}
                        >
                          Concluir
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Missões complementares visíveis na imagem de referência do Figma */}
              {/* Missão em Validação */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">
                        Cuide de uma árvore da sua rua
                      </h4>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]">
                        ⚡ +20 pts
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Uma sombra hoje refresca o bairro amanhã.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Em validação</span>
                  </div>
                </div>
              </div>

              {/* Missão Concluída */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-85">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">
                        Faça o desafio do banho de 5 minutos
                      </h4>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]">
                        ⚡ +10 pts
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Economize água e inspire quem mora com você.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                    <Check className="w-3.5 h-3.5" />
                    <span>Concluída</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Lateral Direita (4 colunas no Desktop - Cards do Figma) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card: Seu Nível */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#EC6FA3] border border-pink-100 flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                  Seu nível
                </span>
                <h4 className="text-base font-bold text-gray-900">
                  {profile?.nivel || 'Guardião da Gota'}
                </h4>
              </div>
            </div>

            <ProgressBar
              progress={68}
              color="#EC6FA3"
              label="120 pts para o nível 5"
              valueText="68%"
              showLabel
            />
          </div>

          {/* Card: Meta do Bairro */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                  Meta do bairro
                </span>
                <h4 className="text-base font-bold text-gray-900">
                  {profile?.bairro || 'Vila Mariana'}
                </h4>
              </div>
              <span className="text-xl font-black text-emerald-600">72%</span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Faltam 56 ações para liberar uma composteira comunitária.
            </p>

            <ProgressBar progress={72} color="#EC6FA3" height="h-2" />

            <Link
              to="/ranking"
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-black pt-1"
            >
              <span>Ver ranking</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card: Próxima Recompensa (Pulseira Física) */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
              Próxima recompensa
            </span>

            {/* Pulseira Sustentável Ilustrada */}
            <div className="py-2 flex justify-center">
              <BraceletIcon color="#EC6FA3" size="lg" monogram="PV" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900">Pulseira de 3 meses</h4>
              <p className="text-xs text-gray-400 mt-0.5">Falta só 1 emblema.</p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => navigate('/calendario')}
            >
              Ver coleção
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
