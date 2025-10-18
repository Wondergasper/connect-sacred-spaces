import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ArrowLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [privacy, setPrivacy] = useState("public");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle group creation
    navigate("/community");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/community" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Create Group</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Create a New Group</CardTitle>
              <CardDescription>
                Bring people together around a shared interest or purpose
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name *</Label>
                  <Input id="group-name" placeholder="e.g., Youth Worship Team" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worship">Worship Teams</SelectItem>
                      <SelectItem value="bible-study">Bible Study</SelectItem>
                      <SelectItem value="youth">Youth Ministry</SelectItem>
                      <SelectItem value="singles">Singles</SelectItem>
                      <SelectItem value="tech">Tech & Media</SelectItem>
                      <SelectItem value="choir">Choir</SelectItem>
                      <SelectItem value="outreach">Outreach</SelectItem>
                      <SelectItem value="prayer">Prayer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Tell people what your group is about..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Privacy Setting *</Label>
                  <RadioGroup value={privacy} onValueChange={setPrivacy}>
                    <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="public" id="public" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="public" className="font-semibold cursor-pointer">
                          Public
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Anyone can find and join this group instantly
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="private" id="private" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="private" className="font-semibold cursor-pointer">
                          Private
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Group is listed but requires approval to join
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="secret" id="secret" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="secret" className="font-semibold cursor-pointer">
                          Secret
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Hidden from search, members can only join via invite link
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (Optional)</Label>
                  <Input 
                    id="tags" 
                    placeholder="e.g., worship, music, youth (separate with commas)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Group Cover Image (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">Group Rules (Optional)</Label>
                  <Textarea 
                    id="rules" 
                    placeholder="Set guidelines for group members..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Group
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/community")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateGroup;
