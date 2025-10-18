import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { HelpCircle, Search, Book, Video, MessageCircle } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I join a church on ChurchConnect?",
      answer: "After creating your account, you can browse available churches in the Explore section. Select your denomination and branch, then request to join. The church admin will approve your membership."
    },
    {
      question: "How can I donate to my church?",
      answer: "Navigate to the Donations page from your dashboard. Select a donation category (Tithes, Offerings, Building Fund, etc.), enter the amount, and complete the secure payment through Paystack or Flutterwave."
    },
    {
      question: "Can I be a member of multiple churches?",
      answer: "Yes! You can join multiple churches and switch between them using the church switcher in the top navigation. Each church will have its own announcements, events, and community."
    },
    {
      question: "How do community groups work?",
      answer: "Community groups are interest-based spaces where believers from any church can connect. You can join public groups instantly or request to join private groups. Create your own group to gather like-minded believers."
    },
    {
      question: "How do I access sermons and media?",
      answer: "Visit the Media Library to browse sermons, worship music, and books. You can stream content directly or download it for offline access. Content is available from your church and the global community."
    },
    {
      question: "What if I forget my password?",
      answer: "On the sign-in page, click 'Forgot password?' and follow the instructions. You'll receive a reset link via email or SMS depending on your preferred contact method."
    },
    {
      question: "How do I enable notifications?",
      answer: "Go to Profile > Settings > Notifications. You can customize which notifications you receive via email, SMS, or push notifications for events, messages, and community updates."
    },
    {
      question: "Can I use ChurchConnect offline?",
      answer: "Yes! ChurchConnect works offline with limited functionality. Downloaded sermons, saved posts, and previously viewed content will be available. Actions performed offline will sync when you reconnect."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Help & Support</span>
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search for help..." className="pl-12 h-12" />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-soft hover:shadow-card transition-all cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">Browse our comprehensive guides</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-card transition-all cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">Watch step-by-step walkthroughs</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-card transition-all cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 text-center">
          <Card className="shadow-card bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">Our support team is here for you</p>
              <div className="flex gap-4 justify-center">
                <Link to="/about">
                  <Button>Contact Us</Button>
                </Link>
                <Button variant="outline">Live Chat</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Help;
