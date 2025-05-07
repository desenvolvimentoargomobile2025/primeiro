import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  Clock,
  Loader2,
  ListTodo,
  AlertCircle,
  Calendar,
  Search,
  PlusCircle,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Filter,
} from "lucide-react";
import { formatDate, getInitials, taskStatusLabels, taskPriorityLabels } from "@/lib/utils";
import TaskForm from "./TaskForm";

const TasksList: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Fetch all tasks assigned to the user
  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery({
    queryKey: ['/api/tasks/me'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/tasks/me', { credentials: 'include' });
        if (!res.ok) return [];
        return await res.json();
      } catch (error) {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch user's projects
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ['/api/projects'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter tasks based on search query
  const filterTasks = (tasksList: any[]) => {
    if (!searchQuery) return tasksList;
    return tasksList.filter((task: any) => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get tasks grouped by status
  const pendingTasks = filterTasks(tasks.filter((task: any) => task.status === "pendente"));
  const inProgressTasks = filterTasks(tasks.filter((task: any) => task.status === "em progresso"));
  const completedTasks = filterTasks(tasks.filter((task: any) => task.status === "concluída"));

  // Task priority icon
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "alta":
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case "média":
        return <ArrowRight className="h-4 w-4 text-amber-500" />;
      case "baixa":
        return <ArrowDown className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  // Open task creation dialog for a specific project
  const handleCreateTask = (projectId: number) => {
    setSelectedProject(projectId);
    setIsCreateDialogOpen(true);
  };

  // Get project name by ID
  const getProjectName = (projectId: number) => {
    const project = projects.find((p: any) => p.id === projectId);
    return project ? project.name : "Projeto Desconhecido";
  };

  if (isLoadingTasks || isLoadingProjects) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Minhas Tarefas</h2>
          <p className="text-muted-foreground">
            Gerencie todas as suas tarefas atribuídas em diferentes projetos.
          </p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar tarefas..."
              className="pl-9 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {projects.length > 0 && (
            <Dialog>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Selecione um Projeto</DialogTitle>
                  <DialogDescription>
                    Escolha o projeto para o qual deseja criar uma nova tarefa.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {projects.map((project: any) => (
                    <Card 
                      key={project.id} 
                      className="cursor-pointer hover:bg-secondary/5 transition-colors"
                      onClick={() => handleCreateTask(project.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.status}</p>
                          </div>
                          <PlusCircle className="h-5 w-5 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all" className="flex-1">
            <ListTodo className="h-4 w-4 mr-2" /> Todas ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1">
            <AlertCircle className="h-4 w-4 mr-2" /> Pendentes ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex-1">
            <Clock className="h-4 w-4 mr-2" /> Em Progresso ({inProgressTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Concluídas ({completedTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filterTasks(tasks).length === 0 ? (
            <div className="text-center py-10">
              <ListTodo className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Nenhuma tarefa encontrada</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `Não encontramos tarefas correspondentes a "${searchQuery}".` 
                  : "Você não tem tarefas atribuídas."}
              </p>
              {!searchQuery && projects.length > 0 && (
                <Button 
                  className="bg-primary hover:bg-primary-light"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Criar Nova Tarefa
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filterTasks(tasks).map((task: any) => (
                <TaskCard key={task.id} task={task} projectName={getProjectName(task.projectId)} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {pendingTasks.length === 0 ? (
            <div className="text-center py-10">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Nenhuma tarefa pendente</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `Não encontramos tarefas pendentes correspondentes a "${searchQuery}".`
                  : "Você não tem tarefas pendentes."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map((task: any) => (
                <TaskCard key={task.id} task={task} projectName={getProjectName(task.projectId)} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          {inProgressTasks.length === 0 ? (
            <div className="text-center py-10">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Nenhuma tarefa em progresso</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `Não encontramos tarefas em progresso correspondentes a "${searchQuery}".`
                  : "Você não tem tarefas em progresso."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {inProgressTasks.map((task: any) => (
                <TaskCard key={task.id} task={task} projectName={getProjectName(task.projectId)} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedTasks.length === 0 ? (
            <div className="text-center py-10">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Nenhuma tarefa concluída</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `Não encontramos tarefas concluídas correspondentes a "${searchQuery}".`
                  : "Você não tem tarefas concluídas."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedTasks.map((task: any) => (
                <TaskCard key={task.id} task={task} projectName={getProjectName(task.projectId)} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Task Creation Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Criar Nova Tarefa</DialogTitle>
            <DialogDescription>
              Adicione uma nova tarefa para {selectedProject ? `o projeto "${getProjectName(selectedProject)}"` : "um projeto"}.
            </DialogDescription>
          </DialogHeader>
          <TaskForm 
            projectId={selectedProject} 
            onSuccess={() => setIsCreateDialogOpen(false)} 
            projects={selectedProject ? undefined : projects}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface TaskCardProps {
  task: any;
  projectName: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, projectName }) => {
  // Determine status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <AlertCircle className="h-5 w-5 text-slate-500" />;
      case "em progresso":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "concluída":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className={`border-l-4 ${
      task.status === "concluída" 
        ? "border-l-green-500" 
        : task.status === "em progresso" 
        ? "border-l-amber-500" 
        : "border-l-slate-500"
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">{getStatusIcon(task.status)}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-muted-foreground mt-1">{task.description}</p>
              </div>
              <Link href={`/dashboard/projetos/${task.projectId}`}>
                <a className="text-sm font-medium text-primary hover:underline">{projectName}</a>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Badge variant="outline" className="flex items-center gap-1">
                {getPriorityIcon(task.priority)}
                Prioridade: {taskPriorityLabels[task.priority as keyof typeof taskPriorityLabels]}
              </Badge>
              
              {task.dueDate && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Prazo: {formatDate(task.dueDate)}
                </Badge>
              )}
              
              <Badge variant="outline" className="flex items-center gap-1">
                Status: {taskStatusLabels[task.status as keyof typeof taskStatusLabels]}
              </Badge>
              
              {task.assignedToId && (
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground">Atribuído a:</span>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {getInitials(task.assigneeName || "")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
