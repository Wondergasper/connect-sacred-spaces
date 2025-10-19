import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Hash, Globe, Lock, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: "worship", name: "Worship & Music" },
    { id: "study", name: "Bible Study" },
    { id: "youth", name: "Youth" },
    { id: "prayer", name: "Prayer" },
    { id: "outreach", name: "Outreach & Missions" },
    { id: "tech", name: "Technology" },
    { id: "education", name: "Education" },
    { id: "other", name: "Other" },
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to group details
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/community" className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Create Group</span>
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Start a New Community Group</CardTitle>
            <CardDescription>
              Connect with fellow believers who share your interests and passions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="groupName"
                    placeholder="e.g., Worship Team, Youth Bible Study, Tech in Church"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your group's purpose, activities, and goals..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacy">Privacy</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={privacy === "public" ? "default" : "outline"}
                      onClick={() => setPrivacy("public")}
                      className="flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Public
                    </Button>
                    <Button
                      type="button"
                      variant={privacy === "private" ? "default" : "outline"}
                      onClick={() => setPrivacy("private")}
                      className="flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Private
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <p className="text-sm text-muted-foreground">
                  Add tags to help others discover your group
                </p>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a tag (e.g., #prayer, #worship, #youth)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Group Icon</Label>
                <p className="text-sm text-muted-foreground">
                  Choose an icon that represents your group
                </p>
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {["📖", "🎵", "🙌", "🙏", "💻", "📚", "🎤", "💡"].map((icon) => (
                    <Button
                      key={icon}
                      variant="outline"
                      size="lg"
                      className="text-2xl h-16 flex items-center justify-center"
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Link to="/community">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating Group..." : "Create Group"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateGroup;