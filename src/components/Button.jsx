import React from 'react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  monthColor = null,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-xl',
    md: 'px-5 py-3 text-sm font-bold rounded-2xl',
    lg: 'px-6 py-4 text-base font-bold rounded-2xl',
  }

  const baseClasses = 'inline-flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm'

  let variantStyles = ''
  let dynamicInlineStyle = {}

  if (variant === 'primary') {
    if (monthColor) {
      dynamicInlineStyle = { backgroundColor: monthColor, color: '#FFFFFF' }
      variantStyles = 'hover:opacity-90'
    } else {
      variantStyles = 'bg-[#EC6FA3] hover:bg-[#d85c90] text-white' // Cor padrão Outubro do Figma
    }
  } else if (variant === 'brand') {
    variantStyles = 'bg-[#2E9E5B] hover:bg-[#25874c] text-white'
  } else if (variant === 'dark') {
    variantStyles = 'bg-[#153B2D] hover:bg-[#0e2a20] text-white'
  } else if (variant === 'secondary') {
    variantStyles = 'bg-white hover:bg-gray-50 text-[#1F2933] border border-gray-200'
  } else if (variant === 'outline') {
    variantStyles = 'bg-transparent border-2 border-[#2E9E5B] text-[#2E9E5B] hover:bg-[#2E9E5B]/10'
  } else if (variant === 'ghost') {
    variantStyles = 'bg-transparent text-[#1F2933] hover:bg-gray-100 shadow-none'
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={dynamicInlineStyle}
      className={`${baseClasses} ${sizeClasses[size]} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : icon ? (
        <span className="mr-2 inline-flex items-center">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}
