import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Calendar, AlertTriangle, Trophy, User } from 'lucide-react'

export default function BottomNav({ alertCount = 1, activeColor = '#2E9E5B' }) {
  const navItems = [
    {
      to: '/home',
      label: 'Início',
      icon: Home,
    },
    {
      to: '/calendario',
      label: 'Calendário',
      icon: Calendar,
    },
    {
      to: '/alertas',
      label: 'Alertas',
      icon: AlertTriangle,
      isCentral: true,
    },
    {
      to: '/ranking',
      label: 'Ranking',
      icon: Trophy,
    },
    {
      to: '/perfil',
      label: 'Perfil',
      icon: User,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] sm:hidden">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon

          if (item.isCentral) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative -top-3 flex flex-col items-center group"
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 active:scale-95 ${
                        isActive
                          ? 'bg-[#F28C28] text-white shadow-orange-200'
                          : 'bg-[#F28C28] text-white shadow-orange-100'
                      }`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    {alertCount > 0 && (
                      <span className="absolute -top-1 right-0 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow">
                        {alertCount}
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold mt-0.5 ${
                        isActive ? 'text-[#F28C28]' : 'text-gray-500'
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            )
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center justify-center flex-1 py-1"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-brand-green stroke-[2.5]' : 'text-gray-400 stroke-[1.8]'
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1 transition-colors duration-200 ${
                      isActive ? 'font-bold text-brand-green' : 'font-medium text-gray-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
