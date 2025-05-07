import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  PlusCircle, 
  Clock, 
  CheckCircle, 
  PauseCircle, 
  Users, 
  Calendar, 
  Loader2 
} from "lucide-react";
import { formatDate, projectStatusColors, projectStatusLabels, getInitials } from "@/lib/utils";

const projectFormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome do projeto deve ter pelo menos 3 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  status: z.string(),
  platform: z.string(),
  genre: z.string(),
  startDate: z.string().min(1, {
    message: "A data de início é obrigatória.",
  }),
  endDate: z.string().optional(),
  thumbnail: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const ProjectsList: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  // Fetch projects
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["/api/projects"],
  });

  // Create project form
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "em andamento",
      platform: "ambos",
      genre: "casual",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      thumbnail: "",
    },
  });

  // Create project mutation
  const createProject = useMutation({
    mutationFn: async (values: ProjectFormValues) => {
      const transformedValues = {
        ...values,
        startDate: new Date(values.startDate),
        endDate: values.endDate ? new Date(values.endDate) : undefined,
      };
      return await apiRequest("POST", "/api/projects", transformedValues);
    },
    onSuccess: () => {
      toast({
        title: "Projeto criado com sucesso!",
        description: "O novo projeto foi adicionado à sua lista.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar projeto",
        description: "Ocorreu um erro ao criar o projeto. Tente novamente.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  // Helper to filter projects
  const filteredProjects = React.useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project: any) => project.status === filter);
  }, [projects, filter]);

  // Submit form handler
  function onSubmit(data: ProjectFormValues) {
    createProject.mutate(data);
  }

  // Project status badge
  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case "em andamento":
        return <Badge variant="outline" className={`${baseClass} bg-amber-500/10 text-amber-500 border-amber-500/20`}>Em Andamento</Badge>;
      case "concluído":
        return <Badge variant="outline" className={`${baseClass} bg-green-500/10 text-green-500 border-green-500/20`}>Concluído</Badge>;
      case "pausado":
        return <Badge variant="outline" className={`${baseClass} bg-slate-500/10 text-slate-500 border-slate-500/20`}>Pausado</Badge>;
      default:
        return <Badge variant="outline" className={baseClass}>Desconhecido</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive">Erro ao carregar projetos. Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Projetos</h2>
          <p className="text-muted-foreground">
            Gerencie todos os seus projetos de desenvolvimento de games.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-light">
              <PlusCircle className="mr-2 h-4 w-4" /> Novo Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Projeto</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para criar um novo projeto de game.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Projeto</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do jogo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descreva o projeto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plataforma</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a plataforma" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="iOS">iOS</SelectItem>
                            <SelectItem value="Android">Android</SelectItem>
                            <SelectItem value="ambos">iOS & Android</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gênero</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o gênero" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="rpg">RPG</SelectItem>
                            <SelectItem value="estrategia">Estratégia</SelectItem>
                            <SelectItem value="acao">Ação</SelectItem>
                            <SelectItem value="puzzle">Puzzle</SelectItem>
                            <SelectItem value="simulacao">Simulação</SelectItem>
                            <SelectItem value="corrida">Corrida</SelectItem>
                            <SelectItem value="aventura">Aventura</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Início</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Término (opcional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="em andamento">Em Andamento</SelectItem>
                          <SelectItem value="concluído">Concluído</SelectItem>
                          <SelectItem value="pausado">Pausado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Thumbnail (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={createProject.isPending}
                    className="bg-primary hover:bg-primary-light"
                  >
                    {createProject.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando...
                      </>
                    ) : (
                      "Criar Projeto"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-primary" : ""}
        >
          Todos
        </Button>
        <Button
          variant={filter === "em andamento" ? "default" : "outline"}
          onClick={() => setFilter("em andamento")}
          className={filter === "em andamento" ? "bg-amber-500" : ""}
        >
          <Clock className="mr-2 h-4 w-4" /> Em Andamento
        </Button>
        <Button
          variant={filter === "concluído" ? "default" : "outline"}
          onClick={() => setFilter("concluído")}
          className={filter === "concluído" ? "bg-green-500" : ""}
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Concluídos
        </Button>
        <Button
          variant={filter === "pausado" ? "default" : "outline"}
          onClick={() => setFilter("pausado")}
          className={filter === "pausado" ? "bg-slate-500" : ""}
        >
          <PauseCircle className="mr-2 h-4 w-4" /> Pausados
        </Button>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 bg-card rounded-lg border border-border">
          <PlusCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {filter === "all"
              ? "Você ainda não tem projetos. Crie seu primeiro projeto!"
              : `Não há projetos com o status "${projectStatusLabels[filter as keyof typeof projectStatusLabels]}".`}
          </p>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary hover:bg-primary-light"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Criar Projeto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: any) => (
            <Link key={project.id} href={`/dashboard/projetos/${project.id}`}>
              <a className="block">
                <Card className="h-full cursor-pointer hover:shadow-md transition-shadow card-hover">
                  {project.thumbnail && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={project.thumbnail || "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className={project.thumbnail ? "" : "pt-6"}>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      {getStatusBadge(project.status)}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{project.platform}</Badge>
                      <Badge variant="secondary">{project.genre}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {formatDate(project.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {project.memberCount || "0"} membros
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border pt-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback>{getInitials(user?.name || "")}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-xs text-muted-foreground">Criado por: {user?.name}</span>
                    </div>
                  </CardFooter>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
