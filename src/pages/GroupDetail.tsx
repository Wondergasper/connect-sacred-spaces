import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AvatarGroup } from "@/components/AvatarGroup";
import Chat from "@/components/Chat";
import { Users, Calendar, MessageCircle, Heart, Share2, MoreVertical, Hash, Globe, Lock, UserPlus, UserCheck, UserX, HandHeart, MessageSquare } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { groupService } from "@/services/groupService";
import { eventService } from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";

interface Group {
  _id: string;
  name: string;
  description: string;
  category: string;
  privacy: 'public' | 'private' | 'secret';
  members: string[]; // Array of user IDs
  admins: string[]; // Array of user IDs
  icon?: string;
  tags?: string[];
  createdAt: string;
}

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'member';
  avatar?: string;
}

interface Post {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  content: string;
  likes: number;
  comments: number;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const GroupDetail = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [isJoined, setIsJoined] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { state } = useAuth();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        if (id) {
          const groupData = await groupService.getGroup(id);
          setGroup(groupData);
          setIsJoined(groupData.members.some((memberId: string) => memberId === state.user?._id));
          
          // In a real implementation, we would also fetch members, posts, and events
          // For now, using mock data for demo purposes
          setMembers(
            groupData.members.map((memberId: string, index: number) => ({
              _id: memberId,
              firstName: `Member ${index + 1}`,
              lastName: `LastName ${index + 1}`,
              role: groupData.admins.includes(memberId) ? 'admin' : 'member',
            }))
          );
          
          // Mock posts, events, and messages for demo
          setPosts([
            {
              _id: "1",
              author: { _id: "1", firstName: "Sarah", lastName: "Johnson" },
              createdAt: "2 hours ago",
              content: "New worship resource: I've been using this chord progression app and it's been a game changer for our team. Check it out!",
              likes: 24,
              comments: 8,
            },
            {
              _id: "2",
              author: { _id: "2", firstName: "James", lastName: "Brown" },
              createdAt: "5 hours ago",
              content: "Praying for our worship teams as we prepare for the Christmas service. May the Lord guide our hearts and voices.",
              likes: 42,
              comments: 15,
            },
          ]);
          
          setEvents([
            {
              _id: "1",
              title: "Monthly Worship Planning Meeting",
              date: "Dec 20, 2024",
              time: "7:00 PM",
              location: "Online",
            },
            {
              _id: "2",
              title: "Worship Night",
              date: "Dec 25, 2024",
              time: "7:00 PM",
              location: "Main Sanctuary",
            },
          ]);
          
          setMessages([
            {
              id: "1",
              sender: "Sarah Johnson",
              content: "Hi everyone! Let's discuss the songs for Sunday's service.",
              timestamp: "10:30 AM",
              isOwn: false
            },
            {
              id: "2",
              sender: "You",
              content: "I was thinking we could start with 'Goodness of God'",
              timestamp: "10:32 AM",
              isOwn: true
            },
            {
              id: "3",
              sender: "Michael Davis",
              content: "Great choice! That always brings the congregation together.",
              timestamp: "10:33 AM",
              isOwn: false
            }
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load group details:", error);
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id, state.user?._id]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: "You",
      senderAvatar: "JD",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/community" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Community</span>
          </Link>
          <div className="flex gap-2">
            {isJoined ? (
              <Button>
                <UserCheck className="w-4 h-4 mr-2" />
                Joined
              </Button>
            ) : (
              <Button onClick={() => setIsJoined(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Join Group
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Group Header */}
        <Card className="shadow-card mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl">
                  {group.icon}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{group.name}</h1>
                  <Badge variant={group.privacy === "private" ? "secondary" : "default"}>
                    {group.privacy}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{group.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span>{group.posts} posts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span>Live chat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Est. {group.established}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Group Admins:</span>
                    <div className="flex -space-x-2">
                      {group.admins.slice(0, 3).map((admin, index) => (
                        <div key={index} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium">
                          {admin.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Members you know:</span>
                    <span className="font-medium">{group.membersYouKnow}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "feed"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("feed")}
          >
            Feed
          </button>
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "chat"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "members"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "events"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "files"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("files")}
          >
            Files
          </button>
        </div>

        {activeTab === "feed" && (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="shadow-soft hover:shadow-card transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Admin</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{post.content}</p>
                  <div className="flex items-center gap-6 pt-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <HandHeart className="w-4 h-4" />
                      Pray
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "chat" && (
          <div className="h-[500px]">
            <Chat 
              groupName={group.name} 
              members={group.members} 
              messages={messages} 
              onSendMessage={handleSendMessage} 
            />
          </div>
        )}

        {activeTab === "members" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Group Members ({group.members})</h3>
              <Button variant="outline" size="sm">
                Invite Members
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member, index) => (
                <Card key={index} className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">{member.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
            
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      {event.title}
                    </CardTitle>
                    <CardDescription>
                      {event.date} at {event.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{event.location}</span>
                      <Button size="sm">View Event</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Shared Files</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, name: "Worship Guide.docx", type: "document", size: "1.2 MB" },
                { id: 2, name: "Chord Charts.pdf", type: "document", size: "850 KB" },
                { id: 3, name: "Weekly Schedule.xlsx", type: "spreadsheet", size: "420 KB" }
              ].map((file) => (
                <Card key={file.id} className="shadow-soft">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Hash className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="gap-2">
                <Hash className="w-4 h-4" />
                Upload File
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GroupDetail;