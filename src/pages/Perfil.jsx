import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Zap,
  Flame,
  CheckCircle2,
  Users,
  Award,
  ChevronRight,
  Heart,
  Lock,
  LogOut,
  Edit3,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Perfil() {
  const navigate = useNavigate()
  const { profile, signOut, user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const initials = profile?.nome
    ? profile.nome
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'LM'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Card do Perfil do Usuário */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar com Iniciais */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-100/70 border-2 border-emerald-200 text-emerald-800 flex items-center justify-center font-black text-xl sm:text-2xl shadow-inner shrink-0">
            {initials}
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
              {profile?.nivel || 'GUARDIÃO DA GOTA'} • NÍVEL {profile?.nivelNumero || 4}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {profile?.nome || 'Lucas Mendes'}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {profile?.bairro || 'Vila Mariana'}, {profile?.cidade || 'São Paulo'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            icon={<Edit3 className="w-4 h-4" />}
          >
            Editar perfil
          </Button>

          {user && (
            <button
              onClick={signOut}
              title="Sair da conta"
              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl border border-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid de 4 Estatísticas Rápidas (Estilo Figma) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Pontos */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <span className="text-xl font-black text-gray-900 block leading-tight">
              {profile?.pontos || 380}
            </span>
            <span className="text-xs text-gray-400 font-semibold">pontos</span>
          </div>
        </div>

        {/* Sequência / Streak */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-orange-400" />
          </div>
          <div>
            <span className="text-xl font-black text-gray-900 block leading-tight">
              {profile?.streak || 7} dias
            </span>
            <span className="text-xs text-gray-400 font-semibold">sequência</span>
          </div>
        </div>

        {/* Ações Feitas */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black text-gray-900 block leading-tight">
              {profile?.acoesFeitas || 28}
            </span>
            <span className="text-xs text-gray-400 font-semibold">ações feitas</span>
          </div>
        </div>

        {/* Vizinhos */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black text-gray-900 block leading-tight">
              {profile?.vizinhos || 12}
            </span>
            <span className="text-xs text-gray-400 font-semibold">vizinhos</span>
          </div>
        </div>
      </div>

      {/* Grid: Conquistas (Emblemas) + Recompensas (Pulseiras) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Conquistas — Emblemas Mensais */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                Conquistas
              </span>
              <h3 className="text-lg font-black text-gray-900">
                Emblemas mensais
              </h3>
            </div>
            <Link
              to="/calendario"
              className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-3 pt-1">
            {/* Jan */}
            <div className="flex flex-col items-center text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#E5E7EB] text-gray-800 flex items-center justify-center font-bold text-[10px] shadow-sm">
                JAN
              </div>
              <span className="text-[11px] font-bold text-gray-800">Janeiro</span>
              <span className="text-[9px] text-gray-400">Concluído</span>
            </div>

            {/* Fev */}
            <div className="flex flex-col items-center text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#8E44AD] text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                FEV
              </div>
              <span className="text-[11px] font-bold text-gray-800">Fevereiro</span>
              <span className="text-[9px] text-gray-400">Concluído</span>
            </div>

            {/* Mar */}
            <div className="flex flex-col items-center text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#2B7DE9] text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                MAR
              </div>
              <span className="text-[11px] font-bold text-gray-800">Março</span>
              <span className="text-[9px] text-gray-400">Concluído</span>
            </div>

            {/* Abr */}
            <div className="flex flex-col items-center text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#5BC0EB] text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                ABR
              </div>
              <span className="text-[11px] font-bold text-gray-800">Abril</span>
              <span className="text-[9px] text-gray-400">Concluído</span>
            </div>
          </div>
        </div>

        {/* Card Recompensas — Minhas Pulseiras */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm space-y-5">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
              Recompensas
            </span>
            <h3 className="text-lg font-black text-gray-900">
              Minhas pulseiras
            </h3>
          </div>

          <div className="space-y-4 pt-1">
            {/* Pulseira 3 meses (Disponível) */}
            <div className="flex items-center justify-between p-3.5 bg-blue-50/40 border border-blue-100 rounded-2xl gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-[#2B7DE9] bg-white flex items-center justify-center text-xs font-black text-[#2B7DE9] shadow-sm">
                  PV
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 block">
                    Disponível
                  </span>
                  <h4 className="text-sm font-bold text-gray-900">Pulseira 3 meses</h4>
                  <p className="text-[11px] text-gray-500">Feita com plástico reciclado.</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="primary"
                monthColor="#EC6FA3"
                onClick={() => navigate('/resgate')}
              >
                Resgatar
              </Button>
            </div>

            {/* Pulseira 6 meses (Bloqueada) */}
            <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200/60 rounded-2xl gap-3 opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                    Bloqueada
                  </span>
                  <h4 className="text-sm font-bold text-gray-600">Pulseira 6 meses</h4>
                  <p className="text-[11px] text-gray-400">Complete mais 3 campanhas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Rodapé: Apoie um projeto ambiental (Doação) */}
      <div className="bg-[#153B2D] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
            <Heart className="w-6 h-6 fill-emerald-300" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block">
              Faça seu impacto ir além
            </span>
            <h3 className="text-lg font-black text-white">
              Apoie um projeto ambiental
            </h3>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Cada doação se transforma em uma ação transparente.
            </p>
          </div>
        </div>

        <Link
          to="/doe"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-gray-900 text-xs font-bold rounded-2xl shadow hover:bg-gray-100 transition-all gap-1.5 shrink-0"
        >
          <span>Quero doar</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
