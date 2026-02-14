import React from 'react'

interface LogoProps {
  onClick?: () => void
  title?: string
}

export function Logo({ onClick, title = 'Zen Space' }: LogoProps) {
  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      onClick={onClick}
      className="group relative block w-16 h-16 md:w-[64px] md:h-[64px] rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:ring-offset-2 focus:ring-offset-background select-none"
      style={{
        // soft dual-color glow; tuned to theme (purple-green)
        filter:
          'drop-shadow(0 2px 8px rgba(0,0,0,0.12)) drop-shadow(0 0 10px rgba(112, 225, 201, 0.25)) drop-shadow(0 0 10px rgba(164, 139, 255, 0.25))',
      }}
    >
      <img
        src="/app-logo.png"
        alt={title}
        className="w-full h-full object-contain transition-transform duration-200 ease-out group-hover:scale-105 transform scale-[2.6]"
      />
      {/* border removed so only the logo is visible inside the circle */}
    </button>
  )
}


