import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Music, BookOpen, Heart, Baby, Briefcase, Globe, Church } from "lucide-react";

const Departments = () => {
  const departments = [
    { 
      id: 1, 
      name: "Worship Ministry", 
      icon: Music, 
      description: "Leading the congregation in spirit-filled worship",
      leader: "Sarah Johnson",
      members: 25,
      color: "bg-purple-100 text-purple-700"
    },
    { 
      id: 2, 
      name: "Children's Ministry", 
      icon: Baby, 
      description: "Nurturing young hearts in faith and love",
      leader: "Grace Lee",
      members: 32,
      color: "bg-pink-100 text-pink-700"
    },
    { 
      id: 3, 
      name: "Youth Ministry", 
      icon: Users, 
      description: "Empowering the next generation of believers",
      leader: "Mike Wilson",
      members: 48,
      color: "bg-blue-100 text-blue-700"
    },
    { 
      id: 4, 
      name: "Bible Study", 
      icon: BookOpen, 
      description: "Deep diving into God's Word together",
      leader: "Pastor James",
      members: 65,
      color: "bg-green-100 text-green-700"
    },
    { 
      id: 5, 
      name: "Outreach & Missions", 
      icon: Globe, 
      description: "Spreading the Gospel beyond our walls",
      leader: "David Kim",
      members: 28,
      color: "bg-orange-100 text-orange-700"
    },
    { 
      id: 6, 
      name: "Hospitality", 
      icon: Heart, 
      description: "Welcoming and serving with love",
      leader: "Mary Johnson",
      members: 18,
      color: "bg-red-100 text-red-700"
    },
    { 
      id: 7, 
      name: "Media & Tech", 
      icon: Briefcase, 
      description: "Leveraging technology for ministry",
      leader: "John Doe",
      members: 12,
      color: "bg-indigo-100 text-indigo-700"
    },
    { 
      id: 8, 
      name: "Intercessory Prayer", 
      icon: Church, 
      description: "Standing in the gap through prayer",
      leader: "Sister Ruth",
      members: 42,
      color: "bg-yellow-100 text-yellow-700"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Departments</span>
          </Link>
          <Button>Create Department</Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Church Departments</h1>
          <p className="text-muted-foreground">Connect with different ministries and serve together</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Card key={dept.id} className="shadow-soft hover:shadow-card transition-all cursor-pointer">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${dept.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Department Head</span>
                      <span className="font-medium">{dept.leader}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium">{dept.members}</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Departments;
