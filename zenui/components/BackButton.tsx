import React from 'react'

interface BackButtonProps {
  onClick: () => void
  label?: string
}

export function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background:
          'linear-gradient(135deg, rgba(164,139,255,0.15), rgba(112,225,201,0.15))',
        backdropFilter: 'blur(12px)',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.06), 0 6px 18px rgba(112,225,201,0.18), 0 4px 14px rgba(164,139,255,0.18)'
      }}
      aria-label={label}
      title={label}
      onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
      onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
    >
      <span aria-hidden className="text-base leading-none text-[#7c6bf5]">←</span>
      <span className="text-slate-700">{label}</span>
    </button>
  )
}


