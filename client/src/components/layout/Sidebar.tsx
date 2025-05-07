import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout.mutate();
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
      exact: true
    },
    {
      title: "Projetos",
      icon: <FolderKanban className="h-5 w-5" />,
      href: "/dashboard/projetos",
    },
    {
      title: "Tarefas",
      icon: <ListTodo className="h-5 w-5" />,
      href: "/dashboard/tarefas",
    },
    {
      title: "Equipe",
      icon: <Users className="h-5 w-5" />,
      href: "/dashboard/equipe",
    },
    {
      title: "Meu Perfil",
      icon: <UserCircle className="h-5 w-5" />,
      href: "/dashboard/perfil",
    }
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobile}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 bg-sidebar border-r border-sidebar-border h-screen z-50 transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "left-0" : "-left-full lg:left-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={cn(
            "flex items-center h-16 px-4",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed && (
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="font-bold text-sm text-white">AM</span>
                  </div>
                  <span className="font-bold text-sidebar-foreground">Argo Mobile</span>
                </div>
              </Link>
            )}
            {collapsed && (
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-sm text-white">AM</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:flex hidden"
              onClick={toggleSidebar}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {sidebarItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={closeMobile}
                >
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isActive(item.href) && (!item.exact || location === item.href)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/10",
                      collapsed && "justify-center"
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Profile & Logout */}
          <div className={cn(
            "border-t border-sidebar-border p-4",
            collapsed ? "flex flex-col items-center" : ""
          )}>
            {!collapsed ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 border border-sidebar-border">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {getInitials(user?.name || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
                    <p className="text-xs text-sidebar-foreground/70">{user?.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5 text-sidebar-foreground" />
                </Button>
              </div>
            ) : (
              <>
                <Avatar className="h-10 w-10 border border-sidebar-border">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-white">
                    {getInitials(user?.name || '')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-4"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5 text-sidebar-foreground" />
                </Button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
