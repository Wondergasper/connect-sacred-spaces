import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Phone, 
  Video, 
  PhoneMissed, 
  PhoneIncoming, 
  PhoneOutgoing,
  Users,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Mic
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Chat = () => {
  const { state } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "You",
      text: "Hi there! How are you doing today?",
      time: "10:30 AM",
      sent: true
    },
    {
      id: 2,
      sender: "Pastor James",
      text: "Hello! I'm doing well, thank you for asking. How can I help you?",
      time: "10:31 AM",
      sent: false
    },
    {
      id: 3,
      sender: "You",
      text: "I wanted to ask about the Sunday service schedule.",
      time: "10:32 AM",
      sent: true
    },
    {
      id: 4,
      sender: "Pastor James",
      text: "Sure! We have services at 8 AM, 10 AM, and 6 PM. Which one were you thinking about?",
      time: "10:33 AM",
      sent: false
    }
  ]);
  
  const [activeChat, setActiveChat] = useState("Pastor James");
  const [onlineUsers] = useState([
    { id: 1, name: "Pastor James", status: "online", lastSeen: "just now" },
    { id: 2, name: "Sister Mary", status: "online", lastSeen: "2 min ago" },
    { id: 3, name: "Brother Michael", status: "away", lastSeen: "15 min ago" },
    { id: 4, name: "Deacon Williams", status: "offline", lastSeen: "2 hours ago" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Chat</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Online Users */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Online Users</span>
                  <Badge variant="secondary">{onlineUsers.filter(u => u.status === "online").length} online</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {onlineUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      activeChat === user.name ? "bg-primary/10" : ""
                    }`}
                    onClick={() => setActiveChat(user.name)}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      user.status === "online" ? "bg-green-500" : 
                      user.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.lastSeen}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Recent Chats */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle>Recent Chats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: 1, name: "Prayer Group", participants: 12, lastMessage: "Pastor James: Let's pray together...", time: "10:15 AM" },
                  { id: 2, name: "Youth Team", participants: 8, lastMessage: "Sister Sarah: Meeting at 7 PM", time: "Yesterday" },
                  { id: 3, name: "Worship Team", participants: 6, lastMessage: "Brother Mike: New song suggestions", time: "2 days ago" },
                ].map((chat) => (
                  <div key={chat.id} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{chat.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{chat.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="shadow-card flex-1 flex flex-col">
              <CardHeader className="flex-row items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{activeChat}</h3>
                    <p className="text-xs text-muted-foreground">Online now</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto max-h-[50vh]">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                            msg.sent 
                              ? "bg-primary text-primary-foreground rounded-br-md" 
                              : "bg-muted text-foreground rounded-bl-md"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.sent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-end gap-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Smile className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="resize-none"
                      />
                    </div>
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Calls */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PhoneIncoming className="w-5 h-5 text-primary" />
                  Active Calls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 1, name: "Emergency Prayer Line", type: "incoming", time: "5 min ago" },
                    { id: 2, name: "Brother Thomas", type: "outgoing", time: "Yesterday" },
                    { id: 3, name: "Pastor's Office", type: "missed", time: "2 days ago" },
                  ].map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          call.type === "incoming" ? "bg-green-500/20" : 
                          call.type === "outgoing" ? "bg-blue-500/20" : "bg-red-500/20"
                        }`}>
                          {call.type === "incoming" && <PhoneIncoming className="w-5 h-5 text-green-500" />}
                          {call.type === "outgoing" && <PhoneOutgoing className="w-5 h-5 text-blue-500" />}
                          {call.type === "missed" && <PhoneMissed className="w-5 h-5 text-red-500" />}
                        </div>
                        <div>
                          <p className="font-medium">{call.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{call.type} - {call.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Call Back</Button>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;