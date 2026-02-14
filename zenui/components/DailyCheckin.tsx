import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
 

interface DailyCheckinProps {
  onComplete: (data: any) => void;
}

const moodEmojis = [
  { emoji: '😢', label: 'Sad', value: 1 },
  { emoji: '😟', label: 'Anxious', value: 2 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😊', label: 'Calm', value: 4 },
  { emoji: '😄', label: 'Happy', value: 5 },
];

export function DailyCheckin({ onComplete }: DailyCheckinProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [motivation, setMotivation] = useState([5]);
  const [stress, setStress] = useState([3]);
  const [sleep, setSleep] = useState([7]);
  const [energy, setEnergy] = useState([5]);

  const handleSubmit = () => {
    if (selectedMood === null) return;

    const checkinData = {
      mood: selectedMood,
      motivation: motivation[0],
      stress: stress[0],
      sleep: sleep[0],
      energy: energy[0],
      date: new Date().toISOString().split('T')[0]
    };

    // Trigger confetti animation
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since confetti isn't available, we'll simulate with a celebration
      console.log('🎉 Celebration! Check-in completed!');
    }, 250);

    setTimeout(() => {
      onComplete(checkinData);
    }, 2000);
  };

  return (
    <div className="min-h-screen zen-gradient zen-gradient-animate relative">
      <div className="p-4 flex items-center justify-center min-h-screen py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md md:max-w-lg"
        >
        <Card className="border-0 rounded-2xl bg-white/85 backdrop-blur-sm ring-1 ring-black/5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent font-semibold">
              Daily Check-in
            </CardTitle>
            <p className="text-muted-foreground">How are you feeling today?</p>
          </CardHeader>
          <CardContent className="space-y-8 pb-10">
            {/* Mood Selector */}
            <div>
              <Label className="text-base mb-4 block">Select your mood</Label>
              <div className="flex justify-between gap-3">
                {moodEmojis.map((mood) => (
                  <motion.button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-4 rounded-full transition-all duration-300 shadow-sm ${
                      selectedMood === mood.value
                        ? 'bg-gradient-to-br from-purple-400/30 via-cyan-300/30 to-emerald-300/30 scale-110 shadow-[0_8px_24px_rgba(124,58,237,0.12)]'
                        : 'bg-white/60 backdrop-blur border border-gray-200/60 hover:bg-white/75 hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <p className="text-xs mt-1">{mood.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Wellness Sliders */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm mb-3 block">How motivated do you feel? ({motivation[0]}/10)</Label>
                <Slider
                  value={motivation}
                  onValueChange={setMotivation}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm mb-3 block">How stressed are you today? ({stress[0]}/10)</Label>
                <Slider
                  value={stress}
                  onValueChange={setStress}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm mb-3 block">How many hours did you sleep? ({sleep[0]} hours)</Label>
                <Slider
                  value={sleep}
                  onValueChange={setSleep}
                  max={12}
                  min={3}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm mb-3 block">Energy level today ({energy[0]}/10)</Label>
                <Slider
                  value={energy}
                  onValueChange={setEnergy}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={selectedMood === null}
              className="w-full btn-zen rounded-[16px] py-6"
            >
              Complete Check-in ✨
            </Button>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
}