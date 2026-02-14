import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Brain, BookOpen, MessageCircle, TrendingUp, Sparkles, Calendar, ArrowLeft } from 'lucide-react';

interface DashboardProps {
  user: { name: string; email: string };
  onNavigate: (screen: string) => void;
}

const moodData = [
  { day: 'Mon', mood: 4 },
  { day: 'Tue', mood: 3 },
  { day: 'Wed', mood: 5 },
  { day: 'Thu', mood: 4 },
  { day: 'Fri', mood: 5 },
  { day: 'Sat', mood: 4 },
  { day: 'Sun', mood: 5 },
];

const quickActions = [
  {
    icon: Brain,
    title: 'Meditation',
    subtitle: '10 min session',
    color: 'from-purple-500 to-purple-600',
    action: 'meditation'
  },
  {
    icon: BookOpen,
    title: 'Journal',
    subtitle: 'Write thoughts',
    color: 'from-green-500 to-green-600',
    action: 'journal'
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    subtitle: 'Get personalized tips',
    color: 'from-blue-500 to-blue-600',
    action: 'insights'
  },
  {
    icon: MessageCircle,
    title: 'Support Hub',
    subtitle: 'Connect with peers',
    color: 'from-pink-500 to-pink-600',
    action: 'support'
  }
];

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const currentStreak = 7;
  const wellnessScore = 78;

  return (
    <div className="min-h-screen zen-gradient zen-gradient-animate relative">
      <div className="p-4 pb-24">
        <div className="max-w-[900px] mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <h1 className="text-3xl mb-2">
            Hi, {user.firstName || user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground">Welcome back to your wellness journey</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-purple-100/50 shadow-[0_8px_32px_rgba(167,139,250,0.12)] hover:shadow-[0_16px_48px_rgba(167,139,250,0.18)] transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2 font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">{currentStreak}</div>
                <div className="text-sm text-slate-600 font-medium">Day Streak</div>
                <div className="text-xs text-purple-500 mt-2 font-medium">🔥 Keep it up!</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-purple-100/50 shadow-[0_8px_32px_rgba(167,139,250,0.12)] hover:shadow-[0_16px_48px_rgba(167,139,250,0.18)] transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2 font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">{wellnessScore}%</div>
                <div className="text-sm text-slate-600 font-medium">Wellness Score</div>
                <div className="text-xs text-green-500 mt-2 font-medium">📈 Improving</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Mood Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-purple-100/50 shadow-[0_12px_40px_rgba(167,139,250,0.15)] hover:shadow-[0_20px_60px_rgba(167,139,250,0.22)] transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  Weekly Mood Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-64 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent rounded-2xl"></div>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                      <defs>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#a78bfa" />
                          <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(167,139,250,0.1)" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 13, fill: '#64748b', fontWeight: 500 }}
                      />
                      <YAxis hide />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="url(#moodGradient)" 
                        strokeWidth={4}
                        dot={{ fill: '#a78bfa', strokeWidth: 3, r: 6, stroke: '#fff' }}
                        activeDot={{ r: 8, stroke: '#a78bfa', strokeWidth: 3, fill: '#fff' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Wellness Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-purple-100/50 shadow-[0_12px_40px_rgba(167,139,250,0.15)] hover:shadow-[0_20px_60px_rgba(167,139,250,0.22)] transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-slate-800">Today's Wellness Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium text-slate-700">Mindfulness</span>
                    <span className="font-semibold text-purple-600">75%</span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium text-slate-700">Physical Activity</span>
                    <span className="font-semibold text-purple-600">50%</span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "50%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium text-slate-700">Social Connection</span>
                    <span className="font-semibold text-purple-600">90%</span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "90%" }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.action}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="border-0 rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-purple-100/50 shadow-[0_8px_32px_rgba(167,139,250,0.12)] hover:shadow-[0_16px_48px_rgba(167,139,250,0.18)] cursor-pointer transition-all duration-300"
                onClick={() => onNavigate(action.action)}
              >
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${action.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <action.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-semibold mb-2 text-slate-800">{action.title}</h3>
                  <p className="text-sm text-slate-600">{action.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Today's Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-purple-100/50 shadow-[0_8px_32px_rgba(167,139,250,0.12)] hover:shadow-[0_16px_48px_rgba(167,139,250,0.18)] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Today's Wellness Tip</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Try the 5-4-3-2-1 grounding technique: Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Daily Check-in Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 rounded-3xl bg-white/90 backdrop-blur-md ring-1 ring-purple-100/50 shadow-[0_8px_32px_rgba(167,139,250,0.12)] hover:shadow-[0_16px_48px_rgba(167,139,250,0.18)] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center shadow-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Tomorrow's Check-in</h3>
                      <p className="text-sm text-slate-600">Ready at 9:00 AM</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
                  >
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}