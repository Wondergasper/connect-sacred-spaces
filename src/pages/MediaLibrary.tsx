import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Download, Search, BookOpen, Music, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const MediaLibrary = () => {
  const sermons = [
    { id: 1, title: "Walking in Faith", preacher: "Pastor James", duration: "45 min", date: "Dec 15, 2024" },
    { id: 2, title: "Power of Prayer", preacher: "Pastor Sarah", duration: "38 min", date: "Dec 8, 2024" },
    { id: 3, title: "Grace and Mercy", preacher: "Rev. Michael", duration: "52 min", date: "Dec 1, 2024" },
  ];

  const music = [
    { id: 1, title: "Holy Spirit Come", artist: "Worship Collective", duration: "4:32", plays: "2.3K" },
    { id: 2, title: "Great Are You Lord", artist: "Church Choir", duration: "5:18", plays: "1.8K" },
    { id: 3, title: "Oceans (Where Feet May Fail)", artist: "Youth Band", duration: "8:45", plays: "3.1K" },
  ];

  const books = [
    { id: 1, title: "Mere Christianity", author: "C.S. Lewis", pages: 227, downloads: "5.2K" },
    { id: 2, title: "The Purpose Driven Life", author: "Rick Warren", pages: 336, downloads: "4.8K" },
    { id: 3, title: "Knowing God", author: "J.I. Packer", pages: 320, downloads: "3.9K" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Media Library</span>
          </Link>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search media..." className="pl-10" />
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="sermons" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="sermons">Sermons</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
          </TabsList>

          <TabsContent value="sermons" className="space-y-6">
            <div className="grid gap-4">
              {sermons.map((sermon) => (
                <Card key={sermon.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{sermon.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span>{sermon.preacher}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {sermon.duration}
                          </span>
                          <span>•</span>
                          <span>{sermon.date}</span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2">
                          <Play className="w-4 h-4" />
                          Play
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <div className="grid gap-4">
              {music.map((song) => (
                <Card key={song.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Music className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{song.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {song.artist} • {song.duration} • {song.plays} plays
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <Card key={book.id} className="shadow-soft hover:shadow-card transition-all">
                  <CardHeader>
                    <div className="w-full h-48 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                      <BookOpen className="w-16 h-16 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>
                      by {book.author} • {book.pages} pages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">Read</Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      {book.downloads} downloads
                    </p>
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

export default MediaLibrary;
