import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Save, Lightbulb, Sparkles } from 'lucide-react';

interface JournalingToolProps {
  onBack: () => void;
}

const moodTags = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-800' },
  { emoji: '😌', label: 'Peaceful', color: 'bg-blue-100 text-blue-800' },
  { emoji: '🙏', label: 'Grateful', color: 'bg-green-100 text-green-800' },
  { emoji: '😟', label: 'Anxious', color: 'bg-orange-100 text-orange-800' },
  { emoji: '😔', label: 'Sad', color: 'bg-gray-100 text-gray-800' },
  { emoji: '😤', label: 'Frustrated', color: 'bg-red-100 text-red-800' },
  { emoji: '🤔', label: 'Reflective', color: 'bg-purple-100 text-purple-800' },
  { emoji: '💪', label: 'Motivated', color: 'bg-emerald-100 text-emerald-800' },
];

const inspirationPrompts = [
  "What are three things you're grateful for today?",
  "Describe a moment when you felt truly proud of yourself.",
  "What's one challenge you overcame recently?",
  "Write about someone who made your day better.",
  "What's something new you learned about yourself this week?",
  "Describe your ideal day from start to finish.",
  "What advice would you give to your younger self?",
  "What's one thing you're looking forward to?",
  "Write about a place that makes you feel peaceful.",
  "What's a skill you'd like to develop and why?",
  "Describe a time when you helped someone else.",
  "What's something that always makes you smile?",
  "Write about your biggest accomplishment this month.",
  "What does self-care mean to you?",
  "Describe a perfect moment from your recent memory."
];

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  date: string;
  prompt?: string;
}

export function JournalingTool({ onBack }: JournalingToolProps) {
  const [journalContent, setJournalContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);

  // Auto-save functionality
  useEffect(() => {
    if (journalContent || selectedMood) {
      const timer = setTimeout(() => {
        // Auto-save logic would go here
        console.log('Auto-saving...', { content: journalContent, mood: selectedMood });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [journalContent, selectedMood]);

  // Load recent entries
  useEffect(() => {
    const saved = localStorage.getItem('zenJournalEntries');
    if (saved) {
      setRecentEntries(JSON.parse(saved));
    }
  }, []);

  const getRandomPrompt = () => {
    const randomPrompt = inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  const saveEntry = () => {
    if (!journalContent.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: journalContent,
      mood: selectedMood || 'Neutral',
      date: new Date().toISOString(),
      prompt: currentPrompt || undefined
    };

    const updatedEntries = [newEntry, ...recentEntries.slice(0, 4)];
    setRecentEntries(updatedEntries);
    localStorage.setItem('zenJournalEntries', JSON.stringify(updatedEntries));

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);

    // Clear form
    setJournalContent('');
    setSelectedMood(null);
    setCurrentPrompt(null);
  };

  const clearEntry = () => {
    setJournalContent('');
    setSelectedMood(null);
    setCurrentPrompt(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-sm">📝</span>
              </div>
              <h1 className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Journaling
              </h1>
            </div>
            <p className="text-muted-foreground">Express your thoughts and feelings</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Journaling Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Inspiration Prompt */}
              {currentPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="zen-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">Writing Prompt</h3>
                          <p className="text-sm text-muted-foreground">{currentPrompt}</p>
                        </div>
                        <Button
                          onClick={() => setCurrentPrompt(null)}
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                        >
                          ✕
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Writing Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="zen-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Today's Entry</span>
                      <div className="flex gap-2">
                        <Button
                          onClick={getRandomPrompt}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          <Lightbulb className="w-3 h-3 mr-1" />
                          Need Inspiration?
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={journalContent}
                      onChange={(e) => setJournalContent(e.target.value)}
                      placeholder="What's on your mind today? How are you feeling? What are you grateful for?"
                      className="min-h-[200px] resize-none border-0 bg-white/50 focus:bg-white/70 transition-colors"
                    />

                    {/* Mood Tags */}
                    <div>
                      <p className="text-sm mb-3">How are you feeling?</p>
                      <div className="flex flex-wrap gap-2">
                        {moodTags.map((mood) => (
                          <button
                            key={mood.label}
                            onClick={() => setSelectedMood(mood.label)}
                            className={`px-3 py-1 rounded-full text-xs transition-all ${
                              selectedMood === mood.label
                                ? mood.color + ' ring-2 ring-primary/30'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            <span className="mr-1">{mood.emoji}</span>
                            {mood.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4">
                      <div className="text-xs text-muted-foreground">
                        {journalContent ? 'Auto-saving...' : 'Start writing to auto-save'}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={clearEntry}
                          variant="outline"
                          size="sm"
                          disabled={!journalContent && !selectedMood}
                        >
                          Clear
                        </Button>
                        <Button
                          onClick={saveEntry}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                          size="sm"
                          disabled={!journalContent.trim()}
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save Entry
                        </Button>
                      </div>
                    </div>

                    {/* Save Confirmation */}
                    {isSaved && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="text-green-800 text-sm flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Entry saved successfully!
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Entries Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="zen-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Entries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentEntries.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No entries yet. Start writing to see your thoughts here!
                      </p>
                    ) : (
                      recentEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="p-3 bg-white/50 rounded-lg border border-white/20 hover:bg-white/70 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={
                              moodTags.find(m => m.label === entry.mood)?.color || 'bg-gray-100 text-gray-800'
                            }>
                              {moodTags.find(m => m.label === entry.mood)?.emoji} {entry.mood}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(entry.date)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground line-clamp-3">
                            {entry.content}
                          </p>
                          {entry.prompt && (
                            <p className="text-xs text-primary mt-2 italic">
                              "{entry.prompt}"
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="zen-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Journaling Tips
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Write without judgment</li>
                      <li>• Focus on how you feel</li>
                      <li>• Be honest with yourself</li>
                      <li>• Don't worry about grammar</li>
                      <li>• Try to write regularly</li>
                    </ul>
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