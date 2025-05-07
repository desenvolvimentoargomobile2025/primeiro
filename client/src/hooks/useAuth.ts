import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useCallback } from "react";
import { useLocation } from "wouter";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  const [, setLocation] = useLocation();

  // Verificar autenticação atual
  const { data: user, isLoading, isError } = useQuery<User | null>({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        
        if (response.status === 401) {
          return null;
        }
        
        if (!response.ok) {
          throw new Error('Erro ao carregar usuário');
        }
        
        return await response.json();
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Login
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/auth/me'], data);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    }
  });

  // Logout
  const logout = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/auth/logout', {});
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/auth/me'], null);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      setLocation('/');
    }
  });

  // Verificar se o usuário está autenticado
  const isAuthenticated = !!user;

  // Verificar se o usuário tem uma determinada função
  const hasRole = useCallback((role: string) => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  // Função para redirecionar para o login com retorno
  const redirectToLogin = useCallback((returnUrl: string = '') => {
    const redirectUrl = returnUrl || window.location.pathname;
    setLocation(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
  }, [setLocation]);

  return {
    user,
    isLoading,
    isError,
    isAuthenticated,
    hasRole,
    login,
    logout,
    redirectToLogin
  };
}
