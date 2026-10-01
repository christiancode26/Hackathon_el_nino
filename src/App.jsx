import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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

export default function App() {
  return (
    <Routes>
      {/* 01 - Tela de Login e Cadastro */}
      <Route path="/login" element={<Login />} />

      {/* Telas principais encapsuladas no Layout padrão com BottomNav */}
      <Route element={<Layout />}>
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
