import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { TrendingUp, Calendar, Award, Download, Target, Activity, Brain, Heart } from 'lucide-react';

const weeklyMoodData = [
  { day: 'Mon', mood: 4, stress: 6, energy: 7, motivation: 5 },
  { day: 'Tue', mood: 3, stress: 7, energy: 6, motivation: 4 },
  { day: 'Wed', mood: 5, stress: 4, energy: 8, motivation: 7 },
  { day: 'Thu', mood: 4, stress: 5, energy: 7, motivation: 6 },
  { day: 'Fri', mood: 5, stress: 3, energy: 9, motivation: 8 },
  { day: 'Sat', mood: 4, stress: 2, energy: 8, motivation: 7 },
  { day: 'Sun', mood: 5, stress: 3, energy: 8, motivation: 8 },
];

const monthlyProgressData = [
  { month: 'Aug', checkIns: 28, meditations: 15, journalEntries: 12 },
  { month: 'Sep', checkIns: 30, meditations: 20, journalEntries: 18 },
  { month: 'Oct', checkIns: 6, meditations: 8, journalEntries: 5 },
];

const moodDistribution = [
  { name: 'Happy', value: 35, color: '#10b981' },
  { name: 'Calm', value: 28, color: '#8b5cf6' },
  { name: 'Neutral', value: 20, color: '#6b7280' },
  { name: 'Anxious', value: 12, color: '#f59e0b' },
  { name: 'Sad', value: 5, color: '#ef4444' },
];

const wellnessRadarData = [
  { subject: 'Emotional Balance', current: 78, target: 90 },
  { subject: 'Stress Management', current: 65, target: 80 },
  { subject: 'Social Connection', current: 92, target: 85 },
  { subject: 'Physical Activity', current: 58, target: 75 },
  { subject: 'Sleep Quality', current: 72, target: 85 },
  { subject: 'Mindfulness', current: 85, target: 90 },
];

const achievements = [
  {
    id: 1,
    title: 'Weekly Warrior',
    description: '7 consecutive daily check-ins',
    icon: '🔥',
    earned: true,
    date: '2024-10-01'
  },
  {
    id: 2,
    title: 'Mindful Beginner',
    description: 'Completed 5 meditation sessions',
    icon: '/Zen Space logo.png',
    earned: true,
    date: '2024-09-28'
  },
  {
    id: 3,
    title: 'Journal Keeper',
    description: '10 journal entries written',
    icon: '📝',
    earned: true,
    date: '2024-09-25'
  },
  {
    id: 4,
    title: 'Stress Buster',
    description: 'Reduced average stress by 20%',
    icon: '💪',
    earned: false,
    progress: 75
  },
  {
    id: 5,
    title: 'Zen Master',
    description: '30 meditation sessions completed',
    icon: '🕉️',
    earned: false,
    progress: 40
  }
];

const topTriggers = [
  { trigger: 'Academic Deadlines', frequency: 23, severity: 8 },
  { trigger: 'Social Situations', frequency: 15, severity: 6 },
  { trigger: 'Sleep Deprivation', frequency: 12, severity: 7 },
  { trigger: 'Financial Stress', frequency: 8, severity: 5 },
];

interface ProgressAnalyticsProps {
  user?: {
    name: string;
    firstName?: string;
    email: string;
  };
}

