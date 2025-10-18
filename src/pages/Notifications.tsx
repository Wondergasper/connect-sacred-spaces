import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Bell, Calendar, Heart, MessageCircle, Users, DollarSign, Check } from "lucide-react";

const Notifications = () => {
  const notifications = [
    { id: 1, type: "event", icon: Calendar, title: "Upcoming: Sunday Service", message: "Tomorrow at 9:00 AM", time: "2h ago", read: false },
    { id: 2, type: "community", icon: Heart, title: "Sarah liked your post", message: "\"Walking in faith together\"", time: "5h ago", read: false },
    { id: 3, type: "message", icon: MessageCircle, title: "New message from Pastor James", message: "Thank you for your dedication...", time: "1d ago", read: true },
    { id: 4, type: "member", icon: Users, title: "New member joined", message: "John Doe joined your church", time: "2d ago", read: true },
    { id: 5, type: "donation", icon: DollarSign, title: "Donation received", message: "Thank you for your $50 offering", time: "3d ago", read: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Notifications</span>
          </Link>
          <Button variant="ghost" size="sm">
            <Check className="w-4 h-4 mr-2" />
            Mark all read
          </Button>
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <Card key={notif.id} className={`shadow-soft hover:shadow-card transition-all cursor-pointer ${!notif.read ? 'border-l-4 border-l-primary' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${!notif.read ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Icon className={`w-6 h-6 ${!notif.read ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${!notif.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notif.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.read).map((notif) => {
              const Icon = notif.icon;
              return (
                <Card key={notif.id} className="shadow-soft hover:shadow-card transition-all cursor-pointer border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{notif.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="events">
            <p className="text-center text-muted-foreground py-8">Event notifications will appear here</p>
          </TabsContent>

          <TabsContent value="community">
            <p className="text-center text-muted-foreground py-8">Community notifications will appear here</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Notifications;
