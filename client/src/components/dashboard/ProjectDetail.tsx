import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import {
  Calendar,
  Clock,
  Edit,
  Trash2,
  Users,
  UserPlus,
  AlertTriangle,
  Loader2,
  ListTodo,
  PlusCircle,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TaskForm from "./TaskForm";
import { formatDate, formatDateTime, projectStatusLabels, projectStatusColors, getInitials } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ProjectDetailProps {
  projectId: string;
}

const addMemberSchema = z.object({
  userId: z.string().min(1, { message: "Por favor, selecione um usuário" }),
  role: z.string().min(1, { message: "Por favor, selecione uma função" }),
});

type AddMemberFormValues = z.infer<typeof addMemberSchema>;

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const [, setLocation] = useLocation();
  const id = parseInt(projectId);
  const { toast } = useToast();
  const { user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  // Fetch project details
  const { data: project, isLoading, isError } = useQuery({
    queryKey: [`/api/projects/${id}`],
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  // Fetch project members
  const { data: members = [] } = useQuery({
    queryKey: [`/api/projects/${id}/members`],
    enabled: !!project,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  // Fetch project tasks
  const { data: tasks = [] } = useQuery({
    queryKey: [`/api/projects/${id}/tasks`],
    enabled: !!project,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  // Fetch available users for adding to project
  const { data: users = [] } = useQuery({
    queryKey: ['/api/users'],
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  // Form for adding members
  const addMemberForm = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      userId: "",
      role: "designer",
    },
  });

  // Delete project mutation
  const deleteProject = useMutation({
    mutationFn: async () => {
      return await apiRequest("DELETE", `/api/projects/${id}`, undefined);
    },
    onSuccess: () => {
      toast({
        title: "Projeto excluído com sucesso!",
        description: "O projeto foi removido permanentemente.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setLocation("/dashboard/projetos");
    },
    onError: () => {
      toast({
        title: "Erro ao excluir projeto",
        description: "Ocorreu um erro ao excluir o projeto. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Add member mutation
  const addMember = useMutation({
    mutationFn: async (values: AddMemberFormValues) => {
      return await apiRequest("POST", `/api/projects/${id}/members`, {
        userId: parseInt(values.userId),
        role: values.role,
      });
    },
    onSuccess: () => {
      toast({
        title: "Membro adicionado com sucesso!",
        description: "O novo membro foi adicionado ao projeto.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}/members`] });
      setIsAddMemberDialogOpen(false);
      addMemberForm.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar membro",
        description: "Ocorreu um erro ao adicionar o membro. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Remove member mutation
  const removeMember = useMutation({
    mutationFn: async (memberId: number) => {
      return await apiRequest("DELETE", `/api/projects/${id}/members/${memberId}`, undefined);
    },
    onSuccess: () => {
      toast({
        title: "Membro removido com sucesso!",
        description: "O membro foi removido do projeto.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}/members`] });
    },
    onError: () => {
      toast({
        title: "Erro ao remover membro",
        description: "Ocorreu um erro ao remover o membro. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Handle member add submission
  function onAddMemberSubmit(data: AddMemberFormValues) {
    addMember.mutate(data);
  }

  // Filter users that are not already members
  const availableUsers = React.useMemo(() => {
    const memberIds = members.map((m: any) => m.userId);
    return users.filter((u: any) => !memberIds.includes(u.id));
  }, [users, members]);

  // Check if user is project admin
  const isProjectAdmin = project && (user?.role === "admin" || project.createdById === user?.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium mb-2">Projeto não encontrado</h3>
        <p className="text-muted-foreground mb-6">Não foi possível carregar os detalhes do projeto.</p>
        <Button 
          variant="outline" 
          onClick={() => setLocation("/dashboard/projetos")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Projetos
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLocation("/dashboard/projetos")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
          <div>
            <h2 className="text-3xl font-bold">{project.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                className={`${projectStatusColors[project.status as keyof typeof projectStatusColors]} text-white`}
              >
                {projectStatusLabels[project.status as keyof typeof projectStatusLabels]}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Criado em {formatDate(project.startDate)}
              </span>
            </div>
          </div>
        </div>
        
        {isProjectAdmin && (
          <div className="flex gap-2">
            <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
              <Edit className="mr-2 h-4 w-4" /> Editar
            </Button>
            <Button 
              variant="outline" 
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{project.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Plataforma</h4>
                  <p>{project.platform}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Gênero</h4>
                  <p>{project.genre}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Início</h4>
                  <p>{formatDate(project.startDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Término</h4>
                  <p>{project.endDate ? formatDate(project.endDate) : "Não definida"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks">Tarefas</TabsTrigger>
              <TabsTrigger value="members">Membros</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Tarefas do Projeto</h3>
                <Button onClick={() => setIsTaskFormOpen(true)} className="bg-primary hover:bg-primary-light">
                  <PlusCircle className="mr-2 h-4 w-4" /> Nova Tarefa
                </Button>
              </div>

              {tasks.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-10">
                    <ListTodo className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Nenhuma tarefa encontrada</h3>
                    <p className="text-muted-foreground mb-4">
                      Este projeto ainda não possui tarefas. Crie a primeira tarefa!
                    </p>
                    <Button 
                      onClick={() => setIsTaskFormOpen(true)}
                      className="bg-primary hover:bg-primary-light"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Criar Tarefa
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task: any) => (
                    <Card key={task.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <Badge
                            variant="outline"
                            className={task.status === "concluída" 
                              ? "bg-green-500/10 text-green-500 border-green-500/20" 
                              : task.status === "em progresso" 
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                            }
                          >
                            {task.status === "concluída" 
                              ? "Concluída" 
                              : task.status === "em progresso" 
                              ? "Em Progresso"
                              : "Pendente"
                            }
                          </Badge>
                        </div>
                        <CardDescription>{task.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Prioridade: </span>
                            <Badge
                              variant="outline"
                              className={task.priority === "alta" 
                                ? "bg-red-500/10 text-red-500 border-red-500/20 ml-1" 
                                : task.priority === "média" 
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20 ml-1"
                                : "bg-blue-500/10 text-blue-500 border-blue-500/20 ml-1"
                              }
                            >
                              {task.priority === "alta" ? "Alta" : task.priority === "média" ? "Média" : "Baixa"}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Prazo: </span>
                            <span>{task.dueDate ? formatDate(task.dueDate) : "Não definido"}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-border pt-4">
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Atribuído a:</span>
                            {task.assignedToId ? (
                              <div className="flex items-center gap-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {getInitials(members.find((m: any) => m.userId === task.assignedToId)?.user?.name || "")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">
                                  {members.find((m: any) => m.userId === task.assignedToId)?.user?.name || ""}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm">Não atribuído</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {task.status !== "concluída" && (
                              <Button size="sm" variant="outline" className="h-8 border-green-500 text-green-500 hover:bg-green-500/10">
                                <CheckCircle className="h-3.5 w-3.5 mr-1" /> Concluir
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="h-8">
                              <Edit className="h-3.5 w-3.5 mr-1" /> Editar
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="members" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Membros do Projeto</h3>
                {isProjectAdmin && (
                  <Button 
                    onClick={() => setIsAddMemberDialogOpen(true)}
                    className="bg-primary hover:bg-primary-light"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Adicionar Membro
                  </Button>
                )}
              </div>

              {members.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-10">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Nenhum membro encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Este projeto ainda não possui membros além do criador.
                    </p>
                    {isProjectAdmin && (
                      <Button 
                        onClick={() => setIsAddMemberDialogOpen(true)}
                        className="bg-primary hover:bg-primary-light"
                      >
                        <UserPlus className="mr-2 h-4 w-4" /> Adicionar Membro
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map((member: any) => (
                    <Card key={member.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.user?.avatar} alt={member.user?.name} />
                            <AvatarFallback>
                              {getInitials(member.user?.name || "")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{member.user?.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {member.role === "designer" 
                                  ? "Designer" 
                                  : member.role === "programador" 
                                  ? "Programador" 
                                  : "Gerente"}
                              </Badge>
                              {member.userId === project.createdById && (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                  Criador
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {isProjectAdmin && member.userId !== project.createdById && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 border-destructive text-destructive hover:bg-destructive/10"
                            onClick={() => removeMember.mutate(member.userId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Data de Início</p>
                  <p className="text-sm text-muted-foreground">{formatDate(project.startDate)}</p>
                </div>
              </div>
              {project.endDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Data de Término</p>
                    <p className="text-sm text-muted-foreground">{formatDate(project.endDate)}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-muted-foreground">
                    {projectStatusLabels[project.status as keyof typeof projectStatusLabels]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Membros</p>
                  <p className="text-sm text-muted-foreground">{members.length} membros ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Criador do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{getInitials(user?.name || "")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tarefas Concluídas</span>
                  <span className="text-sm">
                    {tasks.filter((t: any) => t.status === "concluída").length}/{tasks.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ 
                      width: `${tasks.length ? (tasks.filter((t: any) => t.status === "concluída").length / tasks.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tarefas em Progresso</span>
                  <span className="text-sm">
                    {tasks.filter((t: any) => t.status === "em progresso").length}/{tasks.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full"
                    style={{ 
                      width: `${tasks.length ? (tasks.filter((t: any) => t.status === "em progresso").length / tasks.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tarefas Pendentes</span>
                  <span className="text-sm">
                    {tasks.filter((t: any) => t.status === "pendente").length}/{tasks.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-500 rounded-full"
                    style={{ 
                      width: `${tasks.length ? (tasks.filter((t: any) => t.status === "pendente").length / tasks.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Project Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto
              "{project.name}" e todos os dados associados a ele.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => deleteProject.mutate()}
              disabled={deleteProject.isPending}
            >
              {deleteProject.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Excluindo...
                </>
              ) : (
                "Excluir Projeto"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Membro ao Projeto</DialogTitle>
            <DialogDescription>
              Selecione um usuário e sua função no projeto.
            </DialogDescription>
          </DialogHeader>
          <Form {...addMemberForm}>
            <form onSubmit={addMemberForm.handleSubmit(onAddMemberSubmit)} className="space-y-4">
              <FormField
                control={addMemberForm.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um usuário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableUsers.length === 0 ? (
                          <div className="p-2 text-center text-muted-foreground">
                            Não há usuários disponíveis
                          </div>
                        ) : (
                          availableUsers.map((u: any) => (
                            <SelectItem key={u.id} value={u.id.toString()}>
                              {u.name} ({u.role})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addMemberForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função no Projeto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="programador">Programador</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={addMember.isPending || availableUsers.length === 0}
                  className="bg-primary hover:bg-primary-light"
                >
                  {addMember.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adicionando...
                    </>
                  ) : (
                    "Adicionar Membro"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Task Form Dialog */}
      <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Criar Nova Tarefa</DialogTitle>
            <DialogDescription>
              Adicione uma nova tarefa para este projeto.
            </DialogDescription>
          </DialogHeader>
          <TaskForm 
            projectId={id} 
            members={members} 
            onSuccess={() => {
              setIsTaskFormOpen(false);
              queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}/tasks`] });
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
