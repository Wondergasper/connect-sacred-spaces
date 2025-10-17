import { Bell, Church, Users, Calendar, DollarSign, BookOpen, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Active Members", value: "1,234", icon: Users, trend: "+12%" },
    { label: "This Week's Events", value: "8", icon: Calendar, trend: "+2" },
    { label: "Monthly Donations", value: "$12,450", icon: DollarSign, trend: "+18%" },
    { label: "New Messages", value: "42", icon: MessageCircle, trend: "+5" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Church className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">ChurchConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's what's happening in your community today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8 animate-slide-up">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-secondary mt-1">{stat.trend} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-card hover:shadow-elevated transition-all duration-200 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Your next church activities</CardDescription>
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
              <CardDescription>Latest messages from your church</CardDescription>
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
              <CardDescription>Connect with fellow believers</CardDescription>
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
      </main>
    </div>
  );
};

export default Dashboard;
