import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getMissionsByMonth, BONUS_POINTS_MONTH_COMPLETED } from '../data/missions'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
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
  })
  const [loading, setLoading] = useState(true)

  // Mapa de status de missões: { [missionId]: 'pendente' | 'em_validacao' | 'concluida' }
  const [userMissions, setUserMissions] = useState({
    'm10-1': 'pendente',
    'm10-2': 'pendente',
    'm-banho': 'concluida',
    'm-arvore': 'em_validacao',
  })

  // Lista de resgates de pulseiras
  const [braceletClaims, setBraceletClaims] = useState([])

  const fetchProfile = async (userId) => {
    if (!userId || !isSupabaseConfigured) return null
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar perfil:', error.message)
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

        // Buscar missões do usuário
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
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchProfile(currentUser.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        if (currentUser) {
          await fetchProfile(currentUser.id)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Concluir uma missão
  const completeMission = async (mission) => {
    const missionId = typeof mission === 'string' ? mission : mission.id
    const mes = mission?.mes || 10
    const currentMissions = getMissionsByMonth(mes)

    // Se já foi concluída, não faz nada
    if (userMissions[missionId] === 'concluida') return

    const newMissionsState = {
      ...userMissions,
      [missionId]: 'concluida',
    }
    setUserMissions(newMissionsState)

    // Verifica se completou as 2 do mês atual
    const m1 = currentMissions[0]?.id
    const m2 = currentMissions[1]?.id
    const bothCompleted =
      newMissionsState[m1] === 'concluida' && newMissionsState[m2] === 'concluida'

    let pointsToAdd = 10
    let bonusWon = false
    if (bothCompleted && (missionId === m1 || missionId === m2)) {
      pointsToAdd += BONUS_POINTS_MONTH_COMPLETED // +5 pontos de bônus
      bonusWon = true
    }

    setProfile((prev) => ({
      ...prev,
      pontos: prev.pontos + pointsToAdd,
      streak: prev.streak + 1,
      acoesFeitas: prev.acoesFeitas + 1,
    }))

    // Persistir no Supabase se configurado e logado
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

  // Adicionar pontos arbitrários (ex: botão Fazer missão nos Alertas)
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

  // Resgate de pulseiras
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

  // Doação
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

  const signInWithPassword = async (email, password) => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado. Verifique o arquivo .env')
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data?.user) await fetchProfile(data.user.id)
    return data
  }

  const signUp = async ({ email, password, nome, cidade, bairro, consentimento_lgpd }) => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado. Verifique o arquivo .env')
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome, cidade, bairro, consentimento_lgpd } },
    })
    if (error) throw error
    if (data?.user) {
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
  }

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado. Verifique o arquivo .env')
    }
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/home` },
    })
  }

  const signOut = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        userMissions,
        loading,
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
