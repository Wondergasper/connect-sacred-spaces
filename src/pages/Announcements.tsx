import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Megaphone, Calendar, Pin, Plus } from "lucide-react";

const Announcements = () => {
  const announcements = [
    { 
      id: 1, 
      title: "Sunday Service Schedule Change", 
      content: "Starting next week, our Sunday service will begin at 9:00 AM instead of 10:00 AM. Please adjust your schedule accordingly.",
      date: "Dec 18, 2024",
      author: "Pastor James",
      priority: "high",
      pinned: true
    },
    { 
      id: 2, 
      title: "Christmas Outreach Program", 
      content: "Join us on December 24th for our annual Christmas outreach. We'll be distributing food and gifts to families in need. Volunteers needed!",
      date: "Dec 15, 2024",
      author: "Sister Sarah",
      priority: "medium",
      pinned: true
    },
    { 
      id: 3, 
      title: "New Bible Study Group", 
      content: "A new Bible study group for young adults (ages 18-30) will start every Thursday at 6:00 PM. First meeting is January 2nd.",
      date: "Dec 12, 2024",
      author: "Youth Pastor Mike",
      priority: "normal",
      pinned: false
    },
    { 
      id: 4, 
      title: "Building Fund Update", 
      content: "We've reached 75% of our building fund goal! Thank you for your generous contributions. Let's finish strong this year.",
      date: "Dec 10, 2024",
      author: "Finance Committee",
      priority: "normal",
      pinned: false
    },
    { 
      id: 5, 
      title: "Church Directory Photos", 
      content: "Updated church directory photos will be taken after service on December 22nd. Please wear your best attire!",
      date: "Dec 8, 2024",
      author: "Admin Office",
      priority: "normal",
      pinned: false
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Announcements</span>
          </Link>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </Button>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`shadow-soft hover:shadow-card transition-all ${announcement.pinned ? 'border-l-4 border-l-primary' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {announcement.pinned && (
                        <Pin className="w-4 h-4 text-primary" />
                      )}
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {announcement.date}
                      </span>
                      <span>•</span>
                      <span>By {announcement.author}</span>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(announcement.priority)} variant="outline">
                    {announcement.priority === 'high' ? 'Urgent' : announcement.priority === 'medium' ? 'Important' : 'Info'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Announcements;
