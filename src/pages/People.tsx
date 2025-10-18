import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Search, UserPlus, MessageCircle, MapPin, Church } from "lucide-react";
import { Link } from "react-router-dom";

const People = () => {
  const suggestions = [
    { id: 1, name: "Emily Johnson", church: "Grace Community", location: "New York, NY", interests: ["Worship", "Youth"], mutualFriends: 5 },
    { id: 2, name: "Michael Chen", church: "Victory Fellowship", location: "Los Angeles, CA", interests: ["Tech", "Media"], mutualFriends: 3 },
    { id: 3, name: "Sarah Williams", church: "Harvest Chapel", location: "Chicago, IL", interests: ["Prayer", "Bible Study"], mutualFriends: 7 },
    { id: 4, name: "David Martinez", church: "Faith Center", location: "Houston, TX", interests: ["Outreach", "Missions"], mutualFriends: 2 },
    { id: 5, name: "Lisa Anderson", church: "Hope Church", location: "Phoenix, AZ", interests: ["Choir", "Music"], mutualFriends: 4 },
    { id: 6, name: "James Taylor", church: "New Life Church", location: "Philadelphia, PA", interests: ["Leadership", "Teaching"], mutualFriends: 6 },
  ];

  const nearby = [
    { id: 1, name: "Robert Brown", church: "Local Fellowship", distance: "2.3 miles", interests: ["Prayer"] },
    { id: 2, name: "Jennifer Davis", church: "Community Church", distance: "3.8 miles", interests: ["Youth"] },
    { id: 3, name: "William Wilson", church: "Grace Point", distance: "5.1 miles", interests: ["Worship"] },
  ];

  const connections = [
    { id: 1, name: "John Smith", church: "Victory Church", status: "Connected", interests: ["Bible Study", "Prayer"] },
    { id: 2, name: "Mary Johnson", church: "Grace Community", status: "Connected", interests: ["Worship", "Music"] },
    { id: 3, name: "Daniel Lee", church: "Faith Center", status: "Connected", interests: ["Youth", "Outreach"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/community" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Connect with People</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search people by name, church, or interests..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="suggestions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="connections">My Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">People You May Know</h2>
              <p className="text-sm text-muted-foreground">Based on shared interests and mutual connections</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((person) => (
                <Card key={person.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto mb-3 flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{person.name}</h3>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                        <Church className="w-3 h-3" />
                        <span>{person.church}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" />
                        <span>{person.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center mb-3">
                        {person.interests.map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        {person.mutualFriends} mutual connections
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gap-2">
                        <UserPlus className="w-4 h-4" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nearby" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Believers Near You</h2>
              <p className="text-sm text-muted-foreground">Connect with people in your area</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearby.map((person) => (
                <Card key={person.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-sm text-muted-foreground">{person.church}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="font-medium text-primary">{person.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {person.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="w-full gap-2">
                      <UserPlus className="w-4 h-4" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Your Connections</h2>
              <p className="text-sm text-muted-foreground">{connections.length} people you're connected with</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connections.map((person) => (
                <Card key={person.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-sm text-muted-foreground">{person.church}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {person.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {person.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default People;
