import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Leaf, Droplet, Shield, Heart, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Doe() {
  const navigate = useNavigate()
  const { makeDonation } = useAuth()

  const [selectedAmount, setSelectedAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const donationOptions = [
    {
      value: 10,
      icon: Leaf,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      title: '1 muda plantada',
      desc: 'Ajude a criar mais sombra no bairro.',
    },
    {
      value: 25,
      icon: Droplet,
      iconColor: 'text-pink-600',
      iconBg: 'bg-pink-50',
      title: 'Kit de economia de água',
      desc: 'Leve soluções simples para uma família.',
    },
    {
      value: 50,
      icon: Shield,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      title: 'Filtro de água',
      desc: 'Água segura para uma família afetada.',
    },
  ]

  const currentTotal = customAmount ? parseFloat(customAmount) || 0 : selectedAmount

  const handleDonate = async () => {
    if (!currentTotal || currentTotal <= 0) return
    setLoading(true)
    await makeDonation(currentTotal)
    setTimeout(() => {
      setLoading(false)
      setIsSuccess(true)
    }, 800)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </button>

      {/* Banner Principal Topo (Dark Green) */}
      <div className="bg-[#153B2D] rounded-3xl p-6 sm:p-10 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
            Doe aqui
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Transforme cuidado em impacto real.
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            Sua doação fortalece projetos ambientais e prepara comunidades para os efeitos do clima.
          </p>
        </div>

        {/* Card de Impacto da Comunidade */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-5 sm:p-6 text-center shrink-0">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 block mb-1">
            Impacto da comunidade
          </span>
          <span className="text-3xl sm:text-4xl font-black text-white block">
            1.240
          </span>
          <span className="text-xs text-emerald-100/80 mt-0.5 block">
            mudas plantadas até agora
          </span>
          <div className="flex justify-center gap-1 mt-2 text-emerald-300">
            <span>🍃</span>
            <span>🍃</span>
            <span>🍃</span>
          </div>
        </div>
      </div>

      {/* Modal / Card de Sucesso */}
      {isSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-emerald-950">
            Muito obrigado pela sua contribuição!
          </h3>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            Sua doação de <strong>R$ {currentTotal.toFixed(2)}</strong> foi registrada com sucesso (simulação). Enviamos o comprovante para seu e-mail cadastrado.
          </p>
          <Button
            size="sm"
            variant="brand"
            onClick={() => setIsSuccess(false)}
          >
            Fazer outra doação
          </Button>
        </div>
      )}

      {/* Grid Principal: Escolha seu Impacto + Transparência */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna Esquerda: Escolha seu Impacto */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
              Escolha seu impacto
            </span>
            <h2 className="text-xl font-black text-gray-900">
              Quanto você quer doar?
            </h2>
          </div>

          {/* Cards de Opções de Doação */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {donationOptions.map((opt) => {
              const Icon = opt.icon
              const isSelected = selectedAmount === opt.value && !customAmount

              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    setSelectedAmount(opt.value)
                    setCustomAmount('')
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'border-[#EC6FA3] bg-pink-50/20 shadow-sm'
                      : 'border-gray-200/80 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl ${opt.iconBg} ${opt.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-[#EC6FA3] bg-[#EC6FA3]'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  <div>
                    <span className="text-lg font-black text-gray-900 block">
                      R$ {opt.value}
                    </span>
                    <span className="text-xs font-bold text-gray-800 block leading-tight mt-0.5">
                      {opt.title}
                    </span>
                    <span className="text-[11px] text-gray-500 mt-1 block leading-tight">
                      {opt.desc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input de Outro Valor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              Outro valor
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                R$
              </span>
              <input
                type="number"
                min="1"
                placeholder="0,00"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(0)
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EC6FA3]/30 focus:border-[#EC6FA3]"
              />
            </div>
          </div>

          {/* Botão de Doação com Cor do Mês (Rosa #EC6FA3) */}
          <div className="space-y-3 pt-2">
            <Button
              size="lg"
              variant="primary"
              fullWidth
              loading={loading}
              onClick={handleDonate}
              monthColor="#EC6FA3"
              icon={<Heart className="w-4 h-4 fill-white" />}
            >
              Doar R$ {currentTotal > 0 ? currentTotal.toFixed(2) : '0,00'}
            </Button>
            <p className="text-[11px] text-center text-gray-400 font-medium">
              🔒 Pagamento seguro. Você receberá um recibo detalhado por e-mail.
            </p>
          </div>
        </div>

        {/* Coluna Direita: Transparência */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
              Transparência
            </span>
            <h2 className="text-xl font-black text-gray-900">
              Para onde vai o dinheiro?
            </h2>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Cada real é acompanhado rigorosamente e os resultados das compras de mudas e filtros são publicados mensalmente.
          </p>

          {/* Barras de Divisão do Recurso */}
          <div className="space-y-4 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                <span>72%</span>
                <span className="text-gray-500 font-medium">Projetos e materiais</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[72%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                <span>18%</span>
                <span className="text-gray-500 font-medium">Logística local</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[18%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                <span>10%</span>
                <span className="text-gray-500 font-medium">Operação da plataforma</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[10%]" />
              </div>
            </div>
          </div>

          {/* Card Projetos Verificados */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-emerald-950">
                Projetos verificados
              </h5>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Prestação de contas contínua e fotos públicas no feed comunitário.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
