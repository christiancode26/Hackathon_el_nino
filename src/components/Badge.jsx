import React from 'react'

export default function Badge({
  children,
  variant = 'default',
  level = 'verde',
  points,
  className = '',
  ...props
}) {
  if (variant === 'points') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A] ${className}`}
        {...props}
      >
        <span>⚡</span>
        <span>+{points || children} pts</span>
      </span>
    )
  }

  if (variant === 'risk') {
    const riskColors = {
      verde: 'bg-[#EAF7EE] text-[#2E9E5B] border-[#A7F3D0]',
      amarelo: 'bg-[#FEFCE8] text-[#CA8A04] border-[#FEF08A]',
      laranja: 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]',
      vermelho: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
    }
    const colorClass = riskColors[level] || riskColors.verde
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${colorClass} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }

  if (variant === 'status') {
    const statusClasses = {
      pendente: 'bg-gray-100 text-gray-600 border-gray-200',
      em_validacao: 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]',
      concluida: 'bg-[#EAF7EE] text-[#2E9E5B] border-[#A7F3D0]',
    }
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusClasses[children] || 'bg-gray-100 text-gray-700'} ${className}`}
        {...props}
      >
        {children === 'concluida' ? '✓ Concluída' : children === 'em_validacao' ? '⏱ Em validação' : children}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
