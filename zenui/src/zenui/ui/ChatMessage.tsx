import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';

import zenbotAvatar from '../assets/ChatGPT Image Nov 19, 2025, 11_10_55 PM.png';

export interface ChatMessageData {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  const timestamp = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mr-3 flex-shrink-0">
          <Avatar className="w-11 h-11 border border-white/60 shadow-[0_10px_30px_rgba(79,70,229,0.25)] bg-white">
            <AvatarImage src={zenbotAvatar} alt="ZenBot" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs font-semibold tracking-wide">
              Zen
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className={`max-w-[82%] flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <span className="text-xs font-medium text-slate-300">ZenBot</span>
        )}
        <div
          className={`p-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white ml-6 mr-1 shadow-[0_12px_30px_rgba(147,51,234,0.4)]'
              : 'bg-slate-800/90 text-slate-100 mr-4 shadow-[0_15px_35px_rgba(0,0,0,0.3)] border border-slate-700/50'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
          <p className={`text-[11px] mt-1 ${isUser ? 'text-white/70' : 'text-slate-400'}`}>
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}


