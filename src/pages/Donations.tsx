import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Download, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Donations = () => {
  const donationHistory = [
    { id: 1, date: "Dec 15, 2024", amount: 100, category: "Tithe", method: "Card" },
    { id: 2, date: "Dec 8, 2024", amount: 50, category: "Building Fund", method: "Bank" },
    { id: 3, date: "Dec 1, 2024", amount: 100, category: "Tithe", method: "Card" },
  ];

  const categories = [
    { name: "Tithe", description: "Your regular giving", goal: 50000, raised: 38500 },
    { name: "Building Fund", description: "New sanctuary construction", goal: 200000, raised: 145000 },
    { name: "Missions", description: "Global outreach programs", goal: 30000, raised: 22000 },
    { name: "Youth Ministry", description: "Supporting our youth", goal: 15000, raised: 12500 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Donations</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="give" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="give">Give Now</TabsTrigger>
            <TabsTrigger value="history">My History</TabsTrigger>
          </TabsList>

          <TabsContent value="give" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Make a Donation</CardTitle>
                    <CardDescription>Support your church ministry</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Category</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Tithe", "Building Fund", "Missions", "Other"].map((cat) => (
                          <Button key={cat} variant="outline" className="justify-start">
                            {cat}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="amount" type="number" placeholder="0.00" className="pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="card" placeholder="1234 5678 9012 3456" className="pl-10" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Complete Donation
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Impact This Year</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-3xl font-bold text-primary">$1,250</p>
                      <p className="text-sm text-muted-foreground">Total given in 2024</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <TrendingUp className="w-4 h-4" />
                      <span>+18% from last year</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Give</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {["$50", "$100", "$250", "$500"].map((amount) => (
                      <Button key={amount} variant="outline" className="w-full">
                        {amount}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Donation Categories</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <Card key={cat.name} className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">{cat.name}</CardTitle>
                      <CardDescription>{cat.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            ${cat.raised.toLocaleString()} / ${cat.goal.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(cat.raised / cat.goal) * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Donation History</h2>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
            </div>

            <div className="grid gap-4">
              {donationHistory.map((donation) => (
                <Card key={donation.id} className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">${donation.amount}</p>
                          <p className="text-sm text-muted-foreground">
                            {donation.category} • {donation.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{donation.date}</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Donations;
