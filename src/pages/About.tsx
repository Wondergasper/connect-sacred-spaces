import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Church, Mail, Phone, MapPin, Heart, Users, Globe } from "lucide-react";

const About = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Church className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">ChurchConnect</span>
          </Link>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="container py-16">
        <section className="max-w-4xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About ChurchConnect</h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Connecting faith communities worldwide through digital innovation and spiritual fellowship.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-soft animate-slide-up">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                Empowering churches to build stronger communities through modern technology and meaningful connections.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Community</h3>
              <p className="text-muted-foreground">
                Thousands of believers across multiple denominations sharing faith, worship, and fellowship.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                A unified global platform where every church can thrive and every believer can grow in faith.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} required />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>

              <div className="mt-8 pt-8 border-t space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <span>support@churchconnect.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>123 Faith Street, Holy City, HC 12345</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;
