import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Leaf, Home, Calendar, AlertTriangle, Trophy, User, MessageSquareHeart } from 'lucide-react'
import BottomNav from './BottomNav'

export default function Layout() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return <Outlet />
  }

  const desktopNavItems = [
    { to: '/home', label: 'Início', icon: Home },
    { to: '/feed', label: 'Feed', icon: MessageSquareHeart },
    { to: '/calendario', label: 'Calendário', icon: Calendar },
    { to: '/alertas', label: 'Alertas', icon: AlertTriangle },
    { to: '/ranking', label: 'Ranking', icon: Trophy },
    { to: '/perfil', label: 'Perfil', icon: User },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-[#1F2933] flex flex-col sm:flex-row">
      {/* Desktop Sidebar (oculta no mobile, visível sm+) */}
      <aside className="hidden sm:flex flex-col w-64 bg-white border-r border-gray-100 p-6 sticky top-0 h-screen justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-brand-green border border-emerald-100 flex items-center justify-center">
              <Leaf className="w-6 h-6 fill-brand-green/20 text-brand-green" />
            </div>
            <div className="text-xl font-black text-gray-900 tracking-tight">
              Pulso <span className="text-brand-green">verde</span>
            </div>
          </div>

          {/* Links de navegação desktop */}
          <nav className="space-y-1.5">
            {desktopNavItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-pink-50 text-[#EC6FA3]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Card Doe Agora no rodapé do Sidebar (igual ao Figma) */}
        <div className="bg-[#EAF7EE] p-4 rounded-3xl border border-[#C6EBD0]">
          <div className="w-8 h-8 rounded-xl bg-[#2E9E5B]/20 text-[#2E9E5B] flex items-center justify-center mb-2">
            <Leaf className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-gray-800">Seu impacto cresce aqui.</h4>
          <p className="text-[11px] text-gray-500 mb-3">Apoie projetos perto de você.</p>
          <NavLink
            to="/doe"
            className="block text-center w-full py-2 bg-[#153B2D] hover:bg-[#0e2a20] text-white text-xs font-bold rounded-2xl transition-all"
          >
            Doe agora
          </NavLink>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 min-w-0 pb-20 sm:pb-6 overflow-y-auto">
        <Outlet />
      </main>

      {/* Barra de Navegação Inferior (Mobile-first, oculta sm+) */}
      <BottomNav alertCount={1} />
    </div>
  )
}