export function ProgressAnalytics({ user }: ProgressAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  
  const firstName = user?.firstName || user?.name?.split(' ')[0] || 'there';

  const generateReport = () => {
    alert('Generating comprehensive wellness report... 📊');
  };

  return (
    <div className="min-h-screen zen-gradient relative">
      <div className="p-4 pb-20 pt-16">
        <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h1 className="text-3xl bg-gradient-to-r from-[#a48bff] to-[#70e1c9] bg-clip-text text-transparent">
              Progress & Analytics
            </h1>
          </div>
          <p className="text-muted-foreground">
            {user ? `Hi ${firstName}! Track your wellness journey with detailed insights` : 'Track your wellness journey with detailed insights'}
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2"
        >
          {['week', 'month', 'year'].map((range) => (
            <Button
              key={range}
              onClick={() => setTimeRange(range)}
              variant={timeRange === range ? 'default' : 'outline'}
              className={`${timeRange === range
                ? 'text-white bg-gradient-to-r from-[#a48bff] to-[#70e1c9] shadow-[0_8px_20px_rgba(164,139,255,0.25)]'
                : 'hover:bg-white/70'} rounded-full px-5`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/50 backdrop-blur rounded-2xl p-1 shadow-[0_8px_20px_rgba(164,139,255,0.12)]">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'mood', label: 'Mood Trends' },
                { key: 'wellness', label: 'Wellness Radar' },
                { key: 'achievements', label: 'Achievements' }
              ].map((t) => (
                <TabsTrigger
                  key={t.key}
                  value={t.key}
                  className="rounded-xl transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a48bff] data-[state=active]:to-[#70e1c9] hover:bg-white/70"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="border-0 rounded-2xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                    <CardContent className="p-4 text-center relative z-10">
                      <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl mb-1">78%</div>
                      <div className="text-sm text-muted-foreground">Wellness Score</div>
                      <Badge className="mt-1 bg-green-100 text-green-800">+5%</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="border-0 rounded-2xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                    <CardContent className="p-4 text-center relative z-10">
                      <Calendar className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <div className="text-2xl mb-1">7</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                      <Badge className="mt-1 bg-blue-100 text-blue-800">Current</Badge>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="border-0 rounded-2xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                    <CardContent className="p-4 text-center relative z-10">
                      <Brain className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl mb-1">23</div>
                      <div className="text-sm text-muted-foreground">Meditations</div>
                      <Badge className="mt-1 bg-purple-100 text-purple-800">This month</Badge>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="border-0 rounded-2xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                    <CardContent className="p-4 text-center relative z-10">
                      <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                      <div className="text-2xl mb-1">4.2</div>
                      <div className="text-sm text-muted-foreground">Avg Mood</div>
                      <Badge className="mt-1 bg-pink-100 text-pink-800">Good</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Monthly Progress Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="border-0 rounded-3xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                  <CardHeader>
                    <CardTitle>Monthly Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyProgressData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Bar dataKey="checkIns" fill="#8b5cf6" radius={4} />
                          <Bar dataKey="meditations" fill="#10b981" radius={4} />
                          <Bar dataKey="journalEntries" fill="#0ea5e9" radius={4} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded"></div>
                        <span className="text-sm">Check-ins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded"></div>
                        <span className="text-sm">Meditations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded"></div>
                        <span className="text-sm">Journal Entries</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Top Triggers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="zen-card border-0">
                  <CardHeader>
                    <CardTitle>Top Stress Triggers (AI Analysis)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {topTriggers.map((trigger, index) => (
                        <div
                          key={trigger.trigger}
                          className="relative overflow-hidden rounded-2xl p-4 bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)]"
                        >
                          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                          <div className="relative z-10 flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{trigger.trigger}</h4>
                              <p className="text-sm text-muted-foreground">
                                {trigger.frequency} occurrences • Severity: {trigger.severity}/10
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">#{index + 1}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Mood Trends Tab */}
            <TabsContent value="mood" className="space-y-6">
              {/* Weekly Mood Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 rounded-3xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                  <CardHeader>
                    <CardTitle>Weekly Mood & Wellness Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyMoodData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 10]} />
                          <Line type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={3} />
                          <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} />
                          <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} />
                          <Line type="monotone" dataKey="motivation" stroke="#0ea5e9" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Mood Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 rounded-3xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                  <CardHeader>
                    <CardTitle>Mood Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={moodDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {moodDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {moodDistribution.map((mood) => (
                        <div key={mood.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mood.color }}></div>
                          <span className="text-sm">{mood.name}: {mood.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Wellness Radar Tab */}
            <TabsContent value="wellness" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 rounded-3xl bg-[rgba(255,255,255,0.4)] backdrop-blur-md shadow-[0_8px_20px_rgba(164,139,255,0.12)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(164,139,255,0.2)] relative overflow-hidden">
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Wellness Areas Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={wellnessRadarData}>
                          <PolarGrid gridType="polygon" stroke="rgba(100,116,139,0.25)" />
                          <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                            tickLine={false}
                          />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            axisLine={false}
                          />
                          <Radar
                            name="Current"
                            dataKey="current"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fill="#8b5cf6"
                            fillOpacity={0.35}
                          />
                          <Radar
                            name="Target"
                            dataKey="target"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="transparent"
                            strokeDasharray="4 4"
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {wellnessRadarData.map((area) => (
                        <div key={area.subject} className="p-4 bg-white/60 backdrop-blur rounded-2xl shadow-[0_8px_20px_rgba(164,139,255,0.08)]">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm">{area.subject}</h4>
                            <span className="text-sm text-slate-600">{area.current}%</span>
                          </div>
                          <div className="w-full bg-slate-200/60 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#7c6df6] via-[#8b5cf6] to-[#66e0c2]"
                              style={{ width: `${area.current}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {achievements.map((achievement, index) => (
                  <Card
                    key={achievement.id}
                    className={`border-0 rounded-3xl bg-[rgba(255,255,255,0.65)] backdrop-blur-md shadow-[0_8px_24px_rgba(164,139,255,0.14)] transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_16px_40px_rgba(164,139,255,0.22)] relative overflow-hidden`}
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a48bff]/10 to-[#70e1c9]/10" />
                    <CardContent className="p-5 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-60'}`}>{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{achievement.title}</h3>
                            {achievement.earned && (
                              <Badge className="bg-green-100 text-green-800">Earned</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                          {achievement.earned ? (
                            <p className="text-xs text-muted-foreground">Earned on {achievement.date}</p>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span>Progress</span>
                                <span className="text-slate-600">{achievement.progress}%</span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-[#7c6df6] via-[#8b5cf6] to-[#66e0c2] transition-all duration-300"
                                  style={{ width: `${achievement.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Generate Report Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <Button
            onClick={generateReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-medium text-white bg-[linear-gradient(135deg,#9b5cff,#4ade80)] shadow-[0_4px_12px_rgba(155,92,255,0.25),0_2px_8px_rgba(74,222,128,0.2)] transition-all duration-300 ease-out hover:brightness-110 hover:scale-[1.03] active:scale-95 active:brightness-95"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Detailed Report (PDF)
          </Button>
        </motion.div>
        </div>
      </div>
    </div>
  );
}