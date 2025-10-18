import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import { Users, MessageCircle, Calendar, FileText, Settings, Send, Heart, Share2, Pin } from "lucide-react";

const GroupDetail = () => {
  const { id } = useParams();
  const [newPost, setNewPost] = useState("");

  const group = {
    name: "Worship Leaders Network",
    description: "A community for worship leaders to share resources, techniques, and encouragement",
    members: 248,
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=300&fit=crop"
  };

  const posts = [
    { id: 1, author: "Sarah Johnson", role: "Worship Pastor", content: "Just learned a new chord progression for 'Great Are You Lord'. Anyone want to collaborate on an arrangement?", likes: 12, comments: 5, time: "2h ago", pinned: true },
    { id: 2, author: "Mike Wilson", role: "Music Director", content: "Reminder: Our virtual worship workshop is this Saturday at 3 PM. See you there!", likes: 24, comments: 8, time: "5h ago", pinned: false },
    { id: 3, author: "Grace Lee", role: "Choir Director", content: "Looking for recommendations on vocal warm-up exercises for our Sunday morning team.", likes: 8, comments: 12, time: "1d ago", pinned: false },
  ];

  const members = [
    { name: "Sarah Johnson", role: "Worship Pastor", church: "Grace Chapel" },
    { name: "Mike Wilson", role: "Music Director", church: "Faith Community" },
    { name: "Grace Lee", role: "Choir Director", church: "Bethel Church" },
    { name: "David Kim", role: "Worship Leader", church: "New Life Church" },
  ];

  const events = [
    { id: 1, title: "Virtual Worship Workshop", date: "Sat, Dec 21", time: "3:00 PM", attendees: 45 },
    { id: 2, title: "Song Writing Session", date: "Sun, Dec 29", time: "6:00 PM", attendees: 28 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/community" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">{group.name}</span>
          </Link>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${group.coverImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <main className="container -mt-12 relative z-10 pb-8">
        <Card className="shadow-card mb-6">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
            <p className="text-muted-foreground mb-4">{group.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                <Users className="w-4 h-4 inline mr-1" />
                {group.members} members
              </span>
              <Button size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Group
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="feed" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <Textarea 
                      placeholder="Share something with the group..." 
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      rows={3}
                      className="mb-3"
                    />
                    <Button className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </CardContent>
                </Card>

                {posts.map((post) => (
                  <Card key={post.id} className={`shadow-soft ${post.pinned ? 'border-l-4 border-l-primary' : ''}`}>
                    <CardContent className="pt-6">
                      {post.pinned && (
                        <div className="flex items-center gap-2 text-sm text-primary mb-3">
                          <Pin className="w-4 h-4" />
                          Pinned Post
                        </div>
                      )}
                      <div className="flex gap-3 mb-4">
                        <Avatar>
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.role} • {post.time}</p>
                        </div>
                      </div>
                      <p className="mb-4">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="chat" className="space-y-4">
                <Card className="shadow-card h-96 flex flex-col">
                  <CardContent className="pt-6 flex-1 overflow-y-auto">
                    <p className="text-center text-muted-foreground">Real-time chat messages will appear here</p>
                  </CardContent>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input placeholder="Type a message..." />
                      <Button>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                {events.map((event) => (
                  <Card key={event.id} className="shadow-soft">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{event.attendees} attending</span>
                        <Button size="sm">RSVP</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="files">
                <Card className="shadow-card">
                  <CardContent className="pt-6 text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No files shared yet</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Members ({group.members})</h3>
                <div className="space-y-3">
                  {members.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View All Members
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Group Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium">Worship Teams</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Privacy</p>
                    <p className="font-medium">Public</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium">Jan 15, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupDetail;
