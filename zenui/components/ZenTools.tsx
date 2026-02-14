import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageCircle, Brain, BookOpen, Shuffle } from 'lucide-react';
import { AIChatbot } from './zen-tools/AIChatbot';
import { MeditationGuide } from './zen-tools/MeditationGuide';
import { JournalingTool } from './zen-tools/JournalingTool';
import { RandomDare } from './zen-tools/RandomDare';

interface ZenToolsProps {
  onBack: () => void;
}

type ToolScreen = 'hub' | 'chatbot' | 'meditation' | 'journal' | 'dare';

const tools = [
  {
    id: 'chatbot',
    title: 'AI Chatbot Assistance',
    description: 'Chat with our friendly AI companion for instant support',
    icon: MessageCircle,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100'
  },
  {
    id: 'meditation',
    title: 'Meditation Guide',
    description: 'Guided sessions with breathing visuals and timers',
    icon: Brain,
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100'
  },
  {
    id: 'journal',
    title: 'Journaling',
    description: 'Express your thoughts with mood tracking and prompts',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100'
  },
  {
    id: 'dare',
    title: 'Random Dare!',
    description: 'Fun wellness challenges to brighten your day',
    icon: Shuffle,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'from-pink-50 to-pink-100'
  }
];

export function ZenTools({ onBack }: ZenToolsProps) {
  const [currentTool, setCurrentTool] = useState<ToolScreen>('hub');

  const handleToolSelect = (toolId: string) => {
    setCurrentTool(toolId as ToolScreen);
  };

  const handleBackToHub = () => {
    setCurrentTool('hub');
  };

  if (currentTool === 'chatbot') {
    return <AIChatbot onBack={handleBackToHub} />;
  }

  if (currentTool === 'meditation') {
    return <MeditationGuide onBack={handleBackToHub} />;
  }

  if (currentTool === 'journal') {
    return <JournalingTool onBack={handleBackToHub} />;
  }

  if (currentTool === 'dare') {
    return <RandomDare onBack={handleBackToHub} />;
  }

  return (
    <div className="min-h-screen zen-gradient relative">
      <div className="p-6 pb-24 pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/app-logo.png" 
                  alt="Zen Space" 
                  className="w-8 h-8 object-contain transform scale-[2]"
                />
              </div>
              <h1 
                className="text-4xl font-bold tracking-wide"
                style={{
                  background: 'linear-gradient(90deg, #9b5de5, #00f5a0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                ZEN TOOLS
              </h1>
            </div>
            <p className="text-gray-600 text-base">Interactive wellness tools to support your journey</p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.15 }}
                whileHover={{ 
                  y: -6,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="bg-white border-0 rounded-[20px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 ease-out h-full group"
                  onClick={() => handleToolSelect(tool.id)}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                    {/* Icon with enhanced styling */}
                    <motion.div 
                      className="relative mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <tool.icon className="w-10 h-10 text-white" />
                      </div>
                      {/* Subtle glow effect on hover */}
                      <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 mx-auto`}></div>
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                      {tool.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                      {tool.description}
                    </p>
                    
                    {/* Action text */}
                    <div className="text-center">
                      <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors duration-200">
                        Tap to explore →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Featured Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/95 backdrop-blur-sm border-0 rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(167,139,250,0.15)] transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-green-500 mx-auto mb-6 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-2xl">✨</span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Wellness Tip</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Try combining different tools! Start with meditation, then journal your experience, 
                    and finish with a fun dare challenge.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}