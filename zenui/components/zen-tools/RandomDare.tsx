import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Shuffle, RotateCcw, Check, Star } from 'lucide-react';

interface RandomDareProps {
  onBack: () => void;
}

const wellnessDares = [
  {
    id: 1,
    title: "Gratitude Boost",
    challenge: "Write down 3 things you're grateful for right now",
    category: "mindfulness",
    points: 10,
    emoji: "🙏",
    difficulty: "easy"
  },
  {
    id: 2,
    title: "Breathing Break",
    challenge: "Take 5 deep breaths and count to 10 on each exhale",
    category: "relaxation",
    points: 15,
    emoji: "🌬️",
    difficulty: "easy"
  },
  {
    id: 3,
    title: "Kindness Ripple",
    challenge: "Send a kind message to someone you care about",
    category: "connection",
    points: 20,
    emoji: "💝",
    difficulty: "medium"
  },
  {
    id: 4,
    title: "Movement Moment",
    challenge: "Do 20 jumping jacks or stretch for 2 minutes",
    category: "physical",
    points: 15,
    emoji: "🏃‍♀️",
    difficulty: "easy"
  },
  {
    id: 5,
    title: "Digital Detox",
    challenge: "Put your phone away for the next 30 minutes",
    category: "mindfulness",
    points: 25,
    emoji: "📱",
    difficulty: "medium"
  },
  {
    id: 6,
    title: "Smile Challenge",
    challenge: "Look in a mirror and give yourself a genuine compliment",
    category: "self-love",
    points: 20,
    emoji: "😊",
    difficulty: "medium"
  },
  {
    id: 7,
    title: "Nature Connection",
    challenge: "Step outside and notice 5 things in nature around you",
    category: "mindfulness",
    points: 15,
    emoji: "🌿",
    difficulty: "easy"
  },
  {
    id: 8,
    title: "Hydration Station",
    challenge: "Drink a full glass of water mindfully and slowly",
    category: "physical",
    points: 10,
    emoji: "💧",
    difficulty: "easy"
  },
  {
    id: 9,
    title: "Creative Expression",
    challenge: "Draw, doodle, or write something creative for 5 minutes",
    category: "creativity",
    points: 20,
    emoji: "🎨",
    difficulty: "medium"
  },
  {
    id: 10,
    title: "Mindful Moment",
    challenge: "Sit quietly and focus on one sound around you for 2 minutes",
    category: "mindfulness",
    points: 15,
    emoji: "/Zen Space logo.png",
    difficulty: "medium"
  },
  {
    id: 11,
    title: "Organization Zen",
    challenge: "Tidy up your immediate space for 5 minutes",
    category: "environment",
    points: 15,
    emoji: "✨",
    difficulty: "easy"
  },
  {
    id: 12,
    title: "Future Self",
    challenge: "Write a short encouraging note to your future self",
    category: "self-love",
    points: 25,
    emoji: "💌",
    difficulty: "medium"
  },
  {
    id: 13,
    title: "Laughter Therapy",
    challenge: "Watch a funny video or think of something that makes you laugh",
    category: "joy",
    points: 20,
    emoji: "😂",
    difficulty: "easy"
  },
  {
    id: 14,
    title: "Random Act",
    challenge: "Do something nice for someone without expecting anything back",
    category: "connection",
    points: 30,
    emoji: "🤝",
    difficulty: "hard"
  },
  {
    id: 15,
    title: "Memory Lane",
    challenge: "Think of your favorite memory from this past month",
    category: "reflection",
    points: 15,
    emoji: "💭",
    difficulty: "easy"
  }
];

interface CompletedDare {
  id: number;
  completedAt: string;
  points: number;
}

