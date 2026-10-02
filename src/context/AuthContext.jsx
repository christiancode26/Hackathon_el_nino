import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getMissionsByMonth, BONUS_POINTS_MONTH_COMPLETED } from '../data/missions'

const AuthContext = createContext({})

const STORAGE_SESSION_KEY = 'pulso_verde_auth_user'
const STORAGE_PROFILE_KEY = 'pulso_verde_user_profile'
const STORAGE_MISSIONS_KEY = 'pulso_verde_user_missions'

const DEFAULT_PROFILE = {
  nome: 'Lucas Mendes',
  cidade: 'São Paulo',
  bairro: 'Vila Mariana',
  pontos: 380,
  streak: 7,
  nivel: 'Guardião da Gota',
  nivelNumero: 4,
  proximoNivelPontos: 500,
  acoesFeitas: 28,
  vizinhos: 12,
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_SESSION_KEY)
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_PROFILE_KEY)
      return savedProfile ? JSON.parse(savedProfile) : DEFAULT_PROFILE
    } catch {
      return DEFAULT_PROFILE
    }
  })

  const [loading, setLoading] = useState(true)

  // Mapa de status de missões
  const [userMissions, setUserMissions] = useState(() => {
    try {
      const savedMissions = localStorage.getItem(STORAGE_MISSIONS_KEY)
      return savedMissions
        ? JSON.parse(savedMissions)
        : {
            'm10-1': 'pendente',
            'm10-2': 'pendente',
            'm-banho': 'concluida',
            'm-arvore': 'em_validacao',
          }
    } catch {
      return {}
    }
  })

  const [braceletClaims, setBraceletClaims] = useState([])

  // Salvar no localStorage sempre que o perfil mudar
  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile))
    }
  }, [profile])

  // Salvar missões no localStorage
  useEffect(() => {
    if (userMissions) {
      localStorage.setItem(STORAGE_MISSIONS_KEY, JSON.stringify(userMissions))
    }
  }, [userMissions])

  // Salvar usuário autenticado no localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_SESSION_KEY)
    }
  }, [user])

  const fetchProfile = async (userId) => {
    if (!userId || !isSupabaseConfigured) return null
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar perfil Supabase:', error.message)
      }

      if (data) {
        setProfile((prev) => ({
          ...prev,
          nome: data.nome || prev.nome,
          cidade: data.cidade || prev.cidade,
          bairro: data.bairro || prev.bairro,
          pontos: data.pontos !== undefined ? data.pontos : prev.pontos,
          streak: data.streak !== undefined ? data.streak : prev.streak,
        }))

        // Buscar missões do usuário no Supabase
        const { data: mData } = await supabase
          .from('user_missions')
          .select('*')
          .eq('user_id', userId)

        if (mData && mData.length > 0) {
          const map = {}
          mData.forEach((m) => {
            map[m.mission_id] = m.status
          })
          setUserMissions((prev) => ({ ...prev, ...map }))
        }
        return data
      }
      return null
    } catch (err) {
      console.error('Exceção ao buscar perfil:', err)
      return null
    }
  }

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        const currentUser = session?.user ?? null
        if (currentUser) {
          setUser(currentUser)
          fetchProfile(currentUser.id)
        }
        setLoading(false)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const currentUser = session?.user ?? null
          if (currentUser) {
            setUser(currentUser)
            await fetchProfile(currentUser.id)
          }
          setLoading(false)
        }
      )

      return () => {
        subscription.unsubscribe()
      }
    } else {
      // Modo local / demo
      setLoading(false)
    }
  }, [])

  // Login por e-mail e senha (compatível com Supabase e modo Local/Demo)
  const signInWithPassword = async (email, password) => {
    if (!email || !password) {
      throw new Error('Informe seu e-mail e senha para entrar.')
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        if (data?.user) {
          setUser(data.user)
          await fetchProfile(data.user.id)
        }
        return data
      } catch (err) {
        console.warn('Falha no Supabase, tentando autenticação local:', err.message)
        throw err
      }
    }

    // Autenticação local imediata (sem necessidade de backend externo)
    const localUsers = JSON.parse(localStorage.getItem('pulso_verde_registered_users') || '[]')
    const foundUser = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (foundUser && foundUser.password !== password) {
      throw new Error('Senha incorreta para este e-mail.')
    }

    const loggedUser = {
      id: foundUser?.id || 'demo-user-' + Date.now(),
      email: email,
      created_at: foundUser?.created_at || new Date().toISOString(),
    }

    setUser(loggedUser)
    setProfile((prev) => ({
      ...prev,
      nome: foundUser?.nome || email.split('@')[0],
      cidade: foundUser?.cidade || prev.cidade,
      bairro: foundUser?.bairro || prev.bairro,
    }))

    return { user: loggedUser }
  }

  // Cadastro por e-mail (compatível com Supabase e modo Local)
  const signUp = async ({ email, password, nome, cidade, bairro, consentimento_lgpd }) => {
    if (!email || !password || !nome) {
      throw new Error('Preencha todos os campos obrigatórios.')
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { nome, cidade, bairro, consentimento_lgpd } },
        })
        if (error) throw error
        if (data?.user) {
          setUser(data.user)
          await supabase.from('profiles').upsert({
            id: data.user.id,
            nome,
            cidade,
            bairro,
            consentimento_lgpd: Boolean(consentimento_lgpd),
            pontos: 380,
            streak: 7,
          })
          await fetchProfile(data.user.id)
        }
        return data
      } catch (err) {
        console.warn('Erro no Supabase, gravando cadastro localmente:', err.message)
      }
    }

    // Cadastro em armazenamento local
    const newUser = {
      id: 'usr-' + Date.now(),
      email,
      password,
      nome,
      cidade,
      bairro,
      consentimento_lgpd,
      created_at: new Date().toISOString(),
    }

    const existingUsers = JSON.parse(localStorage.getItem('pulso_verde_registered_users') || '[]')
    const updatedUsers = [...existingUsers.filter((u) => u.email !== email), newUser]
    localStorage.setItem('pulso_verde_registered_users', JSON.stringify(updatedUsers))

    const authUser = { id: newUser.id, email: newUser.email }
    setUser(authUser)
    setProfile({
      ...DEFAULT_PROFILE,
      nome,
      cidade,
      bairro,
    })

    return { user: authUser }
  }

  // Login com Google
  const signInWithGoogle = async () => {
    if (isSupabaseConfigured) {
      return supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/home` },
      })
    }

    // Simulação do Google em modo offline
    const demoGoogleUser = {
      id: 'google-demo-user',
      email: 'usuario.google@pulsoverde.org',
    }
    setUser(demoGoogleUser)
    setProfile((prev) => ({
      ...prev,
      nome: 'Comunidade Google',
    }))
    return { user: demoGoogleUser }
  }

  // Logout
  const signOut = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut()
      } catch (e) {
        console.warn(e)
      }
    }
    setUser(null)
    localStorage.removeItem(STORAGE_SESSION_KEY)
  }

  // Concluir uma missão
  const completeMission = async (mission) => {
    const missionId = typeof mission === 'string' ? mission : mission.id
    const mes = mission?.mes || 10
    const currentMissions = getMissionsByMonth(mes)

    if (userMissions[missionId] === 'concluida') return

    const newMissionsState = {
      ...userMissions,
      [missionId]: 'concluida',
    }
    setUserMissions(newMissionsState)

    const m1 = currentMissions[0]?.id
    const m2 = currentMissions[1]?.id
    const bothCompleted =
      newMissionsState[m1] === 'concluida' && newMissionsState[m2] === 'concluida'

    let pointsToAdd = 10
    let bonusWon = false
    if (bothCompleted && (missionId === m1 || missionId === m2)) {
      pointsToAdd += BONUS_POINTS_MONTH_COMPLETED
      bonusWon = true
    }

    setProfile((prev) => ({
      ...prev,
      pontos: prev.pontos + pointsToAdd,
      streak: prev.streak + 1,
      acoesFeitas: prev.acoesFeitas + 1,
    }))

    if (isSupabaseConfigured && user) {
      try {
        await supabase.from('user_missions').upsert({
          user_id: user.id,
          mission_id: missionId,
          mes: mes,
          status: 'concluida',
          criado_em: new Date().toISOString(),
        })

        await supabase.from('profiles').update({
          pontos: profile.pontos + pointsToAdd,
          streak: profile.streak + 1,
          ultimo_dia_ativo: new Date().toISOString(),
        }).eq('id', user.id)
      } catch (e) {
        console.warn('Erro ao sincronizar com Supabase:', e)
      }
    }

    return { pointsWon: pointsToAdd, bonusWon }
  }

  const addPoints = async (amount = 10) => {
    setProfile((prev) => ({
      ...prev,
      pontos: prev.pontos + amount,
      acoesFeitas: prev.acoesFeitas + 1,
    }))

    if (isSupabaseConfigured && user) {
      try {
        await supabase.from('profiles').update({
          pontos: profile.pontos + amount,
          ultimo_dia_ativo: new Date().toISOString(),
        }).eq('id', user.id)
      } catch (e) {
        console.warn(e)
      }
    }
  }

  const claimBracelet = async (marco, endereco) => {
    const claim = {
      marco,
      endereco,
      status: 'pedida',
      data: new Date().toLocaleDateString('pt-BR'),
    }
    setBraceletClaims((prev) => [...prev, claim])

    if (isSupabaseConfigured && user) {
      try {
        await supabase.from('bracelet_claims').insert({
          user_id: user.id,
          marco,
          endereco,
          status: 'pedida',
        })
      } catch (e) {
        console.warn(e)
      }
    }
    return claim
  }

  const makeDonation = async (valor) => {
    if (isSupabaseConfigured && user) {
      try {
        await supabase.from('donations').insert({
          user_id: user.id,
          valor,
        })
      } catch (e) {
        console.warn(e)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        userMissions,
        loading,
        isAuthenticated: Boolean(user),
        completeMission,
        addPoints,
        claimBracelet,
        makeDonation,
        signInWithPassword,
        signUp,
        signInWithGoogle,
        signOut,
        refreshProfile: () => user && fetchProfile(user.id),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
