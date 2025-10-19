import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, DollarSign, Calendar, TrendingUp, Upload, Building2, Shield, Search, Filter, Download, Eye, Edit, Trash2, UserPlus, Plus, Globe, Church } from "lucide-react";

const Admin = () => {
  const { state } = useAuth();
  const [activeTab, setActiveTab] = useState("analytics");
  const [branchFilter, setBranchFilter] = useState("all");

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
    { id: 1, name: "John Doe", role: "Member", status: "Active", joined: "Jan 2024", branch: "Main Branch", email: "john@example.com", phone: "+1234567890" },
    { id: 2, name: "Sarah Smith", role: "Deacon", status: "Active", joined: "Feb 2024", branch: "East Side Chapel", email: "sarah@example.com", phone: "+1234567891" },
    { id: 3, name: "Mike Johnson", role: "Member", status: "Pending", joined: "Jun 2024", branch: "Main Branch", email: "mike@example.com", phone: "+1234567892" },
    { id: 4, name: "Emma Wilson", role: "Pastor", status: "Active", joined: "Mar 2024", branch: "Youth Center", email: "emma@example.com", phone: "+1234567893" },
  ];

  const branches = [
    { id: 1, name: "Main Branch", location: "Downtown", members: 450, pastor: "Rev. James", denomination: "RCCG", established: "2010" },
    { id: 2, name: "East Side Chapel", location: "East District", members: 230, pastor: "Pastor Sarah", denomination: "RCCG", established: "2015" },
    { id: 3, name: "Youth Center", location: "University Area", members: 180, pastor: "Pastor Mike", denomination: "Winners", established: "2018" },
    { id: 4, name: "North Campus", location: "North Hills", members: 320, pastor: "Pastor Lisa", denomination: "Daystar", established: "2012" },
  ];

  const denominations = [
    { id: "rccg", name: "Redeemed Christian Church of God", branches: 12 },
    { id: "winners", name: "Winners' Chapel", branches: 8 },
    { id: "daystar", name: "Daystar Christian Centre", branches: 5 },
    { id: "cit", name: "Church of Christ in Nations", branches: 3 }
  ];

  const content = [
    { id: 1, title: "Walking in Faith", type: "sermon", date: "Dec 15, 2024", views: 1250, uploader: "Pastor James", branch: "Main Branch" },
    { id: 2, title: "Power of Prayer", type: "sermon", date: "Dec 8, 2024", views: 980, uploader: "Pastor Sarah", branch: "East Side Chapel" },
    { id: 3, title: "Holy Spirit Come", type: "music", date: "Dec 10, 2024", plays: 2100, uploader: "Worship Team", branch: "Main Branch" },
    { id: 4, title: "Mere Christianity", type: "book", date: "Nov 25, 2024", downloads: 340, uploader: "Library Admin", branch: "All" },
  ];

  const filteredMembers = branchFilter === "all" 
    ? members 
    : members.filter(member => member.branch === branchFilter);

  const filteredContent = branchFilter === "all" 
    ? content 
    : content.filter(item => item.branch === branchFilter || item.branch === "All");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Admin Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{state.currentDenomination}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {state.user?.firstName?.charAt(0)}{state.user?.lastName?.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$124,500</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                +12.4% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground mt-1">Across 4 denominations</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Content Items</CardTitle>
              <Upload className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground mt-1">Sermons, music, and resources</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10" />
          </div>
          
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map(branch => (
                <SelectItem key={branch.id} value={branch.name}>{branch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="denominations">Denominations</TabsTrigger>
            <TabsTrigger value="branches">Branches</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Membership Growth</CardTitle>
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Branch Performance</CardTitle>
                  <CardDescription>Performance comparison across branches</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={branches}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="members" fill="#0B6E4F" name="Members" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Content Engagement</CardTitle>
                  <CardDescription>Views/plays across all content</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Member Management</CardTitle>
                  <CardDescription>View and manage church members</CardDescription>
                </div>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>{member.role}</span>
                            <span>•</span>
                            <span>{member.branch}</span>
                            <span>•</span>
                            <span>Joined {member.joined}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {member.status}
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest donation and payment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, donor: "John Doe", amount: 500, date: "Dec 15, 2024", method: "Card", status: "Completed" },
                    { id: 2, donor: "Sarah Smith", amount: 250, date: "Dec 14, 2024", method: "Bank", status: "Completed" },
                    { id: 3, donor: "Mike Johnson", amount: 1000, date: "Dec 12, 2024", method: "Card", status: "Completed" },
                    { id: 4, donor: "Emma Wilson", amount: 750, date: "Dec 10, 2024", method: "Transfer", status: "Completed" },
                  ].map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-semibold">{transaction.donor}</p>
                        <p className="text-sm text-muted-foreground">Donation • {transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${transaction.amount}</p>
                        <p className="text-sm text-muted-foreground">{transaction.method}</p>
                      </div>
                      <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                        {transaction.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="denominations" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Denomination Management</CardTitle>
                  <CardDescription>Manage all denominations under your oversight</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Denomination
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {denominations.map((denom) => (
                    <Card key={denom.id} className="shadow-soft">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{denom.name}</CardTitle>
                            <CardDescription>{denom.branches} branches</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between">
                          <Button variant="outline" className="flex-1 mr-2">View</Button>
                          <Button variant="outline" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Denomination Configuration</CardTitle>
                <CardDescription>Global settings for your denomination</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="denomName">Denomination Name</Label>
                      <Input id="denomName" defaultValue={denominations.find(d => d.id === state.currentDenomination)?.name || "Redeemed Christian Church of God"} />
                    </div>
                    <div>
                      <Label>Default Theme</Label>
                      <div className="flex gap-3 mt-2">
                        <Button variant="outline" className="flex-1">Light</Button>
                        <Button className="flex-1">Dark</Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gmt">GMT</SelectItem>
                          <SelectItem value="est">EST</SelectItem>
                          <SelectItem value="pst">PST</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Default Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branches" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Branch Management</CardTitle>
                  <CardDescription>Manage all church branches</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Branch
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {branches.map((branch) => (
                    <div key={branch.id} className="p-4 rounded-lg border flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{branch.name}</h4>
                          <p className="text-sm text-muted-foreground">{branch.location}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {branch.members} members
                            </span>
                            <span className="text-xs text-muted-foreground">Pastor: {branch.pastor}</span>
                            <span className="text-xs text-muted-foreground">Est: {branch.established}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Manage</Button>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Upload and manage sermons, music, and resources</CardDescription>
                </div>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Content
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          {item.type === "sermon" && <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>}
                          {item.type === "music" && <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>}
                          {item.type === "book" && <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>}
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="capitalize">{item.type}</span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>By {item.uploader}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">Branch: {item.branch}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">
                          {item.type === "sermon" && `${item.views} views`}
                          {item.type === "music" && `${item.plays} plays`}
                          {item.type === "book" && `${item.downloads} downloads`}
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
