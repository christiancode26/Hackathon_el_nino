import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'

// Páginas (Seção 8 do CONTEXT.md)
import Login from './pages/Login'
import Home from './pages/Home'
import Missao from './pages/Missao'
import Feed from './pages/Feed'
import Calendario from './pages/Calendario'
import Ranking from './pages/Ranking'
import Perfil from './pages/Perfil'
import Resgate from './pages/Resgate'
import Doe from './pages/Doe'
import Alertas from './pages/Alertas'

// Guard de Autenticação para proteger as rotas
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2E9E5B] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-gray-500">Carregando Pulso Verde...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// Redireciona o usuário para /home caso já esteja logado
function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (user) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default function App() {
  return (
    <Routes>
      {/* 01 - Tela de Login e Cadastro */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      {/* Telas principais protegidas encapsuladas no Layout padrão com BottomNav */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/missao" element={<Missao />} />
        <Route path="/missao/:id" element={<Missao />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/resgate" element={<Resgate />} />
        <Route path="/doe" element={<Doe />} />
        <Route path="/alertas" element={<Alertas />} />
      </Route>

      {/* Rota coringa */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
