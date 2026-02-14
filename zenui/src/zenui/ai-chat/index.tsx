import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '../../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { ChatInput } from '../ui/ChatInput';
import { ChatMessage, ChatMessageData } from '../ui/ChatMessage';

import zenbotAvatar from '../assets/ChatGPT Image Nov 19, 2025, 11_10_55 PM.png';

interface AIChatbotProps {
  onBack: () => void;
}

const resolveApiBase = () => {
  const configured = import.meta.env?.VITE_AI_API_URL;

  // If VITE_AI_API_URL is explicitly set, use it (for production)
  if (typeof configured === 'string') {
    const trimmed = configured.trim();
    if (trimmed) {
      return `${trimmed.replace(/\/$/, '')}/api`;
    }
  }

  // In local dev, use relative path so Vite proxy handles it
  // For production without env var, also use relative path (assumes same origin)
  return '/api';
};

const API_BASE = resolveApiBase();
const CHAT_ENDPOINT = `${API_BASE}/chat/send`;
const HISTORY_ENDPOINT = `${API_BASE}/chat/history`;

const quickReplies = [
  "I'm feeling anxious",
  "Help me relax",
  "I need motivation",
  "How to sleep better?",
  "Dealing with stress",
  "I feel overwhelmed"
];

export function AIChatbot({ onBack }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const requestControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const authHeaders = () => {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    isMountedRef.current = true; // Ensure it's set to true on mount
    return () => {
      isMountedRef.current = false;
      requestControllerRef.current?.abort();
    };
  }, []);

  const fetchAiResponse = async (text: string) => {
    requestControllerRef.current?.abort();
    const controller = new AbortController();
    requestControllerRef.current = controller;

    console.log('🤖 Sending message to:', CHAT_ENDPOINT);
    console.log('📤 Message:', text);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders()
        },
        body: JSON.stringify({ message: text }),
        signal: controller.signal
      });

      console.log('📥 Response status:', response.status, response.statusText);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      let data: { reply?: string; error?: string } = {};
      let responseText = '';
      try {
        responseText = await response.text();
        console.log('📦 Raw response text:', responseText);
        data = JSON.parse(responseText);
        console.log('📦 Parsed response data:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response. Raw text:', responseText);
        console.error('❌ Parse error:', parseError);
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}`);
      }

      if (!response.ok) {
        const message = data.error || `Server error: ${response.status} ${response.statusText}`;
        console.error('❌ Server error:', message);
        throw new Error(message);
      }

      if (!data.reply) {
        console.error('❌ No reply in response. Full data:', JSON.stringify(data, null, 2));
        throw new Error('AI server did not include a reply.');
      }

      console.log('✅ Got reply:', data.reply.substring(0, 50) + '...');
      console.log('✅ Full reply length:', data.reply.length);
      setBackendConnected(true);
      return data.reply;
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') {
        console.log('⚠️ Request aborted');
        throw err;
      }
      if (err instanceof TypeError && err.message.includes('fetch')) {
        console.error('❌ Network error - is the backend running?', err);
        setBackendConnected(false);
        throw new Error('Cannot connect to AI server. Make sure the Flask backend is running on port 5000.');
      }
      setBackendConnected(false);
      throw err;
    }
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessageData = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setError(null);
    setIsTyping(true);

    try {
      console.log('🔄 Calling fetchAiResponse...');
      const response = await fetchAiResponse(trimmed);
      console.log('✅ fetchAiResponse returned:', response?.substring(0, 50));

      // Always update state if we got a valid response
      // The component might re-render but React will handle cleanup
      console.log('🔍 Component mounted status:', isMountedRef.current);

      if (!response || typeof response !== 'string') {
        console.error('❌ Invalid response from fetchAiResponse:', response);
        throw new Error('Invalid response format from AI server');
      }

      const aiMessage: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };

      console.log('📝 Adding AI message to state:', aiMessage);
      setMessages((prev) => {
        const updated = [...prev, aiMessage];
        console.log('📝 Updated messages array length:', updated.length);
        return updated;
      });
      console.log('✅ Message added to state');
    } catch (err) {
      // Only skip if it's an abort error (user cancelled)
      if ((err as DOMException)?.name === 'AbortError') {
        console.log('⚠️ Request was aborted');
        return;
      }
      
      // For other errors, still show error message even if component re-rendered

      console.error('❌ AI chatbot error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      const fallbackMessage: ChatMessageData = {
        id: (Date.now() + 2).toString(),
        text: "I'm having trouble connecting to my AI brain right now. Please double-check that the Flask backend is running (python app.py in the bo/ folder) and try again.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, fallbackMessage]);
      setError(`Unable to reach AI server: ${errorMessage}. Please try again.`);
    } finally {
      if (isMountedRef.current) {
        setIsTyping(false);
      }
    }
  };

  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await fetch(HISTORY_ENDPOINT, {
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders()
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessages([
            {
              id: 'welcome',
              text: "Hello! I'm ZenBot, your AI wellness companion. I'm here to listen and support you. How are you feeling today?",
              sender: 'ai',
              timestamp: new Date()
            }
          ]);
          return;
        }
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to load chat history');
      }

      const history: { id: string; message: string; reply: string }[] = await response.json();
      if (!history.length) {
        setMessages([
          {
            id: 'welcome',
            text: "Hello! I'm ZenBot, your AI wellness companion. I'm here to listen and support you. How are you feeling today?",
            sender: 'ai',
            timestamp: new Date()
          }
        ]);
        return;
      }

      const hydrated: ChatMessageData[] = [];
      history.forEach((chat) => {
        hydrated.push({
          id: `${chat.id}-user`,
          text: chat.message,
          sender: 'user',
          timestamp: new Date()
        });
        hydrated.push({
          id: `${chat.id}-ai`,
          text: chat.reply,
          sender: 'ai',
          timestamp: new Date()
        });
      });

      setMessages(hydrated);
    } catch (err) {
      console.error('Failed to load chat history', err);
      setMessages([
        {
          id: 'welcome',
          text: "Hello! I'm ZenBot, your AI wellness companion. I'm here to listen and support you. How are you feeling today?",
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  const handleQuickReply = (reply: string) => {
    if (isTyping) return;
    void sendMessage(reply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 relative z-[70]">
      <div className="flex flex-col h-screen pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-white/70 shadow-lg">
                <AvatarImage src={zenbotAvatar} alt="ZenBot" />
                <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm">
                  ZB
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                  ZenBot • AI Assistant
                </h1>
                <div className="flex items-center gap-1 text-sm">
                  {backendConnected === true ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400">Online</span>
                    </>
                  ) : backendConnected === false ? (
                    <>
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span className="text-red-400">Backend Offline</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-yellow-400">Checking...</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/70 backdrop-blur text-slate-200 border-slate-700 hover:bg-slate-700/70 text-sm"
              onClick={onBack}
            >
              Back to tools
            </Button>
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
          {isLoadingHistory && (
            <p className="text-center text-sm text-slate-300">Loading your previous chats...</p>
          )}
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <Avatar className="w-8 h-8 border border-white/70 bg-white/80">
                <AvatarImage src={zenbotAvatar} alt="ZenBot typing" />
                <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                  ZB
                </AvatarFallback>
              </Avatar>
              <div className="bg-slate-800/80 backdrop-blur border border-slate-700/50 px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 space-y-4 bg-slate-900/80 backdrop-blur border-t border-purple-500/20">
          {messages.length <= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="text-sm text-slate-300 text-center">Quick responses:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    variant="outline"
                    size="sm"
                    disabled={isTyping}
                    className="text-xs rounded-full bg-slate-800/50 text-slate-200 border-slate-700 hover:bg-purple-600/20 hover:border-purple-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {error && (
            <p className="text-center text-sm text-rose-300 bg-rose-950/40 border border-rose-700/40 rounded-full px-4 py-2">
              {error}
            </p>
          )}

          <ChatInput
            value={inputMessage}
            onChange={setInputMessage}
            onSend={sendMessage}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  );
}


