import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  Camera,
  Users,
  CheckCircle2,
  ShieldCheck,
  Droplets,
  Leaf,
  Info,
  Clock,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { MISSIONS } from '../data/missions'
import { getMonthTheme } from '../theme/monthColors'
import Button from '../components/Button'

export default function Missao() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { userMissions, completeMission } = useAuth()

  // Procura a missão pelo ID ou usa a primeira de Outubro como padrão
  const mission = MISSIONS.find((m) => m.id === id) || MISSIONS.find((m) => m.mes === 10) || MISSIONS[0]
  const theme = getMonthTheme(mission.mes)
  const status = userMissions[mission.id] || 'pendente'

  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoName, setPhotoName] = useState('')
  const [validationRequested, setValidationRequested] = useState(status === 'em_validacao')
  const [toastMessage, setToastMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // Explicações educativas sobre a conexão com o Super El Niño
  const getElNinoReason = (eixo) => {
    switch (eixo) {
      case 'C':
        return 'O Super El Niño intensifica secas prolongadas no Sudeste e Centro-Oeste. Práticas de reuso hídrico e eliminação de vazamentos residenciais preservam os mananciais que abastecem a sua região.'
      case 'D':
        return 'O aquecimento global somado ao El Niño gera ondas térmicas extremas e chuvas torrenciais. O aumento da arborização urbana reduz a temperatura das calçadas em até 4°C e facilita a drenagem natural das águas pluviais.'
      case 'B':
        return 'Eventos climáticos extremos exigem planejamento prévio de rotas seguras e comunicação rápida entre vizinhos para evitar áreas de alagamento histórico e salvar vidas.'
      default:
        return 'O calor extremo e o estresse climático aumentam riscos de desidratação, pressão alta e isolamento social. A solidariedade e o cuidado mútuo entre moradores protegem pessoas vulneráveis e salvam vidas.'
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    const result = await completeMission(mission)
    setLoading(false)
    if (result) {
      if (result.bonusWon) {
        setToastMessage(`🎉 Parabéns! Você completou as 2 missões do mês e ganhou bônus de +${result.pointsWon} pontos!`)
      } else {
        setToastMessage(`✨ Missão concluída com sucesso! +${result.pointsWon} pontos e sequência aumentada!`)
      }
      setTimeout(() => navigate('/home'), 2000)
    }
  }

  const handleRequestNeighborValidation = () => {
    setValidationRequested(true)
    setToastMessage('👥 Pedido de confirmação enviado aos vizinhos do bairro!')
    setTimeout(() => setToastMessage(null), 3500)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#153B2D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Botão Voltar */}
      <button
        onClick={() => navigate('/home')}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para o Início</span>
      </button>

      {/* Card da Missão */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: theme.hex }}
            >
              Mês {mission.mes} • {theme.name}
            </span>
            <span className="text-xs font-bold text-gray-400">
              Eixo {mission.eixo}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]">
            ⚡ +{mission.pontos} pontos
          </span>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
            {mission.titulo}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            {mission.descricao}
          </p>
        </div>

        {/* Por que importa para o Super El Niño */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
          <div className="flex items-center gap-2 text-brand-green">
            <Leaf className="w-4 h-4 fill-brand-green" />
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
              Por que importa para o Super El Niño?
            </h4>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed font-medium">
            {getElNinoReason(mission.eixo)}
          </p>
        </div>

        {/* Anexo de Foto (Opcional - Validação Comunitária) */}
        <div className="p-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-gray-500" />
              <h4 className="text-xs font-bold text-gray-800">
                Registro fotográfico (opcional)
              </h4>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">
              Mecanismo de transparência
            </span>
          </div>

          <p className="text-[11px] text-gray-500">
            Tire uma foto realizando a ação para inspirar a comunidade e garantir a validação antifraude pelos vizinhos.
          </p>

          {photoPreview ? (
            <div className="relative rounded-2xl overflow-hidden max-h-56 bg-gray-100">
              <img
                src={photoPreview}
                alt="Registro"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPhotoPreview(null)
                  setPhotoName('')
                }}
                className="absolute top-2 right-2 px-2.5 py-1 bg-black/70 text-white text-[10px] font-bold rounded-lg"
              >
                Remover
              </button>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-gray-700">
                Escolher foto do dispositivo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3 pt-2">
          {status === 'concluida' ? (
            <div className="w-full py-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-green" />
              <span>Esta missão já foi concluída!</span>
            </div>
          ) : (
            <>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                monthColor={theme.hex}
                loading={loading}
                onClick={handleComplete}
                icon={<CheckCircle2 className="w-5 h-5" />}
              >
                Marcar como feita (+{mission.pontos} pts)
              </Button>

              <button
                type="button"
                onClick={handleRequestNeighborValidation}
                disabled={validationRequested}
                className={`w-full py-3 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  validationRequested
                    ? 'bg-amber-50 border-amber-200 text-amber-800 cursor-default'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95'
                }`}
              >
                {validationRequested ? (
                  <>
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Em validação pelos vizinhos</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Pedir confirmação de um vizinho</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
