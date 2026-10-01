import React, { useState, useEffect } from 'react'
import {
  AlertTriangle,
  PhoneCall,
  CheckSquare,
  Square,
  Share2,
  CloudRain,
  Flame,
  Droplets,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchLiveWeatherAlerts, MOCK_ALERTS } from '../services/weatherService'
import Badge from '../components/Badge'
import Button from '../components/Button'

export default function Alertas() {
  const { profile, addPoints } = useAuth()
  const [alerts, setAlerts] = useState(MOCK_ALERTS)
  const [isLive, setIsLive] = useState(false)
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('Todos')
  const [toastMessage, setToastMessage] = useState(null)
  const [demoScenario, setDemoScenario] = useState('normal') // 'normal' | 'calor' | 'chuva' | 'seca'

  // Checklist interativo do Plano de Emergência (Seção 5)
  const [checklist, setChecklist] = useState({
    mochila: false,
    contatos: true,
    rota: false,
    pontoEncontro: false,
    abrigo: false,
  })

  // Carrega alertas do clima (Open-Meteo) com fallback para dados mock
  const loadAlerts = async () => {
    setLoadingWeather(true)
    const result = await fetchLiveWeatherAlerts(profile?.cidade || 'São Paulo')
    setAlerts(result.alerts)
    setIsLive(result.isLive)
    setLoadingWeather(false)
  }

  // Simula cenários específicos para a apresentação do Pitch (Etapa 13)
  const handleScenarioChange = (scenario) => {
    setDemoScenario(scenario)
    if (scenario === 'calor') {
      const calorAlert = {
        id: 'pitch-calor',
        titulo: 'Onda de calor extremo (39°C) detectada',
        nivel: 'vermelho',
        tipo: 'Saúde',
        horario: 'Agora até 17h',
        descricao: 'Temperaturas extremas recordes sob influência do Super El Niño. Risco severo de hipertermia e desidratação.',
        acoes: [
          'Leve água fresca a pessoas idosas ou vizinhos vulneráveis',
          'Beba água mineral a cada 30 minutos',
          'Evite exposição direta ao sol forte no bairro',
        ],
        missaoTexto: 'Levar água a um vizinho ou ligar para ele',
      }
      setAlerts([calorAlert, ...MOCK_ALERTS.filter((a) => a.tipo !== 'Saúde')])
      setToastMessage('🔥 Cenário de Onda de Calor (39°C) ativado para o Pitch!')
    } else if (scenario === 'chuva') {
      const chuvaAlert = {
        id: 'pitch-chuva',
        titulo: 'Chuva torrencial e enchente (45 mm nas últimas 3h)',
        nivel: 'laranja',
        tipo: 'Enchente',
        horario: 'Próximas 6 horas',
        descricao: 'Precipitação torrencial em volume crítico. Bairros em alerta para transbordamento de córregos e bolsões.',
        acoes: [
          'Limpar calha e grelhas da calçada urgentemente',
          'Não transitar por vias alagadas',
          'Acionar o plano comunitário de evacuação se necessário',
        ],
        missaoTexto: 'Limpar o ralo da calçada antes das 18h',
      }
      setAlerts([chuvaAlert, ...MOCK_ALERTS.filter((a) => a.tipo !== 'Enchente')])
      setToastMessage('🌧 Cenário de Temporal e Enchente ativado para o Pitch!')
    } else if (scenario === 'seca') {
      const secaAlert = {
        id: 'pitch-seca',
        titulo: 'Estiagem severa prolongada (28 dias sem chuva)',
        nivel: 'amarelo',
        tipo: 'Seca',
        horario: 'Período atual',
        descricao: 'Mananciais do município em estado de atenção. Economia de água obrigatória.',
        acoes: [
          'Reaproveitar água do banho ou máquina para descargas e limpeza',
          'Inspecione hidrômetros e conserte vazamentos domésticos',
        ],
        missaoTexto: 'Reaproveitar água da máquina ou do banho',
      }
      setAlerts([secaAlert, ...MOCK_ALERTS.filter((a) => a.tipo !== 'Seca')])
      setToastMessage('☀️ Cenário de Seca prolongada ativado para o Pitch!')
    }
    setTimeout(() => setToastMessage(null), 3000)
  }

  useEffect(() => {
    loadAlerts()
  }, [profile?.cidade])

  const toggleChecklistItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleDoMission = (alertItem) => {
    addPoints(10)
    setToastMessage(`⚡ Missão realizada! +10 pontos adicionados à sua conta por se prevenir contra: ${alertItem.titulo}!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleNotifyNeighbors = (alertItem) => {
    const text = `🚨 *Alerta Pulso Verde (${alertItem.nivel.toUpperCase()})*: ${alertItem.titulo}.\n${alertItem.descricao}\nCuide do seu bairro!`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setToastMessage('📢 Mensagem de alerta copiada! Compartilhe no WhatsApp da sua rua ou família.')
    } else {
      setToastMessage('📢 Alerta enviado para a rede comunitária!')
    }
    setTimeout(() => setToastMessage(null), 4000)
  }

  const filters = ['Todos', 'Enchente', 'Saúde', 'Deslizamento', 'Seca', 'Adaptação urbana']

  const filteredAlerts = alerts.filter((item) => {
    if (selectedFilter === 'Todos') return true
    if (selectedFilter === 'Saúde') return item.tipo === 'Saúde' || item.tipo === 'Calor'
    return item.tipo?.toLowerCase() === selectedFilter.toLowerCase()
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Toast flutuante de pontos e avisos */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#153B2D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Topo da Tela com Status do Clima */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block">
            CENTRAL DE DEFESA COMUNITÁRIA
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Alertas em tempo real
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitoramento para {profile?.bairro || 'Vila Mariana'}, {profile?.cidade || 'São Paulo'}.
          </p>
        </div>

        {/* Status da Fonte dos Dados e Seletor do Pitch Demo */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 p-1 rounded-2xl text-[11px] font-bold text-amber-900">
            <span className="px-2 text-amber-700">Modo Pitch:</span>
            <button
              onClick={() => {
                setDemoScenario('normal')
                loadAlerts()
              }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                demoScenario === 'normal' ? 'bg-amber-600 text-white shadow-xs' : 'hover:bg-amber-100'
              }`}
            >
              Clima Real
            </button>
            <button
              onClick={() => handleScenarioChange('calor')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                demoScenario === 'calor' ? 'bg-red-600 text-white shadow-xs' : 'hover:bg-amber-100'
              }`}
            >
              Calor (39°C)
            </button>
            <button
              onClick={() => handleScenarioChange('chuva')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                demoScenario === 'chuva' ? 'bg-orange-600 text-white shadow-xs' : 'hover:bg-amber-100'
              }`}
            >
              Temporal
            </button>
            <button
              onClick={() => handleScenarioChange('seca')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                demoScenario === 'seca' ? 'bg-yellow-600 text-white shadow-xs' : 'hover:bg-amber-100'
              }`}
            >
              Seca
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 shadow-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                demoScenario !== 'normal'
                  ? 'bg-purple-500 animate-ping'
                  : isLive
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <span>
              {demoScenario !== 'normal'
                ? `Cenário Demo: ${demoScenario.toUpperCase()}`
                : isLive
                ? 'Open-Meteo (Ao vivo)'
                : 'Simulação El Niño'}
            </span>
          </div>
          <button
            onClick={loadAlerts}
            title="Atualizar clima"
            className="p-2 bg-white border border-gray-200 rounded-2xl text-gray-500 hover:text-gray-900 shadow-sm transition-transform active:rotate-180"
          >
            <RefreshCw className={`w-4 h-4 ${loadingWeather ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Botões de Emergência (Atalhos 199, 193, 192) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href="tel:199"
          className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-2xl hover:bg-orange-100 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow">
              199
            </div>
            <div>
              <span className="text-xs font-black text-orange-950 block">Defesa Civil</span>
              <span className="text-[11px] text-orange-700">Enchentes e encostas</span>
            </div>
          </div>
          <PhoneCall className="w-4 h-4 text-orange-600" />
        </a>

        <a
          href="tel:193"
          className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm shadow">
              193
            </div>
            <div>
              <span className="text-xs font-black text-red-950 block">Bombeiros</span>
              <span className="text-[11px] text-red-700">Resgates e desabamentos</span>
            </div>
          </div>
          <PhoneCall className="w-4 h-4 text-red-600" />
        </a>

        <a
          href="tel:192"
          className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow">
              192
            </div>
            <div>
              <span className="text-xs font-black text-blue-950 block">SAMU</span>
              <span className="text-[11px] text-blue-700">Socorro médico e insolação</span>
            </div>
          </div>
          <PhoneCall className="w-4 h-4 text-blue-600" />
        </a>
      </div>

      {/* Grid com Plano de Emergência (Checklist) + Lista de Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de Alertas (8 colunas) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Barra de Filtros */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Cards dos Alertas */}
          <div className="space-y-4">
            {filteredAlerts.map((item) => {
              const riskColors = {
                verde: { border: 'border-emerald-200', bg: 'bg-emerald-50/50', badge: 'verde' },
                amarelo: { border: 'border-amber-200', bg: 'bg-amber-50/50', badge: 'amarelo' },
                laranja: { border: 'border-orange-200', bg: 'bg-orange-50/50', badge: 'laranja' },
                vermelho: { border: 'border-red-200', bg: 'bg-red-50/50', badge: 'vermelho' },
              }
              const currentStyle = riskColors[item.nivel] || riskColors.laranja

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border-2 ${currentStyle.border} shadow-sm space-y-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Badge variant="risk" level={item.nivel}>
                        NÍVEL {item.nivel?.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        • {item.tipo}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">
                      {item.horario}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-gray-900">
                      {item.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>

                  {/* O que fazer agora (Seção 5) */}
                  {item.acoes && item.acoes.length > 0 && (
                    <div className={`p-4 rounded-2xl ${currentStyle.bg} border border-gray-100 space-y-2`}>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-700 block">
                        O que fazer agora:
                      </span>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
                        {item.acoes.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-500 font-black">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Ações do Alerta: Fazer Missão (+10 pts) e Avisar Vizinhos */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="brand"
                        onClick={() => handleDoMission(item)}
                        icon={<Sparkles className="w-3.5 h-3.5" />}
                      >
                        Fazer missão (+10 pts)
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleNotifyNeighbors(item)}
                      icon={<Share2 className="w-3.5 h-3.5" />}
                    >
                      Avisar vizinhos
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coluna Direita (4 colunas): Plano de Emergência Fixo */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 sticky top-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                  Checklist fixo
                </span>
                <h3 className="text-base font-black text-gray-900">
                  Plano de emergência
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Marque os itens preparados na sua casa para garantir resposta rápida em eventos extremos.
            </p>

            {/* Checklist Interativo */}
            <div className="space-y-3 pt-2">
              <div
                onClick={() => toggleChecklistItem('mochila')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
              >
                <div className="mt-0.5 text-brand-green">
                  {checklist.mochila ? (
                    <CheckSquare className="w-4 h-4 fill-brand-green text-white" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 leading-tight">Mochila de emergência</h5>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Documentos, água, lanterna e medicamentos essenciais.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleChecklistItem('contatos')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
              >
                <div className="mt-0.5 text-brand-green">
                  {checklist.contatos ? (
                    <CheckSquare className="w-4 h-4 fill-brand-green text-white" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 leading-tight">Contatos de emergência</h5>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Telefones dos bombeiros, vizinhos e familiares impressos.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleChecklistItem('rota')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
              >
                <div className="mt-0.5 text-brand-green">
                  {checklist.rota ? (
                    <CheckSquare className="w-4 h-4 fill-brand-green text-white" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 leading-tight">Rota de saída segura</h5>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Caminho mapeado longe de pontos de alagamento do bairro.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleChecklistItem('pontoEncontro')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
              >
                <div className="mt-0.5 text-brand-green">
                  {checklist.pontoEncontro ? (
                    <CheckSquare className="w-4 h-4 fill-brand-green text-white" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 leading-tight">Ponto de encontro</h5>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Local alto e seguro combinado com a família.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleChecklistItem('abrigo')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
              >
                <div className="mt-0.5 text-brand-green">
                  {checklist.abrigo ? (
                    <CheckSquare className="w-4 h-4 fill-brand-green text-white" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 leading-tight">Abrigo mais próximo</h5>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Escola ou centro comunitário de apoio cadastrado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
