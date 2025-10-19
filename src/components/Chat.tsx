import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Send, Smile, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

interface ChatProps {
  groupName?: string;
  members?: number;
  isGroup?: boolean;
  onSendMessage: (message: string) => void;
  messages: Message[];
}

const Chat = ({ groupName = "Worship Team", members = 12, isGroup = true, onSendMessage, messages = [] }: ChatProps) => {
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
      // Focus back on input after sending
      inputRef.current?.focus();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="flex flex-col h-full bg-card rounded-lg border shadow-soft" 
      role="region" 
      aria-label={`Chat with ${groupName}`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b" role="banner">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center" 
            aria-hidden="true"
          >
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold" id="chat-title">{groupName}</h3>
            <p className="text-xs text-muted-foreground" aria-label={`Number of members: ${members}`}>
              {members} members
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2" role="toolbar" aria-label="Chat actions">
          <Button 
            size="sm" 
            variant="ghost" 
            aria-label="Start audio call"
            title="Start audio call"
          >
            <Phone className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            aria-label="Start video call"
            title="Start video call"
          >
            <Video className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            aria-label="More options"
            title="More options"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea 
        className="flex-1 p-4" 
        ref={scrollAreaRef}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              role="listitem"
            >
              <div className={`flex items-end gap-2 max-w-xs ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                {!message.isOwn && (
                  <Avatar className="w-8 h-8" aria-label={`${message.sender} avatar`}>
                    <AvatarFallback className="bg-primary/10 text-primary" aria-label={message.senderAvatar}>
                      {message.senderAvatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`p-3 rounded-2xl ${
                  message.isOwn 
                    ? 'bg-primary text-primary-foreground rounded-br-md' 
                    : 'bg-muted rounded-bl-md'
                }`}>
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t" role="form" aria-label="Message composer">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Button 
            type="button" 
            size="sm" 
            variant="ghost" 
            className="p-2"
            aria-label="Attach file"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button 
            type="button" 
            size="sm" 
            variant="ghost" 
            className="p-2"
            aria-label="Insert emoji"
            title="Insert emoji"
          >
            <Smile className="w-4 h-4" />
          </Button>
          <Input
            ref={inputRef}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            aria-label="Type your message"
            aria-required="false"
          />
          <Button 
            type="submit" 
            size="sm" 
            className="p-2"
            aria-label="Send message"
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;