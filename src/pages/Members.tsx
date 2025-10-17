import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Mail, Phone, MoreVertical, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Members = () => {
  const members = [
    { id: 1, name: "John Doe", role: "Pastor", department: "Leadership", phone: "+1234567890", email: "john@church.com", status: "active" },
    { id: 2, name: "Sarah Johnson", role: "Worship Leader", department: "Music", phone: "+1234567891", email: "sarah@church.com", status: "active" },
    { id: 3, name: "Michael Brown", role: "Youth Leader", department: "Youth", phone: "+1234567892", email: "michael@church.com", status: "active" },
    { id: 4, name: "Emily Davis", role: "Member", department: "General", phone: "+1234567893", email: "emily@church.com", status: "active" },
    { id: 5, name: "David Wilson", role: "Deacon", department: "Leadership", phone: "+1234567894", email: "david@church.com", status: "active" },
    { id: 6, name: "Lisa Anderson", role: "Sunday School Teacher", department: "Education", phone: "+1234567895", email: "lisa@church.com", status: "active" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Members Directory</span>
          </Link>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Member
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search members..." className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="shadow-soft hover:shadow-card transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary">{member.department}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Members;
