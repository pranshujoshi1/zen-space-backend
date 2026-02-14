import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Brain, BookOpen, Play, Pause, RotateCcw, Heart, Moon, Focus, Zap } from 'lucide-react';

const meditationSessions = [
  {
    id: 1,
    title: 'Morning Focus',
    duration: '10 min',
    description: 'Start your day with clarity and intention',
    icon: Focus,
    color: 'from-yellow-500 to-orange-500',
    category: 'Focus'
  },
  {
    id: 2,
    title: 'Stress Relief',
    duration: '15 min',
    description: 'Release tension and find inner peace',
    icon: Heart,
    color: 'from-green-500 to-emerald-500',
    category: 'Calm'
  },
  {
    id: 3,
    title: 'Better Sleep',
    duration: '20 min',
    description: 'Prepare your mind for restful sleep',
    icon: Moon,
    color: 'from-purple-500 to-indigo-500',
    category: 'Sleep'
  },
  {
    id: 4,
    title: 'Energy Boost',
    duration: '8 min',
    description: 'Revitalize your mind and body',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    category: 'Motivation'
  }
];

const journalEntries = [
  {
    id: 1,
    date: '2024-10-06',
    mood: 'Grateful',
    preview: 'Today I felt grateful for the support from my friends during the group project...',
    content: 'Today I felt grateful for the support from my friends during the group project. It reminded me that I\'m not alone in this journey.',
    tags: ['gratitude', 'friendship', 'academics']
  },
  {
    id: 2,
    date: '2024-10-05',
    mood: 'Anxious',
    preview: 'Feeling overwhelmed with the upcoming midterms. Need to remember to breathe...',
    content: 'Feeling overwhelmed with the upcoming midterms. Need to remember to breathe and take things one step at a time.',
    tags: ['anxiety', 'exams', 'stress']
  },
  {
    id: 3,
    date: '2024-10-04',
    mood: 'Peaceful',
    preview: 'Had a wonderful meditation session this morning. Feeling centered and ready...',
    content: 'Had a wonderful meditation session this morning. Feeling centered and ready for whatever the day brings.',
    tags: ['meditation', 'peace', 'morning']
  }
];

const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Peaceful' },
  { emoji: '🙏', label: 'Grateful' },
  { emoji: '😟', label: 'Anxious' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😤', label: 'Frustrated' },
];

export function MeditationJournal() {
  const [activeTab, setActiveTab] = useState('meditation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startMeditation = (sessionId: number) => {
    setCurrentSession(sessionId);
    setTimeLeft(600); // Reset to 10 minutes
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setTimeLeft(600);
    setIsPlaying(false);
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim() && selectedMood) {
      console.log('Saving journal entry:', { entry: journalEntry, mood: selectedMood });
      setJournalEntry('');
      setSelectedMood(null);
      // Show success message
      alert('Journal entry saved! 📝');
    }
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      'Happy': 'bg-yellow-100 text-yellow-800',
      'Peaceful': 'bg-blue-100 text-blue-800',
      'Grateful': 'bg-green-100 text-green-800',
      'Anxious': 'bg-orange-100 text-orange-800',
      'Sad': 'bg-gray-100 text-gray-800',
      'Frustrated': 'bg-red-100 text-red-800'
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen zen-gradient relative">
      <div className="p-4 pb-20 pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-6 h-6 text-primary" />
            <h1 className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mindfulness Center
            </h1>
          </div>
          <p className="text-muted-foreground">Meditation sessions and personal journaling</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="meditation" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Meditation
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Journal
              </TabsTrigger>
            </TabsList>

            {/* Meditation Tab */}
            <TabsContent value="meditation" className="space-y-6">
              {currentSession ? (
                // Active Meditation Session
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <Card className="zen-card border-0">
                    <CardContent className="p-8">
                      <div className="mb-8">
                        <h2 className="text-2xl mb-2">
                          {meditationSessions.find(s => s.id === currentSession)?.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {meditationSessions.find(s => s.id === currentSession)?.description}
                        </p>
                      </div>

                      {/* Timer Circle */}
                      <div className="relative w-48 h-48 mx-auto mb-8">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="88"
                            fill="none"
                            stroke="rgba(139, 92, 246, 0.1)"
                            strokeWidth="8"
                          />
                          <circle
                            cx="96"
                            cy="96"
                            r="88"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 88}`}
                            strokeDashoffset={`${2 * Math.PI * 88 * (1 - timeLeft / 600)}`}
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl mb-2">{formatTime(timeLeft)}</div>
                            <div className="text-sm text-muted-foreground">minutes left</div>
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          onClick={resetTimer}
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
                          onClick={() => setCurrentSession(null)}
                          variant="outline"
                          size="lg"
                          className="rounded-full px-6"
                        >
                          End Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                // Meditation Session Selection
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {meditationSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Card className="zen-card border-0 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${session.color} flex items-center justify-center`}>
                              <session.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">{session.duration}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{session.category}</Badge>
                            <Button
                              onClick={() => startMeditation(session.id)}
                              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                            >
                              Start Session
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Journal Tab */}
            <TabsContent value="journal" className="space-y-6">
              {/* New Journal Entry */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="zen-card border-0">
                  <CardHeader>
                    <CardTitle>Today I feel...</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Mood Selection */}
                    <div>
                      <p className="text-sm mb-3">Select your mood</p>
                      <div className="flex flex-wrap gap-2">
                        {moodOptions.map((mood) => (
                          <Button
                            key={mood.label}
                            onClick={() => setSelectedMood(mood.label)}
                            variant={selectedMood === mood.label ? "default" : "outline"}
                            className={`rounded-full ${
                              selectedMood === mood.label 
                                ? 'bg-gradient-to-r from-primary to-secondary' 
                                : ''
                            }`}
                          >
                            <span className="mr-2">{mood.emoji}</span>
                            {mood.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Journal Textarea */}
                    <div>
                      <Textarea
                        value={journalEntry}
                        onChange={(e) => setJournalEntry(e.target.value)}
                        placeholder="Write about your thoughts, feelings, or experiences today..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Your entries are private and secure
                      </p>
                      <Button
                        onClick={saveJournalEntry}
                        disabled={!journalEntry.trim() || !selectedMood}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        Save Entry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Previous Entries */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg mb-4">Recent Entries</h3>
                <div className="space-y-4">
                  {journalEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="zen-card border-0 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Badge className={getMoodColor(entry.mood)}>
                                {entry.mood}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{entry.date}</span>
                            </div>
                          </div>
                          <p className="text-sm mb-3">{entry.preview}</p>
                          <div className="flex flex-wrap gap-1">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
        </div>
      </div>
    </div>
  );
}