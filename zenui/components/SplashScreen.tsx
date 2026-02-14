import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="min-h-screen zen-gradient zen-gradient-animate flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Purple (top-left) */}
        <div className="absolute top-16 left-16 w-[26rem] h-[26rem] rounded-full blur-[140px] zen-float-slow" style={{ backgroundColor: '#b794f6', opacity: 0.6 }} />
        {/* Green (right middle) */}
        <div className="absolute top-36 right-12 w-[24rem] h-[24rem] rounded-full blur-[130px] zen-float" style={{ backgroundColor: '#a8edea', opacity: 0.6, animationDelay: '6s' }} />
        {/* Blue (bottom-left center-ish) */}
        <div className="absolute bottom-16 left-[28%] w-[26rem] h-[26rem] rounded-full blur-[140px] zen-float-fast" style={{ backgroundColor: '#8ec5fc', opacity: 0.55, animationDelay: '10s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 flex flex-col items-center"
      >
        {/* Logo - Breathing Circle */}
        <motion.div
          className="mx-auto mb-8 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-green-500 flex items-center justify-center zen-pulse zen-glow overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <motion.div
            className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 360] 
            }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <img
            src="/app-logo.png"
            alt="Zen Space"
            className="w-full h-full object-contain transform scale-[2]"
            style={{
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12)) drop-shadow(0 0 10px rgba(112, 225, 201, 0.25)) drop-shadow(0 0 10px rgba(164, 139, 255, 0.25))',
            }}
            />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500 bg-clip-text text-transparent tracking-wide"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
        >
          ZEN SPACE
        </motion.h1>

        <motion.p
          className="text-lg mb-12 text-gray-500 max-w-md mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
        >
          Your 24/7 Digital Mental Wellness Companion
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ y: 4 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Button
              onClick={onGetStarted}
              className="btn-zen rounded-[30px]"
              size="lg"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent"></div>
    </div>
  );
}