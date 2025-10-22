import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Church, Users, BookOpen, Music, Heart, MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-church.jpg";
import communityNetwork from "@/assets/community-network.png";
import mediaLibrary from "@/assets/media-library.png";

const Index = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users based on their role
  useEffect(() => {
    if (state.isAuthenticated) {
      if (state.user?.role === 'admin' || state.user?.role === 'pastor') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [state.isAuthenticated, state.user, navigate]);

  const features = [
    {
      icon: Church,
      title: "Unite Your Church",
      description: "Manage members, events, and announcements in one beautiful platform designed for faith communities.",
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect believers across churches through groups, discussions, and shared faith experiences.",
    },
    {
      icon: BookOpen,
      title: "Share Sermons",
      description: "Stream, download, and discover powerful messages from pastors across your denomination.",
    },
    {
      icon: Music,
      title: "Worship Together",
      description: "Access worship songs, albums, and playlists that inspire your spiritual journey.",
    },
    {
      icon: Calendar,
      title: "Manage Events",
      description: "Coordinate church activities, track RSVPs, and keep your congregation engaged.",
    },
    {
      icon: Heart,
      title: "Give Securely",
      description: "Process donations with confidence using integrated, secure payment solutions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Church className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">ChurchConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background -z-10" />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Unite Your Faith Community
                <span className="block text-primary mt-2">Digitally</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect churches, share sermons, build community. A complete digital ecosystem for denominations to thrive together in faith.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button size="lg" className="gap-2">
                    Join Your Church <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                  <span className="font-medium">10,000+ members</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50" />
              <img
                src={heroImage}
                alt="Church community worshipping together"
                className="relative rounded-2xl shadow-elevated w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything Your Church Needs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to strengthen your faith community and amplify your ministry impact
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-elevated transition-all duration-200 border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in">
              <img
                src={communityNetwork}
                alt="Connected community network"
                className="rounded-2xl shadow-card w-full"
              />
            </div>
            <div className="order-1 lg:order-2 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Community First</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Connect Beyond Church Walls
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Create and join groups based on shared interests — from worship teams to Bible study circles. 
                Foster meaningful connections across your entire denomination.
              </p>
              <ul className="space-y-4">
                {["Cross-church groups and discussions", "Real-time messaging and prayer requests", "Event coordination and RSVPs"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Media Library Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full mb-6">
                <Music className="w-4 h-4" />
                <span className="text-sm font-medium">Rich Media</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Spiritual Library, Everywhere
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Access thousands of sermons, worship songs, and Christian resources. 
                Stream or download for offline access during your daily devotion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button size="lg" variant="secondary">
                    Explore Media
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-fade-in">
              <img
                src={mediaLibrary}
                alt="Digital media library"
                className="rounded-2xl shadow-card w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-95 -z-10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Church Community?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of believers already connected. Start building your digital faith community today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Church className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">ChurchConnect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering churches to thrive in the digital age.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ChurchConnect. Built with faith and purpose.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
