import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Recycle, CheckCircle2, Package, Truck, Sparkles, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import BraceletIcon from '../components/BraceletIcon'

export default function Resgate() {
  const navigate = useNavigate()
  const { profile, claimBracelet } = useAuth()

  const [marco, setMarco] = useState(3) // 3 meses
  const [rua, setRua] = useState('Rua Domingos de Morais')
  const [numero, setNumero] = useState('1234')
  const [complemento, setComplemento] = useState('Apto 42')
  const [cep, setCep] = useState('04010-100')
  const [cidade, setCidade] = useState(profile?.cidade || 'São Paulo')
  const [bairro, setBairro] = useState(profile?.bairro || 'Vila Mariana')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fullAddress = `${rua}, ${numero} ${complemento ? '- ' + complemento : ''}, ${bairro}, ${cidade} - CEP ${cep}`
    await claimBracelet(marco, fullAddress)
    setTimeout(() => {
      setLoading(false)
      setIsSuccess(true)
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </button>

      {/* Banner Principal */}
      <div className="bg-[#153B2D] rounded-3xl p-6 sm:p-10 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
            Recompensa exclusiva
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Resgate de pulseiras físicas
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            Pulseiras sustentáveis produzidas a partir de plástico 100% reciclado retirado de ações comunitárias.
          </p>
        </div>

        <div className="shrink-0">
          <BraceletIcon color="#EC6FA3" size="lg" monogram="PV" />
        </div>
      </div>

      {isSuccess ? (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900">
              Pedido de resgate confirmado!
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              Sua <strong>Pulseira de 3 Meses</strong> está sendo preparada pela nossa cooperativa parceira de reciclagem.
            </p>
          </div>

          {/* Linha de Status de Envio */}
          <div className="max-w-md mx-auto py-4">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
              <span className="text-brand-green">1. Pedida ✓</span>
              <span className="text-orange-500">2. Em produção</span>
              <span className="text-gray-400">3. Enviada</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-brand-green rounded-full w-1/3" />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-600 max-w-md mx-auto text-left space-y-1 border border-gray-100">
            <div className="font-bold text-gray-800">Endereço de entrega confirmado:</div>
            <div>{rua}, {numero} {complemento}</div>
            <div>{bairro}, {cidade} - CEP {cep}</div>
          </div>

          <div className="pt-2">
            <Button variant="secondary" onClick={() => navigate('/home')}>
              Voltar para o Início
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Card Detalhes do Marco */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
              Marco alcançado
            </span>

            <div className="p-5 bg-pink-50/50 border border-pink-200 rounded-2xl flex items-center gap-4">
              <BraceletIcon color="#EC6FA3" size="md" monogram="PV" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-700 block">
                  Disponível para envio
                </span>
                <h3 className="text-base font-black text-gray-900">
                  Pulseira de 3 meses
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Edição Rosa (Outubro)
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-600 leading-relaxed pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Frete 100% gratuito comunitário</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Embalagem compostável biodegradável</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Rastreamento via e-mail</span>
              </div>
            </div>
          </div>

          {/* Formulário de Endereço */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                Onde entregar
              </span>
              <h2 className="text-lg font-black text-gray-900">
                Endereço de entrega
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Logradouro / Rua
                  </label>
                  <input
                    type="text"
                    required
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    required
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    required
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    required
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    required
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="brand"
                  fullWidth
                  loading={loading}
                >
                  Confirmar resgate da pulseira
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
