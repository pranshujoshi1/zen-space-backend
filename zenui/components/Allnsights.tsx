import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Sparkles, RefreshCw, TrendingUp, AlertCircle, Heart, Brain } from 'lucide-react';

interface AIInsightsProps {
  user: { name: string; email: string };
}

const insights = [
  {
    id: 1,
    type: 'recommendation',
    icon: Heart,
    title: 'Take a 10-minute walk today',
    description: 'Based on your stress levels, a short walk can help reduce cortisol and improve your mood.',
    category: 'Physical Wellness',
    priority: 'high',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 2,
    type: 'insight',
    icon: Brain,
    title: 'Focus on gratitude journaling',
    description: 'Your mood improves by 23% on days when you practice gratitude. Try writing 3 things you\'re grateful for.',
    category: 'Mental Wellness',
    priority: 'medium',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 3,
    type: 'alert',
    icon: AlertCircle,
    title: 'Sleep pattern needs attention',
    description: 'Your sleep duration has decreased by 15% this week. Consider a consistent bedtime routine.',
    category: 'Sleep Health',
    priority: 'high',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    type: 'celebration',
    icon: Sparkles,
    title: 'Great progress this week!',
    description: 'You\'ve maintained consistent check-ins and your wellness score has improved by 12%.',
    category: 'Achievement',
    priority: 'low',
    color: 'from-yellow-500 to-yellow-600'
  }
];

const wellnessMetrics = [
  { label: 'Emotional Balance', value: 78, trend: '+5%' },
  { label: 'Stress Management', value: 65, trend: '-3%' },
  { label: 'Social Connection', value: 92, trend: '+12%' },
  { label: 'Physical Activity', value: 58, trend: '+8%' }
];

export function AIInsights({ user }: AIInsightsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentInsights, setCurrentInsights] = useState(insights);

  const generateNewTip = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      // Simulate generating new insights
      const newInsight = {
        id: Date.now(),
        type: 'recommendation',
        icon: Brain,
        title: 'Try deep breathing exercises',
        description: 'Your heart rate variability suggests you could benefit from 5 minutes of box breathing.',
        category: 'Mindfulness',
        priority: 'medium',
        color: 'from-indigo-500 to-indigo-600'
      };
      
      setCurrentInsights([newInsight, ...currentInsights.slice(0, 3)]);
      setIsGenerating(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Insights
            </h1>
          </div>
          <p className="text-muted-foreground">Personalized wellness recommendations just for you</p>
        </motion.div>

        {/* Generate New Tip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <Button
            onClick={generateNewTip}
            disabled={isGenerating}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate New Insight
              </>
            )}
          </Button>
        </motion.div>

        {/* Wellness Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="zen-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Wellness Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {wellnessMetrics.map((metric, index) => (
                <div key={metric.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{metric.value}%</span>
                      <Badge variant="outline" className="text-xs">
                        {metric.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Cards */}
        <div className="space-y-4">
          {currentInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="zen-card border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${insight.color} flex items-center justify-center flex-shrink-0`}>
                      <insight.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="zen-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Weekly Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This week, you've shown consistent engagement with your wellness journey. Your mood stability has improved, 
                and you're building healthy habits. Focus areas for next week include improving sleep consistency and 
                incorporating more physical activity.
              </p>
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
}