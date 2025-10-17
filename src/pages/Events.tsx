import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "December 17, 2024",
      time: "9:00 AM - 11:30 AM",
      location: "Main Sanctuary",
      attendees: 450,
      rsvp: 380,
      category: "Worship"
    },
    {
      id: 2,
      title: "Youth Bible Study",
      date: "December 20, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Youth Center",
      attendees: 85,
      rsvp: 72,
      category: "Study"
    },
    {
      id: 3,
      title: "Community Outreach",
      date: "December 23, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "City Center",
      attendees: 120,
      rsvp: 95,
      category: "Outreach"
    },
    {
      id: 4,
      title: "Christmas Eve Service",
      date: "December 24, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Main Sanctuary",
      attendees: 600,
      rsvp: 520,
      category: "Special"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Events</span>
          </Link>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-muted-foreground">Stay connected with your church community</p>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id} className="shadow-soft hover:shadow-card transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.rsvp} / {event.attendees} attending</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button>RSVP</Button>
                    <Button variant="outline">Share</Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events;
