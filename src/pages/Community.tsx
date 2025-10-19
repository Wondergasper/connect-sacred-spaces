import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, MessageCircle, Heart, Share2, MoreVertical, HandHeart, UserPlus, UserCheck, Bell, Activity, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [notifications, setNotifications] = useState(3); // Simulated notifications count
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  // Mock data for different sections
  const groups = [
    { id: 1, name: "Worship Team", members: 156, posts: 12, image: "🎵", category: "Music", privacy: "public", membersYouKnow: 3, newPosts: 2 },
    { id: 2, name: "Bible Study Circle", members: 89, posts: 5, image: "📖", category: "Study", privacy: "private", membersYouKnow: 1, newPosts: 0 },
    { id: 3, name: "Youth Fellowship", members: 234, posts: 24, image: "🙌", category: "Youth", privacy: "public", membersYouKnow: 7, newPosts: 5 },
    { id: 4, name: "Prayer Warriors", members: 412, posts: 18, image: "🙏", category: "Prayer", privacy: "public", membersYouKnow: 12, newPosts: 1 },
    { id: 5, name: "Tech in Church", members: 78, posts: 8, image: "💻", category: "Technology", privacy: "public", membersYouKnow: 2, newPosts: 3 },
    { id: 6, name: "Choir Network", members: 95, posts: 15, image: "🎤", category: "Music", privacy: "private", membersYouKnow: 4, newPosts: 0 },
  ];

  const globalPosts = [
    {
      id: 1,
      author: "Sarah Johnson",
      time: "2 hours ago",
      content: "Blessed to share that our youth outreach touched 50+ lives this weekend! God is faithful. 🙏",
      likes: 45,
      comments: 12,
      group: "Youth Fellowship",
      church: "Grace Community",
      liked: false,
      prayed: false
    },
    {
      id: 2,
      author: "Pastor Michael",
      time: "5 hours ago",
      content: "Prayer request: Please keep our missions team in your prayers as they travel to serve communities in need.",
      likes: 89,
      comments: 23,
      group: "Prayer Warriors",
      church: "Victory Church",
      liked: true,
      prayed: true
    },
    {
      id: 3,
      author: "David Williams",
      time: "1 day ago",
      content: "Just finished reading 'Mere Christianity' by C.S. Lewis. What a profound book! Highly recommend it to anyone looking to deepen their faith.",
      likes: 67,
      comments: 18,
      group: "Book Study",
      church: "Harvest Chapel",
      liked: false,
      prayed: false
    },
    {
      id: 4,
      author: "Maria Garcia",
      time: "1 day ago",
      content: "Our church food pantry served 200+ families this month. God's provision is amazing!",
      likes: 120,
      comments: 34,
      group: "Outreach",
      church: "City Light Fellowship",
      liked: true,
      prayed: true
    },
  ];

  const people = [
    { id: 1, name: "James Wilson", role: "Worship Leader", church: "Grace Community", mutual: 3, connected: true },
    { id: 2, name: "Maria Garcia", role: "Sunday School Teacher", church: "Victory Church", mutual: 1, connected: true },
    { id: 3, name: "Thomas Chen", role: "IT Department", church: "City Light", mutual: 5, connected: false },
    { id: 4, name: "Patricia Brown", role: "Deacon", church: "Grace Community", mutual: 2, connected: false },
    { id: 5, name: "Ahmed Hassan", role: "Community Outreach", church: "Faith Center", mutual: 4, connected: true },
    { id: 6, name: "Olivia Smith", role: "Youth Leader", church: "New Hope", mutual: 3, connected: false },
  ];

  const handleLikePost = (postId: string) => {
    // Update the specific post in the state to toggle the liked status
    // This is a simplified example - in a real app, you would make an API call
  };

  const handlePrayPost = (postId: string) => {
    // Update the specific post in the state to toggle the prayed status
    // This is a simplified example - in a real app, you would make an API call
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      // Add new post to the list
      // This is a simplified example - in a real app, you would make an API call
      setNewPostContent("");
      setShowNewPost(false);
    }
  };

  // Simulate receiving notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would come from a WebSocket connection
      if (Math.random() > 0.7) { // 30% chance of notification
        setNotifications(prev => prev + 1);
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Community</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <Button className="gap-2" onClick={() => setShowNewPost(true)}>
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Create Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg w-full max-w-2xl">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Create Post</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowNewPost(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="What's on your heart today?"
                      className="w-full min-h-[100px] p-3 text-lg border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Photo</Button>
                        <Button variant="outline" size="sm">Video</Button>
                        <Button variant="outline" size="sm">Prayer</Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowNewPost(false)}>Cancel</Button>
                        <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>Post</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Feed */}
        <div className="mb-8 p-4 bg-card rounded-lg border shadow-soft">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="mt-3 flex gap-4 overflow-x-auto pb-2">
            {[
              { text: "James joined the Youth Fellowship", time: "5m ago" },
              { text: "Sarah liked your post", time: "12m ago" },
              { text: "New prayer request in Prayer Warriors", time: "25m ago" },
              { text: "Pastor Michael shared a new sermon", time: "1h ago" },
              { text: "Emma commented on your post", time: "2h ago" },
            ].map((activity, index) => (
              <div key={index} className="min-w-[200px] p-3 bg-muted/30 rounded-lg">
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search posts, groups, people..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-4">
              {globalPosts.map((post) => (
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
                            <span>{post.church}</span>
                            <span>•</span>
                            <span>{post.time}</span>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">{post.group}</Badge>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`gap-2 ${post.liked ? 'text-red-500' : ''}`}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`gap-2 ${post.prayed ? 'text-blue-500' : ''}`}
                        onClick={() => handlePrayPost(post.id)}
                      >
                        <HandHeart className={`w-4 h-4 ${post.prayed ? 'fill-current' : ''}`} />
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
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search groups..." className="pl-10" />
              </div>
              <Link to="/community/create-group">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Group
                </Button>
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Groups You May Like</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                  <Card key={group.id} className="shadow-soft hover:shadow-card transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="text-4xl">{group.image}</div>
                        <div className="flex gap-1">
                          {group.privacy === "private" && (
                            <Badge variant="outline" className="text-xs px-2">Private</Badge>
                          )}
                          {group.newPosts > 0 && (
                            <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs px-2">
                              {group.newPosts} new
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription>
                        {group.members} members • {group.posts} new posts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline">{group.category}</Badge>
                        {group.membersYouKnow > 0 && (
                          <span className="text-xs text-muted-foreground">{group.membersYouKnow} members you know</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">View Group</Button>
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">My Groups</h3>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Discover More
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.slice(0, 3).map((group) => (
                  <Card key={`my-${group.id}`} className="shadow-soft hover:shadow-card transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="text-4xl">{group.image}</div>
                        <div className="flex gap-1">
                          {group.newPosts > 0 && (
                            <Badge variant="default" className="bg-primary text-primary-foreground text-xs px-2">
                              {group.newPosts} new
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription>
                        {group.members} members • {group.posts} new posts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline">{group.category}</Badge>
                        <span className="text-xs text-muted-foreground">You're a member</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="people" className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search people..." className="pl-10" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Suggested Connections</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {people.filter(p => !p.connected).map((person) => (
                  <Card key={person.id} className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{person.name}</p>
                          <p className="text-sm text-muted-foreground">{person.role}</p>
                          <p className="text-xs text-muted-foreground">{person.church}</p>
                          {person.mutual > 0 && (
                            <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1" size="sm">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">People Nearby</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {people.slice(3).map((person) => (
                  <Card key={`near-${person.id}`} className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{person.name}</p>
                          <p className="text-sm text-muted-foreground">{person.role}</p>
                          <p className="text-xs text-muted-foreground">{person.church}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant={person.connected ? "secondary" : "outline"} size="sm">
                          {person.connected ? (
                            <UserCheck className="w-4 h-4" />
                          ) : (
                            <UserPlus className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">My Connections</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {people.filter(p => p.connected).map((person) => (
                  <Card key={`conn-${person.id}`} className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{person.name}</p>
                          <p className="text-sm text-muted-foreground">{person.role}</p>
                          <p className="text-xs text-muted-foreground">{person.church}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1" size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Community;
