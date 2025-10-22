import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Church, 
  BookOpen, 
  MessageCircle, 
  Settings,
  Bell,
  User,
  LogOut,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { dashboardService } from '@/services/dashboardService';
import { authService } from '@/services/authService';
import { eventService } from '@/services/eventService';
import { donationService } from '@/services/donationService';

interface AdminDashboardStats {
  totalMembers: number;
  totalEvents: number;
  totalDonations: number;
  totalGroups: number;
}

const AdminDashboard = () => {
  const { state, dispatch } = useAuth();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.user.role !== 'admin' && state.user.role !== 'pastor') {
      navigate('/dashboard');
    }
  }, [state.isAuthenticated, state.user, navigate]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Fetch stats from the backend
        const dashboardStats = await dashboardService.getDashboardStats();
        const events = await eventService.getEvents();
        const donations = await donationService.getDonations();
        
        // Format the stats for admin dashboard
        setStats({
          totalMembers: dashboardStats.activeMembers,
          totalEvents: events.length,
          totalDonations: donations.length,
          totalGroups: dashboardStats.newGroups
        });
      } catch (error) {
        console.error('Failed to load admin dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // Mock data for charts
  const attendanceData = [
    { day: 'Mon', attendance: 650 },
    { day: 'Tue', attendance: 420 },
    { day: 'Wed', attendance: 890 },
    { day: 'Thu', attendance: 550 },
    { day: 'Fri', attendance: 320 },
    { day: 'Sat', attendance: 780 },
    { day: 'Sun', attendance: 1240 },
  ];

  const donationData = [
    { month: 'Jan', amount: 8500 },
    { month: 'Feb', amount: 9200 },
    { month: 'Mar', amount: 10500 },
    { month: 'Apr', amount: 11800 },
    { month: 'May', amount: 12400 },
    { month: 'Jun', amount: 14200 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      {/* Header with professional design */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl text-gray-900">ChurchConnect</span>
              <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold">ADMINISTRATION</Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Admin-specific controls */}
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Church Settings
            </Button>
            
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

      <main className="container py-8">
        {/* Role Indicator Banner */}
        <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-md">Administration Dashboard</h2>
                <p className="text-red-100 text-xs">Manage your church community and oversee operations</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 font-bold text-xs">
              MANAGEMENT ACCESS
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats && !loading ? (
            <>
              <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-blue-500 bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Members
                  </CardTitle>
                  <Users className="w-4 h-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalMembers}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-500">+12% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-purple-500 bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Upcoming Events
                  </CardTitle>
                  <Calendar className="w-4 h-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalEvents}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-500">+5 from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-green-500 bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Donations
                  </CardTitle>
                  <DollarSign className="w-4 h-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalDonations}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-500">+18% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-orange-500 bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Groups
                  </CardTitle>
                  <Users className="w-4 h-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalGroups}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-500">+3 from last month</span>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            // Loading placeholders
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="shadow-card">
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

        {/* Navigation Tabs */}
        <div className="flex border-b mb-8">
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'members' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'events' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'donations' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('donations')}
          >
            Donations
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'reports' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <div className="grid gap-8 lg:grid-cols-2">
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
                  {donationData.map((month, index) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-16 text-sm text-muted-foreground">{month.month}</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div 
                          className="h-8 rounded flex items-center justify-end pr-2 text-xs font-medium text-primary-foreground bg-primary"
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
        )}

        {activeTab === 'members' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Member Management</h2>
              <p className="text-muted-foreground">View and manage church members</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Add New Member</CardTitle>
                  <CardDescription>Create an account for a new church member</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Create Member</Button>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Bulk Import</CardTitle>
                  <CardDescription>Import members from a CSV file</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Upload CSV</Button>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Member Roles</CardTitle>
                  <CardDescription>Assign roles like deacon, volunteer, etc.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Manage Roles</Button>
                </CardContent>
              </Card>
            </div>

            {/* Member list placeholder */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>All Members</CardTitle>
                <CardDescription>Manage and view all church members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Member list will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Event Management</h2>
              <p className="text-muted-foreground">Create and manage church events</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Create Event</CardTitle>
                  <CardDescription>Plan a new church event</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">New Event</Button>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recurring Events</CardTitle>
                  <CardDescription>Set up weekly/monthly recurring events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Setup</Button>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Event Templates</CardTitle>
                  <CardDescription>Save event templates for quick creation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Manage</Button>
                </CardContent>
              </Card>
            </div>

            {/* Events list placeholder */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Scheduled events for the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Event list will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'donations' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Donation Management</h2>
              <p className="text-muted-foreground">Track and manage church donations</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">New Donation</CardTitle>
                  <CardDescription>Record a new donation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Record</Button>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Financial Reports</CardTitle>
                  <CardDescription>Generate donation reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Generate</Button>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recurring Donations</CardTitle>
                  <CardDescription>Manage monthly/weekly givers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Manage</Button>
                </CardContent>
              </Card>
            </div>

            {/* Donations list placeholder */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest contributions to the church</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Donation list will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Analytics Reports</h2>
              <p className="text-muted-foreground">View detailed church analytics</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Attendance Trends
                  </CardTitle>
                  <CardDescription>Track attendance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                    <p className="text-muted-foreground">Attendance chart</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Giving Analytics
                  </CardTitle>
                  <CardDescription>Donation patterns and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                    <p className="text-muted-foreground">Donation chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>Download detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline">Weekly</Button>
                  <Button variant="outline">Monthly</Button>
                  <Button variant="outline">Quarterly</Button>
                  <Button variant="outline">Annual</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;