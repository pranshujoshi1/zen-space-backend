import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Play, Pause, RotateCcw, Focus, Heart, Moon } from 'lucide-react';

interface MeditationGuideProps {
  onBack: () => void;
}

const meditationTypes = [
  {
    id: 'focus',
    title: 'Focus & Clarity',
    description: 'Sharpen your concentration and clear your mind',
    duration: 600, // 10 minutes
    icon: Focus,
    color: 'from-blue-500 to-blue-600',
    breathingPattern: { inhale: 4, hold: 4, exhale: 4, pause: 2 }
  },
  {
    id: 'calm',
    title: 'Inner Calm',
    description: 'Release stress and find deep relaxation',
    duration: 900, // 15 minutes
    icon: Heart,
    color: 'from-green-500 to-green-600',
    breathingPattern: { inhale: 4, hold: 7, exhale: 8, pause: 2 }
  },
  {
    id: 'sleep',
    title: 'Better Sleep',
    description: 'Prepare your mind for restful sleep',
    duration: 1200, // 20 minutes
    icon: Moon,
    color: 'from-purple-500 to-purple-600',
    breathingPattern: { inhale: 6, hold: 2, exhale: 8, pause: 4 }
  }
];

type SessionState = 'select' | 'active' | 'complete';

export function MeditationGuide({ onBack }: MeditationGuideProps) {
  const [sessionState, setSessionState] = useState<SessionState>('select');
  const [selectedMeditation, setSelectedMeditation] = useState(meditationTypes[0]);
  const [timeLeft, setTimeLeft] = useState(selectedMeditation.duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && sessionState === 'active') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setSessionState('complete');
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sessionState]);

  // Breathing animation effect
  useEffect(() => {
    let breathingInterval: NodeJS.Timeout;
    
    if (isPlaying && sessionState === 'active') {
      const pattern = selectedMeditation.breathingPattern;
      const totalCycle = pattern.inhale + pattern.hold + pattern.exhale + pattern.pause;
      let currentTime = 0;

      breathingInterval = setInterval(() => {
        currentTime = (currentTime + 0.1) % totalCycle;
        
        if (currentTime < pattern.inhale) {
          setBreathingPhase('inhale');
          setBreathingProgress((currentTime / pattern.inhale) * 100);
        } else if (currentTime < pattern.inhale + pattern.hold) {
          setBreathingPhase('hold');
          setBreathingProgress(100);
        } else if (currentTime < pattern.inhale + pattern.hold + pattern.exhale) {
          setBreathingPhase('exhale');
          const exhaleProgress = (currentTime - pattern.inhale - pattern.hold) / pattern.exhale;
          setBreathingProgress((1 - exhaleProgress) * 100);
        } else {
          setBreathingPhase('pause');
          setBreathingProgress(0);
        }
      }, 100);
    }

    return () => clearInterval(breathingInterval);
  }, [isPlaying, sessionState, selectedMeditation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startMeditation = (meditation: typeof meditationTypes[0]) => {
    setSelectedMeditation(meditation);
    setTimeLeft(meditation.duration);
    setSessionState('active');
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setTimeLeft(selectedMeditation.duration);
    setIsPlaying(false);
    setBreathingProgress(0);
    setBreathingPhase('inhale');
  };

  const backToSelect = () => {
    setSessionState('select');
    setIsPlaying(false);
    resetSession();
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
    }
  };

  if (sessionState === 'complete') {
    return (
      <div className="min-h-screen zen-gradient relative flex items-center justify-center">
        <motion.button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2 rounded-lg bg-white/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
          <h2 className="text-3xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Session Complete!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Well done! You've completed your {selectedMeditation.title.toLowerCase()} meditation. 
            How do you feel?
          </p>
          <div className="space-y-4">
            <Button
              onClick={backToSelect}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 px-8"
            >
              Try Another Session
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="px-8"
            >
              Back to ZEN Tools
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (sessionState === 'active') {
    return (
      <div className="min-h-screen zen-gradient relative">
        <motion.button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2 rounded-lg bg-white/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </motion.button>

        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {selectedMeditation.title}
            </h2>
            <p className="text-muted-foreground">{selectedMeditation.description}</p>
          </motion.div>

          {/* Breathing Circle */}
          <div className="relative w-80 h-80 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="rgba(139, 92, 246, 0.1)"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="url(#breathingGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 140}`}
                strokeDashoffset={`${2 * Math.PI * 140 * (1 - timeLeft / selectedMeditation.duration)}`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="breathingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated breathing circle */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'exhale' ? 0.8 : 1
              }}
              transition={{
                duration: breathingPhase === 'inhale' ? selectedMeditation.breathingPattern.inhale :
                         breathingPhase === 'exhale' ? selectedMeditation.breathingPattern.exhale : 0.5,
                ease: "easeInOut"
              }}
            >
              <div className={`w-40 h-40 rounded-full bg-gradient-to-r ${selectedMeditation.color} opacity-80 flex items-center justify-center`}>
                <div className="text-center text-white">
                  <div className="text-2xl mb-2">{formatTime(timeLeft)}</div>
                  <div className="text-sm font-medium">{getBreathingInstruction()}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              onClick={resetSession}
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12 p-0"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              onClick={togglePlayPause}
              size="lg"
              className="rounded-full w-16 h-16 p-0 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
            <Button
              onClick={backToSelect}
              variant="outline"
              size="lg"
              className="rounded-full px-6"
            >
              End Session
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen zen-gradient relative">
      <motion.button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2 rounded-lg bg-white/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </motion.button>

      <div className="p-4 pb-20 pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Focus className="w-6 h-6 text-primary" />
              <h1 className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Meditation Guide
              </h1>
            </div>
            <p className="text-muted-foreground">Choose your meditation journey</p>
          </motion.div>

          {/* Meditation Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {meditationTypes.map((meditation, index) => (
              <motion.div
                key={meditation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="zen-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${meditation.color} mx-auto mb-4 flex items-center justify-center`}>
                      <meditation.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{meditation.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {meditation.description}
                    </p>
                    <div className="text-sm font-medium text-primary">
                      {Math.floor(meditation.duration / 60)} minutes
                    </div>
                    <Button
                      onClick={() => startMeditation(meditation)}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white"
                    >
                      Start Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="zen-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-6 text-center">
                <h3 className="font-medium mb-4">Benefits of Regular Meditation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>🧠 Better Focus</div>
                  <div>😌 Reduced Stress</div>
                  <div>💤 Improved Sleep</div>
                  <div>❤️ Emotional Balance</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}