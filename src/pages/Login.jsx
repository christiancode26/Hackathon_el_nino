import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Lock, Mail, User, MapPin, Building2, CheckSquare, Square, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const { signInWithPassword, signUp, signInWithGoogle } = useAuth()

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('São Paulo')
  const [bairro, setBairro] = useState('Vila Mariana')
  const [lgpdConsent, setLgpdConsent] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)

    try {
      if (!email || !password) {
        throw new Error('Preencha seu e-mail e sua senha.')
      }

      await signInWithPassword(email, password)
      navigate('/home')
    } catch (err) {
      console.error(err)
      setErrorMessage(err.message || 'Erro ao entrar. Verifique os dados informados.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)

    try {
      if (!nome.trim()) {
        throw new Error('Por favor, informe seu nome completo.')
      }
      if (!email || !password) {
        throw new Error('Preencha e-mail e senha.')
      }
      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.')
      }
      if (!cidade.trim() || !bairro.trim()) {
        throw new Error('Por favor, informe sua cidade e seu bairro.')
      }
      if (!lgpdConsent) {
        throw new Error('É necessário aceitar os termos de consentimento LGPD para continuar.')
      }

      const res = await signUp({
        email,
        password,
        nome: nome.trim(),
        cidade: cidade.trim(),
        bairro: bairro.trim(),
        consentimento_lgpd: lgpdConsent,
      })

      if (res?.user && !res?.session) {
        setSuccessMessage('Conta criada com sucesso! Por favor, verifique a confirmação no seu e-mail.')
      } else {
        setSuccessMessage('Conta criada com sucesso! Redirecionando...')
        setTimeout(() => navigate('/home'), 1200)
      }
    } catch (err) {
      console.error(err)
      setErrorMessage(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setErrorMessage('')
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      console.error(err)
      setErrorMessage(err.message || 'Erro ao autenticar com o Google.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col justify-center items-center px-4 py-10 selection:bg-brand-green selection:text-white">
      {/* Container Principal */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
        {/* Logotipo e Cabeçalho */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-brand-green border border-emerald-100 mb-3 shadow-sm">
            <Leaf className="w-8 h-8 fill-brand-green/20 text-brand-green" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Pulso <span className="text-brand-green">verde</span>
          </h1>
          <p className="text-xs font-semibold text-gray-500 mt-1">
            "Alertas avisam. A comunidade age."
          </p>
        </div>

        {/* Banner informativo de configuração do Supabase */}
        {!isSupabaseConfigured && (
          <div className="mb-5 p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-800 leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Atenção:</strong> Chaves do Supabase não configuradas no <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code>.
              Para login real com Supabase, configure <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> e <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code>.
              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="font-bold underline text-amber-900 hover:text-black"
                >
                  Entrar em modo visitante (sem login) &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Alternador de Abas (Entrar / Cadastrar) */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setErrorMessage('')
              setSuccessMessage('')
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register')
              setErrorMessage('')
              setSuccessMessage('')
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Criar conta
          </button>
        </div>

        {/* Mensagens de Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-green mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Formulário de Login */}
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="w-full pl-10 pr-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  required
                  className="w-full pl-10 pr-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="brand"
              size="lg"
              fullWidth
              loading={loading}
              className="mt-2"
            >
              Entrar no Pulso Verde
            </Button>
          </form>
        ) : (
          /* Formulário de Cadastro */
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nome completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como quer ser chamado(a)?"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Cidade
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Ex: São Paulo"
                    required
                    className="w-full pl-8 pr-2.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Bairro
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    placeholder="Ex: Vila Mariana"
                    required
                    className="w-full pl-8 pr-2.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox LGPD */}
            <div
              onClick={() => setLgpdConsent(!lgpdConsent)}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-gray-50/80 border border-gray-200/80 cursor-pointer hover:bg-gray-100/60 transition-colors select-none"
            >
              <div className="mt-0.5 text-brand-green shrink-0">
                {lgpdConsent ? (
                  <CheckSquare className="w-4 h-4 fill-brand-green text-white" />
                ) : (
                  <Square className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-[11px] leading-tight text-gray-600">
                Concordo com os Termos e com a coleta de dados de bairro para alertas comunitários conforme a <strong>LGPD</strong>.
              </p>
            </div>

            <Button
              type="submit"
              variant="brand"
              size="lg"
              fullWidth
              loading={loading}
              className="mt-2"
            >
              Criar minha conta
            </Button>
          </form>
        )}

        {/* Divisor */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400 font-semibold uppercase tracking-wider">
            ou continue com
          </span>
        </div>

        {/* Botão Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 border border-gray-200 rounded-2xl bg-white hover:bg-gray-50 active:scale-95 text-xs font-bold text-gray-700 flex items-center justify-center gap-2.5 shadow-sm transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuar com o Google</span>
        </button>
      </div>
    </div>
  )
}
