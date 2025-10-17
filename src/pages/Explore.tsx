import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play, Download, BookOpen, Music, Church, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Explore = () => {
  const trendingSermons = [
    { id: 1, title: "Faith Over Fear", church: "Victory Church", views: "12.3K", duration: "42 min" },
    { id: 2, title: "Walking in Purpose", church: "Grace Community", views: "9.8K", duration: "38 min" },
    { id: 3, title: "The Power of Worship", church: "Harvest Chapel", views: "8.5K", duration: "45 min" },
  ];

  const trendingMusic = [
    { id: 1, title: "Goodness of God", artist: "Worship United", plays: "45K" },
    { id: 2, title: "Way Maker", artist: "Faith Singers", plays: "38K" },
    { id: 3, title: "Raise a Hallelujah", artist: "Kingdom Voices", plays: "32K" },
  ];

  const churches = [
    { id: 1, name: "Grace Community Church", location: "New York, NY", members: "1.2K" },
    { id: 2, name: "Victory Fellowship", location: "Los Angeles, CA", members: "890" },
    { id: 3, name: "Harvest Chapel", location: "Chicago, IL", members: "2.3K" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Explore</span>
          </Link>
          <div className="flex gap-2">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Join Now</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Discover Faith Content</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Explore sermons, music, and resources from churches worldwide
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search for sermons, music, churches..." 
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        <Tabs defaultValue="sermons" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="sermons">Sermons</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="churches">Churches</TabsTrigger>
          </TabsList>

          <TabsContent value="sermons" className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Trending This Week</span>
            </div>
            
            <div className="grid gap-4">
              {trendingSermons.map((sermon) => (
                <Card key={sermon.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{sermon.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {sermon.church} • {sermon.duration} • {sermon.views} views
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2">
                          <Play className="w-4 h-4" />
                          Play
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Browse by Topic</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                {["Faith", "Prayer", "Family", "Worship", "Leadership", "Hope", "Grace", "Purpose"].map((topic) => (
                  <Button key={topic} variant="outline" className="justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Most Played</span>
            </div>

            <div className="grid gap-4">
              {trendingMusic.map((song) => (
                <Card key={song.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Music className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{song.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {song.artist} • {song.plays} plays
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Play className="w-4 h-4" />
                        Play
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="churches" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {churches.map((church) => (
                <Card key={church.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Church className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{church.name}</CardTitle>
                    <CardDescription>
                      {church.location} • {church.members} members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">View Church</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Can't find your church?</p>
              <Link to="/auth">
                <Button variant="outline">Add Your Church</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Explore;
