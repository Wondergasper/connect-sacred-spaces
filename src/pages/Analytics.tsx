import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { dashboardService } from "@/services/dashboardService";
import { donationService } from "@/services/donationService";
import { useState, useEffect } from "react";

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: "up" | "down";
}

interface AttendanceData {
  day: string;
  attendance: number;
}

interface AnalyticsData {
  stats: Stat[];
  attendanceData: AttendanceData[];
  // Add other analytics data as required
}

const Analytics = () => {
  const { state } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // In a real app, we would fetch actual analytics data from the backend
        // For now, we'll use mock data but based on actual API response structure
        const [dashboardStats, donationStats] = await Promise.all([
          dashboardService.getDashboardStats(),
          donationService.getDonationStats()
        ]);
        
        // Format the data to match the required structure
        const formattedStats: Stat[] = [
          { 
            title: "Total Members", 
            value: dashboardStats.activeMembers?.toString() || "0", 
            change: "+12%", 
            icon: Users,
            trend: "up" as const
          },
          { 
            title: "Weekly Attendance", 
            value: dashboardStats.upcomingEvents?.toString() || "0", 
            change: "+5%", 
            icon: Activity,
            trend: "up" as const
          },
          { 
            title: "Monthly Donations", 
            value: `${dashboardStats.monthlyDonations?.toLocaleString() || "0"}`, 
            change: "+18%", 
            icon: DollarSign,
            trend: "up" as const
          },
          { 
            title: "Events This Month", 
            value: dashboardStats.upcomingEvents?.toString() || "0", 
            change: "+3", 
            icon: Calendar,
            trend: "up" as const
          },
        ];
        
        // Mock attendance data for demo
        const attendanceData: AttendanceData[] = [
          { day: "Mon", attendance: 650 },
          { day: "Tue", attendance: 420 },
          { day: "Wed", attendance: 890 },
          { day: "Thu", attendance: 550 },
          { day: "Fri", attendance: 320 },
          { day: "Sat", attendance: 780 },
          { day: "Sun", attendance: 1240 },
        ];
        
        setAnalyticsData({
          stats: formattedStats,
          attendanceData
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load analytics:", error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const attendanceData = analyticsData?.attendanceData || [
    { day: "Mon", attendance: 650 },
    { day: "Tue", attendance: 420 },
    { day: "Wed", attendance: 890 },
    { day: "Thu", attendance: 550 },
    { day: "Fri", attendance: 320 },
    { day: "Sat", attendance: 780 },
    { day: "Sun", attendance: 1240 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Analytics</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Church Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your church's performance and engagement metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {analyticsData && !loading ? (
            analyticsData.stats.map((stat, index) => (
              <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change} from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
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

        {/* Charts Section */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          {/* Attendance Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Weekly Attendance
              </CardTitle>
              <CardDescription>Members attending services throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-16 text-sm text-muted-foreground">{day.day}</div>
                    <div className="flex-1 flex items-center gap-2">
                      <div 
                        className="h-8 bg-primary/20 rounded flex items-center justify-end pr-2 text-xs font-medium text-primary"
                        style={{ width: `${(day.attendance / 1400) * 100}%` }}
                      >
                        {day.attendance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Donations Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Monthly Donations
              </CardTitle>
              <CardDescription>Financial giving trends over the past months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: "Jan", amount: 8500, color: "bg-primary/20" },
                  { month: "Feb", amount: 9200, color: "bg-primary/30" },
                  { month: "Mar", amount: 10500, color: "bg-primary/40" },
                  { month: "Apr", amount: 11800, color: "bg-primary/60" },
                  { month: "May", amount: 12400, color: "bg-primary/80" },
                  { month: "Jun", amount: 14200, color: "bg-primary" },
                ].map((month, index) => (
                  <div key={month.month} className="flex items-center gap-4">
                    <div className="w-16 text-sm text-muted-foreground">{month.month}</div>
                    <div className="flex-1 flex items-center gap-2">
                      <div 
                        className={`h-8 rounded flex items-center justify-end pr-2 text-xs font-medium text-primary-foreground ${month.color}`}
                        style={{ width: `${(month.amount / 16000) * 100}%` }}
                      >
                        ${month.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          {/* Member Growth */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Member Growth
              </CardTitle>
              <CardDescription>New members over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: "Jan", newMembers: 12 },
                  { month: "Feb", newMembers: 18 },
                  { month: "Mar", newMembers: 22 },
                  { month: "Apr", newMembers: 15 },
                  { month: "May", newMembers: 25 },
                  { month: "Jun", newMembers: 30 },
                ].map((item) => (
                  <div key={item.month} className="flex justify-between">
                    <span className="text-muted-foreground">{item.month}</span>
                    <span className="font-medium">+{item.newMembers}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Engagement Metrics
              </CardTitle>
              <CardDescription>Community participation levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Event RSVPs", value: 78 },
                  { label: "Group Participation", value: 65 },
                  { label: "Community Posts", value: 92 },
                  { label: "Prayer Requests", value: 45 },
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <span className="text-sm font-medium">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Donors */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Top Donors
              </CardTitle>
              <CardDescription>Leading contributors this quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Smith", amount: "$2,400" },
                  { name: "Sarah Johnson", amount: "$1,850" },
                  { name: "Michael Brown", amount: "$1,675" },
                  { name: "Emily Davis", amount: "$1,420" },
                ].map((donor, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm font-medium">{donor.name}</span>
                    <span className="text-sm text-muted-foreground">{donor.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Actions */}
        <div className="flex justify-center">
          <div className="inline-flex gap-3">
            <Button variant="outline">Generate Monthly Report</Button>
            <Button>Download Full Analytics</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;