import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { Helmet } from "react-helmet";
import { 
  UserCircle, 
  Mail, 
  Key, 
  Loader2,
  Bell,
  Shield,
  BookUser
} from "lucide-react";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("PATCH", `/api/users/${user?.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Change password mutation
  const changePassword = useMutation({
    mutationFn: async (data: typeof passwordData) => {
      return await apiRequest("POST", "/api/auth/change-password", data);
    },
    onSuccess: () => {
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao alterar senha",
        description: "Ocorreu um erro ao alterar sua senha. Verifique se a senha atual está correta.",
        variant: "destructive",
      });
    },
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "A nova senha e a confirmação não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    changePassword.mutate(passwordData);
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "gerente":
        return "Gerente";
      case "programador":
        return "Programador";
      case "designer":
        return "Designer";
      default:
        return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "gerente":
        return <BookUser className="h-4 w-4" />;
      default:
        return <UserCircle className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Meu Perfil - Argo Mobile</title>
        <meta name="description" content="Gerencie suas informações de perfil e configurações de conta." />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Editar Perfil
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações de Perfil</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais e como elas aparecem no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleProfileSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="avatar">URL da Foto de Perfil</Label>
                      <Input
                        id="avatar"
                        value={formData.avatar || ""}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">{user?.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="flex items-center gap-1.5">
                          {getRoleIcon(user?.role || "")}
                          {getRoleName(user?.role || "")}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <UserCircle className="h-4 w-4" />
                        <span>@{user?.username}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      avatar: user?.avatar || "",
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleProfileSubmit}
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">ID de Usuário</h4>
                  <p className="text-sm text-muted-foreground">{user?.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Papel no Sistema</h4>
                  <p className="text-sm text-muted-foreground">{getRoleName(user?.role || "")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="password" className="mt-10">
          <TabsList>
            <TabsTrigger value="password">
              <Key className="h-4 w-4 mr-2" /> Mudar Senha
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" /> Notificações
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="password" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>
                  Atualize sua senha para manter sua conta segura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handlePasswordSubmit}
                  disabled={changePassword.isPending || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  {changePassword.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Alterando...
                    </>
                  ) : (
                    "Alterar Senha"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Escolha como e quando deseja receber notificações do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Esta funcionalidade estará disponível em breve. 
                  Por enquanto, você receberá notificações sobre todas as atividades relacionadas a seus projetos.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
