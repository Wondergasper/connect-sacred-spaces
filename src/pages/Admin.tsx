import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, DollarSign, Calendar, TrendingUp, Upload, Building2, Shield } from "lucide-react";

const Admin = () => {
  const statsData = [
    { name: "Jan", members: 120, donations: 5400, attendance: 95 },
    { name: "Feb", members: 135, donations: 6100, attendance: 102 },
    { name: "Mar", members: 148, donations: 6800, attendance: 110 },
    { name: "Apr", members: 162, donations: 7200, attendance: 118 },
    { name: "May", members: 178, donations: 7900, attendance: 125 },
    { name: "Jun", members: 195, donations: 8500, attendance: 135 },
  ];

  const categoryData = [
    { name: "Tithes", value: 12500, color: "#0B6E4F" },
    { name: "Offerings", value: 8400, color: "#00A67E" },
    { name: "Building Fund", value: 5200, color: "#FFD700" },
    { name: "Missions", value: 3100, color: "#6366f1" },
  ];

  const members = [
    { id: 1, name: "John Doe", role: "Member", status: "Active", joined: "Jan 2024" },
    { id: 2, name: "Sarah Smith", role: "Deacon", status: "Active", joined: "Feb 2024" },
    { id: 3, name: "Mike Johnson", role: "Member", status: "Pending", joined: "Jun 2024" },
  ];

  const branches = [
    { id: 1, name: "Main Branch", location: "Downtown", members: 450, pastor: "Rev. James" },
    { id: 2, name: "East Side Chapel", location: "East District", members: 230, pastor: "Pastor Sarah" },
    { id: 3, name: "Youth Center", location: "University Area", members: 180, pastor: "Pastor Mike" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Admin Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">195</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$29,200</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">135</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">All branches active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="branches">Branches</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Growth Overview</CardTitle>
                <CardDescription>Member growth and attendance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="members" stroke="#0B6E4F" strokeWidth={2} />
                    <Line type="monotone" dataKey="attendance" stroke="#00A67E" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Monthly donation performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#0B6E4F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>View and manage church members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role} • Joined {member.joined}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {member.status}
                        </span>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Donation Categories</CardTitle>
                  <CardDescription>Breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                  <CardDescription>Current month overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <span className="font-semibold">${cat.value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg">${categoryData.reduce((acc, cat) => acc + cat.value, 0).toLocaleString()}</span>
                  </div>
                  <Button className="w-full mt-4">Export Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branches" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Branch Management</CardTitle>
                <CardDescription>Manage all church branches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {branches.map((branch) => (
                    <div key={branch.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{branch.name}</h4>
                          <p className="text-sm text-muted-foreground">{branch.location}</p>
                        </div>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <span className="text-muted-foreground">
                          <Users className="w-4 h-4 inline mr-1" />
                          {branch.members} members
                        </span>
                        <span className="text-muted-foreground">Pastor: {branch.pastor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Content Upload</CardTitle>
                <CardDescription>Upload sermons, music, and books to the media library</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Sermon
                </Button>
                <Button className="w-full" size="lg" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Music
                </Button>
                <Button className="w-full" size="lg" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Book/Resource
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
