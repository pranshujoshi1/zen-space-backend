import { motion } from 'framer-motion';
import { Home, BarChart3, MessageCircle, User, Sparkles } from 'lucide-react';

interface BottomNavigationProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'zentools', icon: Sparkles, label: 'ZEN TOOLS' },
  { id: 'analytics', icon: BarChart3, label: 'Insights' },
  { id: 'support', icon: MessageCircle, label: 'Support' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNavigation({ activeScreen, onNavigate }: BottomNavigationProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backdropFilter: 'blur(18px)',
        background:
          'linear-gradient(135deg, rgba(164, 139, 255, 0.08), rgba(112, 225, 201, 0.08)), rgba(255, 255, 255, 0.55)',
        borderTop: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="flex items-center justify-around py-2.5 px-2">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl transition-all duration-300 ${
                isActive ? 'text-white' : 'text-slate-600 hover:text-white'
              }`}
              whileHover={{ scale: 1.045, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* gradient background overlay (hover + active) */}
              <span
                aria-hidden
                className={`absolute inset-0 rounded-2xl transition-all duration-300 shadow-[0_6px_18px_rgba(112,225,201,0.18),0_4px_14px_rgba(164,139,255,0.18)] bg-gradient-to-r from-[#a48bff] to-[#70e1c9] opacity-0 group-hover:opacity-95 ${
                  isActive ? 'opacity-95' : ''
                }`}
              />
              <motion.div className="relative z-10" animate={isActive ? { scale: 1.06 } : { scale: 1 }} transition={{ duration: 0.2 }}>
                <item.icon className="w-6 h-6 mb-1" />
              </motion.div>
              <span className={`text-[11px] font-medium relative z-10 transition-colors duration-200 ${
                item.id === 'zentools' ? 'text-center leading-tight' : ''
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}