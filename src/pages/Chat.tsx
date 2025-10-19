import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Send, Phone, Video, MoreVertical, Smile, Image, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "You", content: "Hello everyone! How's the preparation for Sunday service going?", time: "10:30 AM", isOwn: true },
    { id: 2, sender: "Pastor Michael", content: "Going well! We're finalizing the worship setlist. Thanks for asking.", time: "10:32 AM", isOwn: false },
    { id: 3, sender: "Sarah Johnson", content: "The new projection system is working great. Really excited about the tech upgrades.", time: "10:35 AM", isOwn: false },
    { id: 4, sender: "You", content: "That's wonderful to hear! Can't wait to see it in action.", time: "10:36 AM", isOwn: true },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/community" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Chat</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container flex flex-col h-[calc(100vh-4rem)]">
        {/* Chat Header */}
        <div className="py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Worship Team</h2>
              <p className="text-sm text-muted-foreground">24 members online</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                  message.isOwn 
                    ? 'bg-primary text-primary-foreground rounded-br-md' 
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}
              >
                {!message.isOwn && (
                  <p className="text-xs font-semibold mb-1">{message.sender}</p>
                )}
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="py-4 border-t">
          <div className="flex items-end gap-2">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-12 py-6"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setNewMessage(prev => prev + "😊")}
              >
                <Smile className="w-5 h-5" />
              </Button>
            </div>
            
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;