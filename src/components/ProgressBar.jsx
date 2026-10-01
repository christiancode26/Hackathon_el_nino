import React from 'react'

export default function ProgressBar({
  progress = 0, // 0 to 100
  color = '#EC6FA3', // Cor padrão ou do mês
  trackColor = '#E5E7EB',
  height = 'h-2.5',
  showLabel = false,
  label = '',
  valueText = '',
  className = '',
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label || valueText) && (
        <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5 font-medium">
          <span>{label}</span>
          <span>{valueText || `${Math.round(clampedProgress)}%`}</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full overflow-hidden`} style={{ backgroundColor: trackColor }}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out`}
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}
