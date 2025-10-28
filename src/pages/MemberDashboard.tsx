import { Bell, Church, Users, Calendar, DollarSign, BookOpen, MessageCircle, ChevronDown, Globe, User, Settings, LogOut, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { dashboardService } from "@/services/dashboardService";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import { UserNav, MemberSidebar } from "@/components/Navigation";

interface DashboardStats {
  activeMembers: number;
  upcomingEvents: number;
  monthlyDonations: number;
  newGroups: number;
}

const MemberDashboard = () => {
  const { state, dispatch } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  // Mock denominations data
  const denominations = [
    { id: "rccg", name: "Redeemed Christian Church of God", current: true },
    { id: "winners", name: "Winners' Chapel", current: false },
    { id: "global", name: "Global Community", current: false }
  ];

  const currentDenomination = denominations.find(d => d.id === state.currentDenomination) || denominations[0];

  const handleDenominationChange = (denomId: string) => {
    dispatch({ type: 'SET_CURRENT_DENOMINATION', payload: denomId });
  };

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const statsData = await dashboardService.getDashboardStats();
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const [activePath, setActivePath] = useState('/dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Member Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 bg-gradient-to-b from-blue-50 to-indigo-50">
        <MemberSidebar activePath={activePath} onNavigate={(path) => setActivePath(path)} />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header with warm, welcoming design */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3 md:hidden"> {/* Mobile menu button for smaller screens */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Church className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ChurchConnect</span>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-bold">MEMBER</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              {/* Denomination Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {currentDenomination.id === "global" ? <Globe className="w-4 h-4 text-primary" /> : <Church className="w-4 h-4 text-primary" />}
                    </div>
                    <span className="text-sm font-medium">{currentDenomination.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {denominations.map((denom) => (
                    <DropdownMenuItem 
                      key={denom.id} 
                      className="flex items-center gap-3"
                      onClick={() => handleDenominationChange(denom.id)}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        {denom.id === "global" ? <Globe className="w-3 h-3 text-primary" /> : <Church className="w-3 h-3 text-primary" />}
                      </div>
                      <span>{denom.name}</span>
                      {denom.id === state.currentDenomination && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-primary"></div>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <UserNav onLogout={() => {
                authService.logout();
                dispatch({ type: 'LOGOUT' });
                navigate('/auth');
              }} />
            </div>
          </div>
        </header>

        {/* Member Dashboard Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 shadow-md">
          <div className="px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" />
              <div>
                <h2 className="font-bold text-md">Member Dashboard</h2>
                <p className="text-blue-100 text-xs">Connect with your faith community</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 font-bold text-xs">
              PERSONAL ACCESS
            </Badge>
          </div>
        </div>

        <main className="flex-1 py-8 px-4 lg:px-6">
        {/* Role Indicator Banner */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Member Dashboard</h2>
                <p className="text-blue-100 text-sm">Personal faith community experience</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              MEMBER
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats && !loading ? (
            <>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Members
                  </CardTitle>
                  <Users className="w-4 h-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">{stats.activeMembers}</div>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Upcoming Events
                  </CardTitle>
                  <Calendar className="w-4 h-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-700">{stats.upcomingEvents}</div>
                  <p className="text-xs text-green-600 mt-1">+2 from last month</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly Donations
                  </CardTitle>
                  <DollarSign className="w-4 h-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-700">${stats.monthlyDonations.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">+18% from last month</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    New Groups
                  </CardTitle>
                  <Users className="w-4 h-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700">{stats.newGroups}</div>
                  <p className="text-xs text-green-600 mt-1">+3 from last month</p>
                </CardContent>
              </Card>
            </>
          ) : (
            // Loading placeholders
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Loading...
                  </CardTitle>
                  <div className="w-4 h-4 bg-primary/20 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold h-8 bg-primary/20 rounded animate-pulse" />
                  <div className="h-4 bg-primary/20 rounded mt-1 animate-pulse" />
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold">Upcoming Events</span>
              </CardTitle>
              <CardDescription className="text-sm">Your next {currentDenomination.name} activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                  <div>
                    <p className="font-medium text-blue-900">Sunday Worship</p>
                    <p className="text-sm text-blue-700">Tomorrow, 9:00 AM</p>
                  </div>
                  <Link to="/events">
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">RSVP</Button>
                  </Link>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                  <div>
                    <p className="font-medium text-blue-900">Youth Bible Study</p>
                    <p className="text-sm text-blue-700">Wednesday, 6:00 PM</p>
                  </div>
                  <Link to="/events">
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">RSVP</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500" />
                <span className="text-lg font-semibold">Recent Sermons</span>
              </CardTitle>
              <CardDescription className="text-sm">Latest messages from {currentDenomination.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50">
                  <div>
                    <p className="font-medium text-purple-900">Walking in Faith</p>
                    <p className="text-sm text-purple-700">Pastor James • 45 min</p>
                  </div>
                  <Link to="/media">
                    <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">Play</Button>
                  </Link>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50">
                  <div>
                    <p className="font-medium text-purple-900">Power of Prayer</p>
                    <p className="text-sm text-purple-700">Pastor Sarah • 38 min</p>
                  </div>
                  <Link to="/media">
                    <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">Play</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-lg font-semibold">Community Groups</span>
              </CardTitle>
              <CardDescription className="text-sm">Connect with fellow {currentDenomination.name} believers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-50">
                  <div>
                    <p className="font-medium text-green-900">Worship Team</p>
                    <p className="text-sm text-green-700">156 members • 12 new posts</p>
                  </div>
                  <Link to="/community">
                    <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">View</Button>
                  </Link>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-50">
                  <div>
                    <p className="font-medium text-green-900">Bible Study Circle</p>
                    <p className="text-sm text-green-700">89 members • 5 new posts</p>
                  </div>
                  <Link to="/community">
                    <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">View</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Devotionals Section */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Daily Devotionals</h2>
          </div>
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">The Peace of God</h3>
                  <p className="text-sm text-purple-700 font-medium mb-4">Philippians 4:6-7</p>
                  <p className="text-gray-700 leading-relaxed mb-4">Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Today's reading</span>
                    <span>•</span>
                    <span>3 min read</span>
                  </div>
                </div>
                <div className="md:w-64 flex-shrink-0">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white h-full flex flex-col justify-between">
                    <div>
                      <p className="text-sm opacity-80 mb-2">Daily Inspiration</p>
                      <p className="font-medium">"Be anxious for nothing..."</p>
                    </div>
                    <div className="mt-4">
                      <Link to="/devotionals">
                        <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  </div>
  );
};

export default MemberDashboard;