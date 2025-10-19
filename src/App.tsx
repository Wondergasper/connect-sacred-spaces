import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import MediaLibrary from "./pages/MediaLibrary";
import Events from "./pages/Events";
import Members from "./pages/Members";
import Donations from "./pages/Donations";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";
import Help from "./pages/Help";
import GroupDetail from "./pages/GroupDetail";
import Announcements from "./pages/Announcements";
import Departments from "./pages/Departments";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import CreateGroup from "./pages/CreateGroup";
import People from "./pages/People";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/groups/:id" element={<GroupDetail />} />
          <Route path="/community/create-group" element={<CreateGroup />} />
          <Route path="/community/people" element={<People />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/events" element={<Events />} />
          <Route path="/members" element={<Members />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/help" element={<Help />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