export function RandomDare({ onBack }: RandomDareProps) {
  const [currentDare, setCurrentDare] = useState<typeof wellnessDares[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [completedDares, setCompletedDares] = useState<CompletedDare[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalPoints = completedDares.reduce((sum, dare) => sum + dare.points, 0);
  
  const spinForDare = () => {
    setIsSpinning(true);
    setShowSuccess(false);
    
    // Simulate spinning animation delay
    setTimeout(() => {
      const randomDare = wellnessDares[Math.floor(Math.random() * wellnessDares.length)];
      setCurrentDare(randomDare);
      setIsSpinning(false);
    }, 1500);
  };

  const completeDare = () => {
    if (!currentDare) return;
    
    const newCompletion: CompletedDare = {
      id: currentDare.id,
      completedAt: new Date().toISOString(),
      points: currentDare.points
    };
    
    setCompletedDares(prev => [newCompletion, ...prev.slice(0, 9)]); // Keep last 10
    setShowSuccess(true);
    
    // Auto-hide success message
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      mindfulness: 'bg-purple-100 text-purple-800',
      relaxation: 'bg-blue-100 text-blue-800',
      connection: 'bg-pink-100 text-pink-800',
      physical: 'bg-green-100 text-green-800',
      'self-love': 'bg-yellow-100 text-yellow-800',
      creativity: 'bg-orange-100 text-orange-800',
      environment: 'bg-teal-100 text-teal-800',
      joy: 'bg-red-100 text-red-800',
      reflection: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <motion.div
                animate={isSpinning ? { rotate: 360 } : {}}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
              >
                <Shuffle className="w-5 h-5 text-white" />
              </motion.div>
              <h1 className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Random Dare!
              </h1>
            </div>
            <p className="text-muted-foreground">Fun wellness challenges to brighten your day</p>
          </motion.div>

          {/* Points Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="zen-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-primary">{totalPoints}</span>
                  <span className="text-muted-foreground">Wellness Points</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete dares to earn points and build healthy habits!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Dare Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dare Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="zen-card border-0 h-[400px] flex flex-col">
                  <CardHeader className="text-center">
                    <CardTitle>Your Wellness Challenge</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isSpinning ? (
                        <motion.div
                          key="spinning"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                            className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center"
                          >
                            <Shuffle className="w-12 h-12 text-white" />
                          </motion.div>
                          <p className="text-lg text-muted-foreground">Spinning for your dare...</p>
                        </motion.div>
                      ) : currentDare ? (
                        <motion.div
                          key="dare"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-center w-full"
                        >
                          <div className="text-6xl mb-4">{currentDare.emoji}</div>
                          <h3 className="text-xl mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {currentDare.title}
                          </h3>
                          <p className="text-lg mb-6 text-foreground leading-relaxed">
                            {currentDare.challenge}
                          </p>
                          <div className="flex items-center justify-center gap-2 mb-6">
                            <Badge className={getCategoryColor(currentDare.category)}>
                              {currentDare.category}
                            </Badge>
                            <Badge className={getDifficultyColor(currentDare.difficulty)}>
                              {currentDare.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              +{currentDare.points} points
                            </Badge>
                          </div>
                          <div className="flex gap-3 justify-center">
                            <Button
                              onClick={spinForDare}
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <RotateCcw className="w-4 h-4" />
                              New Dare
                            </Button>
                            <Button
                              onClick={completeDare}
                              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Complete Dare
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="start"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-center"
                        >
                          <div className="text-6xl mb-4">🎯</div>
                          <h3 className="text-xl mb-3">Ready for a Wellness Challenge?</h3>
                          <p className="text-muted-foreground mb-6 max-w-md">
                            Click the button below to get a random wellness dare that will brighten your day and boost your wellbeing!
                          </p>
                          <Button
                            onClick={spinForDare}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-lg px-8 py-3 text-white"
                          >
                            <Shuffle className="w-5 h-5 mr-2" />
                            Spin for Dare!
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  >
                    <Card className="zen-card border-0 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-2">🎉</div>
                        <h3 className="text-lg text-green-800 mb-1">Dare Completed!</h3>
                        <p className="text-green-600 text-sm">
                          You earned {currentDare?.points} wellness points! Keep up the great work!
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Recent Completions */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="zen-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Dares</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {completedDares.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No completed dares yet. Start your first challenge!
                      </p>
                    ) : (
                      completedDares.map((completion, index) => {
                        const dare = wellnessDares.find(d => d.id === completion.id);
                        if (!dare) return null;
                        
                        return (
                          <div
                            key={`${completion.id}-${completion.completedAt}`}
                            className="p-3 bg-white/50 rounded-lg border border-white/20"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{dare.emoji} {dare.title}</span>
                              <Badge variant="outline" className="text-xs">
                                +{completion.points}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(completion.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Motivational Quote */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="zen-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">💪</div>
                    <p className="text-sm text-muted-foreground italic">
                      "Small steps daily lead to big changes yearly. Every dare completed is progress!"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}