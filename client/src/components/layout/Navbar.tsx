import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import {
  Menu,
  X,
  UserCircle,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout.mutate();
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="relative z-10 bg-background border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-xl text-white">AM</span>
          </div>
          <Link href="/">
            <span className="font-bold text-xl text-white cursor-pointer">Argo Mobile</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <span className={`${isActive('/') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Início
            </span>
          </Link>
          <Link href="/servicos">
            <span className={`${isActive('/servicos') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Serviços
            </span>
          </Link>
          <Link href="/portfolio">
            <span className={`${isActive('/portfolio') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Portfólio
            </span>
          </Link>
          <Link href="/sobre">
            <span className={`${isActive('/sobre') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Sobre
            </span>
          </Link>
          <Link href="/contato">
            <span className={`${isActive('/contato') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Contato
            </span>
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {getInitials(user?.name || '')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <button className="w-full flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/perfil">
                    <button className="w-full flex items-center">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Meu Perfil</span>
                    </button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary-light text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Navigation Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground text-2xl"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background py-4 flex flex-col items-center space-y-4 shadow-lg z-50">
          <Link href="/" onClick={closeMobileMenu}>
            <span className={`${isActive('/') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Início
            </span>
          </Link>
          <Link href="/servicos" onClick={closeMobileMenu}>
            <span className={`${isActive('/servicos') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Serviços
            </span>
          </Link>
          <Link href="/portfolio" onClick={closeMobileMenu}>
            <span className={`${isActive('/portfolio') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Portfólio
            </span>
          </Link>
          <Link href="/sobre" onClick={closeMobileMenu}>
            <span className={`${isActive('/sobre') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Sobre
            </span>
          </Link>
          <Link href="/contato" onClick={closeMobileMenu}>
            <span className={`${isActive('/contato') ? 'text-primary' : 'text-foreground'} hover:text-primary-light transition-colors duration-300`}>
              Contato
            </span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" onClick={closeMobileMenu}>
                <div className="flex items-center text-foreground hover:text-primary-light">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link href="/dashboard/perfil" onClick={closeMobileMenu}>
                <div className="flex items-center text-foreground hover:text-primary-light">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </div>
              </Link>
              <Button 
                variant="ghost" 
                className="flex items-center text-foreground hover:text-primary-light"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={closeMobileMenu}>
              <Button className="bg-primary hover:bg-primary-light text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
