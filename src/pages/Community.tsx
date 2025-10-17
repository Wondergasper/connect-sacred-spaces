import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, MessageCircle, Heart, Share2, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const groups = [
    { id: 1, name: "Worship Team", members: 156, posts: 12, image: "🎵", category: "Music" },
    { id: 2, name: "Bible Study Circle", members: 89, posts: 5, image: "📖", category: "Study" },
    { id: 3, name: "Youth Fellowship", members: 234, posts: 24, image: "🙌", category: "Youth" },
    { id: 4, name: "Prayer Warriors", members: 412, posts: 18, image: "🙏", category: "Prayer" },
  ];

  const posts = [
    {
      id: 1,
      author: "Sarah Johnson",
      time: "2 hours ago",
      content: "Blessed to share that our youth outreach touched 50+ lives this weekend! God is faithful. 🙏",
      likes: 45,
      comments: 12,
      group: "Youth Fellowship"
    },
    {
      id: 2,
      author: "Pastor Michael",
      time: "5 hours ago",
      content: "Prayer request: Please keep our missions team in your prayers as they travel to serve communities in need.",
      likes: 89,
      comments: 23,
      group: "Prayer Warriors"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Community</span>
          </Link>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Post
          </Button>
        </div>
      </header>

      <main className="container py-8">
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
                <Input placeholder="Search posts..." className="pl-10" />
              </div>
            </div>

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
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
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
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Group
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="shadow-soft hover:shadow-card transition-all cursor-pointer">
                  <CardHeader>
                    <div className="text-4xl mb-2">{group.image}</div>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>
                      {group.members} members • {group.posts} new posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">View Group</Button>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="people" className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search people..." className="pl-10" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Suggested Connections</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">Member Name</p>
                          <p className="text-sm text-muted-foreground">Worship Team</p>
                        </div>
                      </div>
                      <Button className="w-full mt-4" size="sm" variant="secondary">
                        Connect
                      </Button>
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
