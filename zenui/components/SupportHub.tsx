import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { MessageCircle, Users, Heart, Plus, Send, Clock, User } from 'lucide-react';

const peerTopics = [
  {
    id: 1,
    title: 'Dealing with exam stress',
    author: 'Anonymous Student',
    replies: 12,
    lastActivity: '2 hours ago',
    category: 'Academic Stress',
    isActive: true
  },
  {
    id: 2,
    title: 'Finding motivation for morning routines',
    author: 'MindfulMornings',
    replies: 8,
    lastActivity: '4 hours ago',
    category: 'Lifestyle',
    isActive: false
  },
  {
    id: 3,
    title: 'Social anxiety in group projects',
    author: 'QuietLearner',
    replies: 15,
    lastActivity: '6 hours ago',
    category: 'Social Support',
    isActive: true
  },
  {
    id: 4,
    title: 'Gratitude practice ideas',
    author: 'ThankfulThoughts',
    replies: 5,
    lastActivity: '1 day ago',
    category: 'Mindfulness',
    isActive: false
  }
];

const counselorChats = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    specialization: 'Anxiety & Stress Management',
    isOnline: true,
    lastMessage: 'How have you been feeling since our last chat?',
    time: '10:30 AM'
  },
  {
    id: 2,
    name: 'Dr. Michael Rodriguez',
    specialization: 'Academic Counseling',
    isOnline: false,
    lastMessage: 'Remember to practice the breathing techniques we discussed',
    time: 'Yesterday'
  }
];

const sampleMessages = [
  {
    id: 1,
    sender: 'Dr. Sarah Chen',
    message: 'Hello! How are you feeling today? I noticed you completed your daily check-in.',
    time: '10:30 AM',
    isUser: false
  },
  {
    id: 2,
    sender: 'You',
    message: 'Hi Dr. Chen, I\'m feeling a bit overwhelmed with my upcoming exams.',
    time: '10:32 AM',
    isUser: true
  },
  {
    id: 3,
    sender: 'Dr. Sarah Chen',
    message: 'That\'s completely understandable. Let\'s work through some stress management techniques that can help you feel more prepared and confident.',
    time: '10:35 AM',
    isUser: false
  }
];

export function SupportHub() {
  const [activeTab, setActiveTab] = useState('peer');
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Academic Stress': 'bg-red-100 text-red-800',
      'Lifestyle': 'bg-blue-100 text-blue-800',
      'Social Support': 'bg-green-100 text-green-800',
      'Mindfulness': 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Simulate sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
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
          className="text-center py-8 mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
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
              Support Hub
            </h1>
          </div>
          <p className="text-gray-600 text-base">Connect with peers and professional counselors</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
              <TabsTrigger 
                value="peer" 
                className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <Users className="w-4 h-4" />
                Peer Groups
              </TabsTrigger>
              <TabsTrigger 
                value="counselor" 
                className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <User className="w-4 h-4" />
                Counselor Chat
              </TabsTrigger>
            </TabsList>

            {/* Peer Groups Tab */}
            <TabsContent value="peer" className="space-y-6">
              {/* New Topic Button */}
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Start New Topic
                  </Button>
                </motion.div>
              </div>

              {/* Topics List */}
              {peerTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="bg-white border-0 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-purple-600 transition-colors duration-200">{topic.title}</h3>
                            {topic.isActive && (
                              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                            <span className="font-medium">by {topic.author}</span>
                            <span className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {topic.lastActivity}
                            </span>
                          </div>
                          <Badge className={`${getCategoryColor(topic.category)} rounded-full px-3 py-1 text-xs font-medium`}>
                            {topic.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Counselor Chat Tab */}
            <TabsContent value="counselor" className="space-y-6">
              {selectedChat === null ? (
                // Counselor List
                <>
                  {counselorChats.map((counselor, index) => (
                    <motion.div
                      key={counselor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card 
                        className="bg-white border-0 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer group"
                        onClick={() => setSelectedChat(counselor.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Avatar className="w-14 h-14">
                                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-green-500 text-white font-bold">
                                  {counselor.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {counselor.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-slate-800 text-lg group-hover:text-purple-600 transition-colors duration-200">{counselor.name}</h3>
                                <span className="text-sm text-gray-500">{counselor.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2 font-medium">{counselor.specialization}</p>
                              <p className="text-sm text-slate-700 truncate">{counselor.lastMessage}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </>
              ) : (
                // Chat Interface
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {/* Chat Header */}
                  <Card className="zen-card border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                              SC
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">Dr. Sarah Chen</h3>
                            <p className="text-sm text-green-600">Online</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedChat(null)}
                        >
                          Back
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Messages */}
                  <Card className="zen-card border-0">
                    <CardContent className="p-4 space-y-4 max-h-96 overflow-y-auto">
                      {sampleMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-2xl ${
                              message.isUser
                                ? 'bg-gradient-to-r from-primary to-secondary text-white ml-4'
                                : 'bg-muted mr-4'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${message.isUser ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Message Input */}
                  <Card className="zen-card border-0">
                    <CardContent className="p-4">
                      <div className="flex gap-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="resize-none min-h-[40px]"
                          rows={1}
                        />
                        <Button
                          onClick={sendMessage}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Support Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="zen-card border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Need immediate help?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you're experiencing a mental health crisis, please reach out to these resources immediately:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>📞 Crisis Hotline: 988 (US)</div>
                    <div>💬 Crisis Text Line: Text HOME to 741741</div>
                    <div>🏥 Campus Counseling: Available 24/7</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
}