import { FormEvent } from 'react';
import { Send } from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (value: string) => void | Promise<void>;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue || disabled) return;
    await onSend(trimmedValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-full bg-slate-800/90 border border-slate-700/50 px-4 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
    >
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your message..."
        className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-slate-100 placeholder:text-slate-400"
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!value.trim() || !!disabled}
        className="h-11 w-11 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:from-purple-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4 -mr-0.5" />
      </Button>
    </form>
  );
}


