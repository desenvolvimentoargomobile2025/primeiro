import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/auth/AuthForm";
import { Helmet } from "react-helmet";

const LoginPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Get the redirect param from the URL
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get("redirect") || "/dashboard";

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation(redirectUrl);
    }
  }, [isAuthenticated, isLoading, redirectUrl, setLocation]);

  // If not authenticated, show the login form
  return (
    <>
      <Helmet>
        <title>Login - Argo Mobile</title>
        <meta name="description" content="Acesse o sistema de gerenciamento de projetos da Argo Mobile." />
      </Helmet>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        </div>
        <div className="relative z-10">
          <AuthForm type="login" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
