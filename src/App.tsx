import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Community from "./pages/Community";
import MediaLibrary from "./pages/MediaLibrary";
import Events from "./pages/Events";
import Members from "./pages/Members";
import Donations from "./pages/Donations";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import GroupDetail from "./pages/GroupDetail";
import Announcements from "./pages/Announcements";
import Departments from "./pages/Departments";
import Analytics from "./pages/Analytics";
import Chat from "./pages/Chat";
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
          {/* Public Routes - Accessible to all users */}
          <Route path="/" element={
            <ProtectedRoute requireAuth={false}>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/explore" element={
            <ProtectedRoute requireAuth={false}>
              <Explore />
            </ProtectedRoute>
          } />
          <Route path="/auth" element={
            <ProtectedRoute requireAuth={false}>
              <Auth />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute requireAuth={false}>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute requireAuth={false}>
              <Contact />
            </ProtectedRoute>
          } />

          {/* Private Routes - Require authentication */}
          <Route path="/dashboard" element={
            <ProtectedRoute pageType="memberDashboard">
              <MemberDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute pageType="adminDashboard">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
          <Route path="/community/groups/:id" element={
            <ProtectedRoute>
              <GroupDetail />
            </ProtectedRoute>
          } />
          <Route path="/community/create-group" element={
            <ProtectedRoute>
              <CreateGroup />
            </ProtectedRoute>
          } />
          <Route path="/community/people" element={
            <ProtectedRoute>
              <People />
            </ProtectedRoute>
          } />
          <Route path="/media" element={
            <ProtectedRoute>
              <MediaLibrary />
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute pageType="events">
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/members" element={
            <ProtectedRoute pageType="members">
              <Members />
            </ProtectedRoute>
          } />
          <Route path="/donations" element={
            <ProtectedRoute pageType="donations">
              <Donations />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          } />
          <Route path="/announcements" element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          } />
          <Route path="/departments" element={
            <ProtectedRoute pageType="departments">
              <Departments />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute pageType="analytics">
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
