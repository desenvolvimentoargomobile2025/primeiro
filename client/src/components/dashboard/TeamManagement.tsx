import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";
import { 
  Loader2, 
  Search, 
  Users,
  Brush,
  Code,
  ClipboardList,
  ShieldCheck,
  User,
  Mail,
  ExternalLink,
} from "lucide-react";

const TeamManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['/api/users'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter users by role for each tab
  const designers = users.filter((u: any) => u.role === "designer");
  const developers = users.filter((u: any) => u.role === "programador");
  const managers = users.filter((u: any) => u.role === "gerente");
  const administrators = users.filter((u: any) => u.role === "admin");

  // Filter users based on search query
  const filterUsers = (usersList: any[]) => {
    if (!searchQuery) return usersList;
    return usersList.filter((u: any) => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "designer":
        return <Brush className="h-4 w-4" />;
      case "programador":
        return <Code className="h-4 w-4" />;
      case "gerente":
        return <ClipboardList className="h-4 w-4" />;
      case "admin":
        return <ShieldCheck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "designer":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "programador":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "gerente":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "admin":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "designer":
        return "Designer";
      case "programador":
        return "Programador";
      case "gerente":
        return "Gerente";
      case "admin":
        return "Administrador";
      default:
        return role;
    }
  };

  const UserCard = ({ user }: { user: any }) => (
    <Card key={user.id}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <h4 className="text-lg font-medium">{user.name}</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                <span className="flex items-center gap-1">
                  {getRoleIcon(user.role)}
                  {getRoleDisplayName(user.role)}
                </span>
              </Badge>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-sm flex items-center gap-1 text-muted-foreground">
                <User className="h-3.5 w-3.5" /> @{user.username}
              </span>
              <span className="text-sm flex items-center gap-1 text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            <ExternalLink className="h-4 w-4 mr-1" /> Ver Perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Equipe</h2>
          <p className="text-muted-foreground">
            Gerencie membros da equipe e seus papéis na empresa.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar membros..."
              className="pl-9 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              <Users className="h-4 w-4 mr-2" /> Todos ({users.length})
            </TabsTrigger>
            <TabsTrigger value="designers">
              <Brush className="h-4 w-4 mr-2" /> Designers ({designers.length})
            </TabsTrigger>
            <TabsTrigger value="developers">
              <Code className="h-4 w-4 mr-2" /> Programadores ({developers.length})
            </TabsTrigger>
            <TabsTrigger value="managers">
              <ClipboardList className="h-4 w-4 mr-2" /> Gerentes ({managers.length})
            </TabsTrigger>
            {user?.role === "admin" && (
              <TabsTrigger value="admins">
                <ShieldCheck className="h-4 w-4 mr-2" /> Administradores ({administrators.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {filterUsers(users).length === 0 ? (
              <div className="text-center py-10">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Nenhum membro encontrado</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `Não encontramos membros correspondentes a "${searchQuery}".`
                    : "Não há membros na equipe."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterUsers(users).map((u: any) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="designers" className="space-y-4 mt-6">
            {filterUsers(designers).length === 0 ? (
              <div className="text-center py-10">
                <Brush className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Nenhum designer encontrado</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `Não encontramos designers correspondentes a "${searchQuery}".`
                    : "Não há designers na equipe."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterUsers(designers).map((u: any) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="developers" className="space-y-4 mt-6">
            {filterUsers(developers).length === 0 ? (
              <div className="text-center py-10">
                <Code className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Nenhum programador encontrado</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `Não encontramos programadores correspondentes a "${searchQuery}".`
                    : "Não há programadores na equipe."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterUsers(developers).map((u: any) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="managers" className="space-y-4 mt-6">
            {filterUsers(managers).length === 0 ? (
              <div className="text-center py-10">
                <ClipboardList className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Nenhum gerente encontrado</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `Não encontramos gerentes correspondentes a "${searchQuery}".`
                    : "Não há gerentes na equipe."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterUsers(managers).map((u: any) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            )}
          </TabsContent>

          {user?.role === "admin" && (
            <TabsContent value="admins" className="space-y-4 mt-6">
              {filterUsers(administrators).length === 0 ? (
                <div className="text-center py-10">
                  <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Nenhum administrador encontrado</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `Não encontramos administradores correspondentes a "${searchQuery}".`
                      : "Não há administradores na equipe."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filterUsers(administrators).map((u: any) => (
                    <UserCard key={u.id} user={u} />
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default TeamManagement;
