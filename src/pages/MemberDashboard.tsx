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
import { UserNav } from "@/components/Navigation";

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

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (state.isAuthenticated && state.user && (state.user.role === 'admin' || state.user.role === 'pastor')) {
      navigate('/admin-dashboard');
    }
  }, [state.isAuthenticated, state.user, navigate]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header with warm, welcoming design */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Church className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ChurchConnect</span>
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-bold">MEMBER</Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
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
        <div className="container flex items-center justify-between">
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

      <main className="container py-8">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-card hover:shadow-elevated transition-all duration-200 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Your next {currentDenomination.name} activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Sunday Worship</p>
                    <p className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</p>
                  </div>
                  <Link to="/events">
                    <Button size="sm" variant="secondary">RSVP</Button>
                  </Link>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Youth Bible Study</p>
                    <p className="text-sm text-muted-foreground">Wednesday, 6:00 PM</p>
                  </div>
                  <Link to="/events">
                    <Button size="sm" variant="secondary">RSVP</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-200 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Recent Sermons
              </CardTitle>
              <CardDescription>Latest messages from {currentDenomination.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Walking in Faith</p>
                    <p className="text-sm text-muted-foreground">Pastor James • 45 min</p>
                  </div>
                  <Link to="/media">
                    <Button size="sm" variant="secondary">Play</Button>
                  </Link>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Power of Prayer</p>
                    <p className="text-sm text-muted-foreground">Pastor Sarah • 38 min</p>
                  </div>
                  <Link to="/media">
                    <Button size="sm" variant="secondary">Play</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-200 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Community Groups
              </CardTitle>
              <CardDescription>Connect with fellow {currentDenomination.name} believers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Worship Team</p>
                    <p className="text-sm text-muted-foreground">156 members • 12 new posts</p>
                  </div>
                  <Link to="/community">
                    <Button size="sm" variant="secondary">View</Button>
                  </Link>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Bible Study Circle</p>
                    <p className="text-sm text-muted-foreground">89 members • 5 new posts</p>
                  </div>
                  <Link to="/community">
                    <Button size="sm" variant="secondary">View</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Devotionals Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Daily Devotionals</h2>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">The Peace of God</h3>
                  <p className="text-sm text-muted-foreground mb-2">Philippians 4:6-7</p>
                  <p className="text-foreground">Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MemberDashboard;