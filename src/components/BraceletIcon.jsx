import React from 'react'
import { Lock } from 'lucide-react'

/**
 * Ícone Temático das Pulseiras Físicas Sustentáveis — Pulso Verde
 * Representa as pulseiras exclusivas produzidas a partir de plástico 100% reciclado.
 * Segue a paleta e a linguagem visual flat-moderna do aplicativo (verde-folha, azul-água, rosa, ouro).
 */
export default function BraceletIcon({
  color = '#2E9E5B', // Cor temática da pulseira
  secondaryColor = null,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  isLocked = false,
  monogram = 'PV',
  className = '',
}) {
  const sizeMap = {
    sm: { width: 44, height: 36, badgeR: 9, fontSize: 7, strokeW: 7 },
    md: { width: 72, height: 56, badgeR: 13, fontSize: 9, strokeW: 9 },
    lg: { width: 96, height: 76, badgeR: 16, fontSize: 11, strokeW: 11 },
    xl: { width: 128, height: 100, badgeR: 20, fontSize: 13, strokeW: 14 },
  }

  const currentSize = sizeMap[size] || sizeMap.md
  const activeColor = isLocked ? '#9CA3AF' : color
  const darkColor = isLocked ? '#6B7280' : secondaryColor || adjustBrightness(activeColor, -25)
  const lightColor = isLocked ? '#E5E7EB' : adjustBrightness(activeColor, 35)

  const gradId = `bracelet-grad-${activeColor.replace('#', '')}-${isLocked ? 'locked' : 'active'}`
  const ringGradId = `ring-grad-${activeColor.replace('#', '')}`

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: currentSize.width, height: currentSize.height }}
    >
      <svg
        viewBox="0 0 120 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Gradiente da Faixa de Plástico Reciclado */}
          <linearGradient id={gradId} x1="10" y1="20" x2="110" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={lightColor} />
            <stop offset="50%" stopColor={activeColor} />
            <stop offset="100%" stopColor={darkColor} />
          </linearGradient>

          {/* Gradiente do Aro Traseiro com Profundidade */}
          <linearGradient id={ringGradId} x1="60" y1="18" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={darkColor} />
            <stop offset="100%" stopColor={activeColor} />
          </linearGradient>

          {/* Sombra suave de contato */}
          <filter id="soft-shadow" x="10" y="55" width="100" height="40" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* 1. Sombra projetada na base */}
        <ellipse cx="60" cy="74" rx="44" ry="12" fill="rgba(0,0,0,0.09)" filter="url(#soft-shadow)" />

        {/* 2. Arco traseiro da pulseira (parte de trás da elipse) */}
        <path
          d="M 22 46 C 22 28, 98 28, 98 46"
          stroke={`url(#${ringGradId})`}
          strokeWidth={currentSize.strokeW}
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 3. Textura de material reciclado pontilhado no arco traseiro */}
        {!isLocked && (
          <path
            d="M 32 37 Q 60 26 88 37"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeDasharray="3 4"
            fill="none"
          />
        )}

        {/* 4. Arco frontal da pulseira (parte de frente da elipse) */}
        <path
          d="M 98 46 C 98 68, 22 68, 22 46"
          stroke={`url(#${gradId})`}
          strokeWidth={currentSize.strokeW}
          strokeLinecap="round"
        />

        {/* 5. Linha de relevo sustentável da faixa frontal */}
        {!isLocked && (
          <path
            d="M 26 49 C 28 66, 92 66, 94 49"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            fill="none"
          />
        )}

        {/* 6. Medalhão Central / Fecho Sustentável */}
        <g transform="translate(60, 56)">
          {/* Borda / Sombra do Medalhão */}
          <circle r={currentSize.badgeR + 1.5} fill="rgba(0,0,0,0.08)" cy="1.5" />
          
          {/* Medalhão em si */}
          <circle
            r={currentSize.badgeR}
            fill={isLocked ? '#E5E7EB' : '#FFFFFF'}
            stroke={isLocked ? '#9CA3AF' : activeColor}
            strokeWidth="2.5"
          />

          {/* Símbolo dentro do medalhão: Folha estilizada e Monograma PV */}
          {isLocked ? (
            <g transform="translate(-5, -6) scale(0.7)">
              <Lock className="w-4 h-4 text-gray-400 stroke-[2.5]" />
            </g>
          ) : (
            <g>
              {/* Folha ecológica verde minimalista */}
              <path
                d="M -3 -4 C -3 -8, 5 -8, 6 -3 C 6 2, -1 3, -3 -4 Z"
                fill={activeColor}
                opacity="0.9"
              />
              {/* Monograma PV */}
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontSize={currentSize.fontSize}
                fontWeight="900"
                fill={activeColor}
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="-0.5px"
              >
                {monogram}
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Selo flutuante de Reciclado */}
      {!isLocked && (
        <span
          className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs flex items-center justify-center text-[7px] text-white font-black"
          title="100% Plástico Reciclado"
        >
          ♻
        </span>
      )}
    </div>
  )
}

// Utilitário para ajuste de tonalidade de cor hexadecimal
function adjustBrightness(hex, percent) {
  if (!hex || hex[0] !== '#') return hex
  let num = parseInt(hex.slice(1), 16)
  let r = (num >> 16) + Math.round((255 * percent) / 100)
  let g = ((num >> 8) & 0x00ff) + Math.round((255 * percent) / 100)
  let b = (num & 0x0000ff) + Math.round((255 * percent) / 100)
  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
