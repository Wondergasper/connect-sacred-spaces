import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, UserPlus, UserCheck, MessageCircle, Mail, Phone, MapPin, Building2, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const People = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock people data
  const people = [
    { id: 1, name: "James Wilson", role: "Worship Leader", church: "Grace Community", location: "New York, NY", mutual: 3, connected: false },
    { id: 2, name: "Maria Garcia", role: "Sunday School Teacher", church: "Victory Church", location: "Los Angeles, CA", mutual: 1, connected: true },
    { id: 3, name: "Thomas Chen", role: "IT Department", church: "City Light Fellowship", location: "San Francisco, CA", mutual: 5, connected: false },
    { id: 4, name: "Patricia Brown", role: "Deacon", church: "Grace Community", location: "Chicago, IL", mutual: 2, connected: false },
    { id: 5, name: "Ahmed Hassan", role: "Community Outreach", church: "Faith Center", location: "Houston, TX", mutual: 4, connected: true },
    { id: 6, name: "Olivia Smith", role: "Youth Leader", church: "New Hope Church", location: "Miami, FL", mutual: 3, connected: false },
    { id: 7, name: "David Kim", role: "Pastor", church: "Grace Community", location: "Seattle, WA", mutual: 0, connected: false },
    { id: 8, name: "Sarah Johnson", role: "Music Director", church: "Harvest Chapel", location: "Boston, MA", mutual: 2, connected: true },
  ];

  // Filter people based on search term
  const filteredPeople = people.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.church.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by tab
  const displayedPeople = activeTab === "connected" 
    ? filteredPeople.filter(person => person.connected)
    : activeTab === "nearby"
      ? filteredPeople
      : filteredPeople; // "all" tab

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/community" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">People</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Fellow Believers</h1>
          <p className="text-muted-foreground">Connect with people from your denomination and beyond</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, church, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All People</TabsTrigger>
            <TabsTrigger value="connected">Connections</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPeople.map((person) => (
                <Card key={person.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <span className="text-2xl font-semibold text-primary">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg">{person.name}</h3>
                      <p className="text-muted-foreground">{person.role}</p>
                      <p className="text-sm text-muted-foreground">{person.church}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{person.location}</span>
                      </div>
                      
                      {person.mutual > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <Users2 className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{person.mutual} mutual connections</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      
                      {person.connected ? (
                        <Button size="sm" variant="outline">
                          <UserCheck className="w-4 h-4 mr-2" />
                          Connected
                        </Button>
                      ) : (
                        <Button size="sm">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connected">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPeople.map((person) => (
                <Card key={person.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <span className="text-2xl font-semibold text-primary">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg">{person.name}</h3>
                      <p className="text-muted-foreground">{person.role}</p>
                      <p className="text-sm text-muted-foreground">{person.church}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{person.location}</span>
                      </div>
                      
                      {person.mutual > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <Users2 className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{person.mutual} mutual connections</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Connected
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nearby">
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find People Nearby</h3>
              <p className="text-muted-foreground mb-4">
                Enable location services to discover believers in your area
              </p>
              <Button>
                Enable Location
              </Button>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Based on Your Location</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPeople.slice(0, 3).map((person) => (
                  <Card key={person.id} className="shadow-soft hover:shadow-card transition-all">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <span className="text-2xl font-semibold text-primary">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg">{person.name}</h3>
                        <p className="text-muted-foreground">{person.role}</p>
                        <p className="text-sm text-muted-foreground">{person.church}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{person.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Connect
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

export default People;