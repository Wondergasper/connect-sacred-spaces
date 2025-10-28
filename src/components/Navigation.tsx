import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  Users, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  MessageCircle, 
  Settings, 
  BarChart3,
  Church,
  User,
  LogOut,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { authService } from "@/services/authService";

interface SidebarNavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarNavLink = ({ to, icon, children, isActive, onClick }: SidebarNavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary ${
      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
    }`}
    onClick={onClick}
  >
    {icon}
    {children}
  </Link>
);

interface UserNavProps {
  onLogout: () => void;
}

const UserNav = ({ onLogout }: UserNavProps) => {
  const { state } = useAuth();
  
  // Determine if user is admin
  const isAdmin = state.user?.role === 'admin' || state.user?.role === 'pastor';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isAdmin 
              ? "bg-gradient-to-br from-red-500 to-orange-500" 
              : "bg-gradient-to-br from-blue-500 to-purple-500"
          }`}>
            <span className="text-sm font-medium text-white">
              {state.user?.firstName?.charAt(0)}{state.user?.lastName?.charAt(0)}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="text-sm font-medium">
            {state.user?.firstName} {state.user?.lastName}
          </div>
          {isAdmin ? (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">
              ADMIN
            </span>
          ) : (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Member
            </span>
          )}
        </div>
        <div className="px-2 py-1.5 text-sm text-muted-foreground">
          {state.user?.email}
        </div>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            to={state.user?.role === 'admin' || state.user?.role === 'pastor' ? "/admin-dashboard" : "/dashboard"} 
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button onClick={onLogout} className="flex items-center gap-2 text-red-600 w-full">
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface MemberSidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
}

export const MemberSidebar = ({ activePath, onNavigate }: MemberSidebarProps) => {
  const navItems = [
    { to: "/dashboard", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
    { to: "/events", icon: <Calendar className="h-4 w-4" />, label: "Events" },
    { to: "/donations", icon: <DollarSign className="h-4 w-4" />, label: "Donations" },
    { to: "/community", icon: <Users className="h-4 w-4" />, label: "Community" },
    { to: "/media", icon: <BookOpen className="h-4 w-4" />, label: "Media" },
    { to: "/members", icon: <Users className="h-4 w-4" />, label: "Members" },
  ];

  return (
    <div className="flex h-full max-h-screen flex-col gap-2 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="flex h-14 items-center border-b border-blue-200 px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-blue-700">
          <Church className="h-6 w-6 text-blue-600" />
          <span className="">ChurchConnect</span>
          <Badge className="bg-blue-500 text-white text-xs">MEMBER</Badge>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <SidebarNavLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              isActive={activePath === item.to}
              onClick={() => onNavigate(item.to)}
            >
              {item.label}
            </SidebarNavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

interface AdminSidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
}

export const AdminSidebar = ({ activePath, onNavigate }: AdminSidebarProps) => {
  const navItems = [
    { to: "/admin-dashboard", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
    { to: "/admin/members", icon: <Users className="h-4 w-4" />, label: "Members" },
    { to: "/admin/events", icon: <Calendar className="h-4 w-4" />, label: "Events" },
    { to: "/admin/donations", icon: <DollarSign className="h-4 w-4" />, label: "Donations" },
    { to: "/admin/media", icon: <BookOpen className="h-4 w-4" />, label: "Media" },
    { to: "/admin/analytics", icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
    { to: "/admin/settings", icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ];

  return (
    <div className="flex h-full max-h-screen flex-col gap-2 bg-gradient-to-b from-gray-50 to-slate-50 border-r border-gray-200">
      <div className="flex h-14 items-center border-b border-gray-300 px-4 lg:h-[60px] lg:px-6 bg-white">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <Shield className="h-6 w-6 text-red-600" />
          <span className="">ChurchConnect</span>
          <Badge className="bg-red-500 text-white text-xs">ADMIN</Badge>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <SidebarNavLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              isActive={activePath === item.to}
              onClick={() => onNavigate(item.to)}
            >
              {item.label}
            </SidebarNavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export { UserNav };