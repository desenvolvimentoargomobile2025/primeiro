import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FolderKanban, 
  ListTodo, 
  Users, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2,
  AlertCircle,
  Timer
} from "lucide-react";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { formatDate } from "@/lib/utils";

interface DashboardStatsProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-1">
            <ArrowUpRight
              className={`h-4 w-4 mr-1 ${
                trend === "up" ? "text-success" : "text-destructive"
              }`}
            />
            <span
              className={`text-xs ${
                trend === "up" ? "text-success" : "text-destructive"
              }`}
            >
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  
  // Fetch projects
  const { data: projects = [] } = useQuery({
    queryKey: ['/api/projects'],
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
  
  // Fetch tasks
  const { data: tasks = [] } = useQuery({
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
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
  
  // Fetch team members
  const { data: team = [] } = useQuery({
    queryKey: ['/api/users'],
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
  
  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['/api/notifications'],
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
  
  const projectsInProgress = projects.filter((p: any) => p.status === "em andamento").length;
  const completedProjects = projects.filter((p: any) => p.status === "concluído").length;
  const pendingTasks = tasks.filter((t: any) => t.status === "pendente").length;
  const tasksInProgress = tasks.filter((t: any) => t.status === "em progresso").length;
  const completedTasks = tasks.filter((t: any) => t.status === "concluída").length;
  
  // Dados para o gráfico de status de tarefas
  const taskStatusData = [
    { name: "Pendentes", value: pendingTasks, color: "#9CA3AF" },
    { name: "Em Progresso", value: tasksInProgress, color: "#FBBF24" },
    { name: "Concluídas", value: completedTasks, color: "#10B981" },
  ];
  
  // Dados para o gráfico de projetos por status
  const projectStatusData = [
    { name: "Em Andamento", value: projectsInProgress, color: "#6200EA" },
    { name: "Concluídos", value: completedProjects, color: "#00E5FF" },
    { name: "Pausados", value: projects.filter((p: any) => p.status === "pausado").length, color: "#FF3D00" },
  ];
  
  // Dados para o gráfico de atividade recente
  const activityData = [
    { name: "Seg", tasks: 5 },
    { name: "Ter", tasks: 8 },
    { name: "Qua", tasks: 12 },
    { name: "Qui", tasks: 7 },
    { name: "Sex", tasks: 10 },
    { name: "Sab", tasks: 3 },
    { name: "Dom", tasks: 1 },
  ];
  
  const recentTasks = tasks.slice(0, 5);
  const unreadNotifications = notifications.filter((n: any) => !n.read).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">
            Bem-vindo, {user?.name}. Aqui está um resumo dos seus projetos e tarefas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Atualizado em: {formatDate(new Date())}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats
          title="Total de Projetos"
          value={projects.length}
          description="Projetos que você está participando"
          icon={<FolderKanban className="h-5 w-5 text-primary" />}
        />
        <DashboardStats
          title="Projetos Ativos"
          value={projectsInProgress}
          description={`${Math.round((projectsInProgress / (projects.length || 1)) * 100)}% do total`}
          icon={<Clock className="h-5 w-5 text-secondary" />}
          trend="up"
          trendValue="12% em relação ao mês anterior"
        />
        <DashboardStats
          title="Tarefas Pendentes"
          value={pendingTasks}
          description="Tarefas aguardando serem iniciadas"
          icon={<ListTodo className="h-5 w-5 text-warning" />}
        />
        <DashboardStats
          title="Membros de Equipe"
          value={team.length}
          description="Colaboradores ativos"
          icon={<Users className="h-5 w-5 text-accent" />}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={activityData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Status dos Projetos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Progresso dos Projetos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.slice(0, 3).map((project: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{project.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {project.status === "em andamento" ? "65%" : project.status === "concluído" ? "100%" : "30%"}
                      </span>
                    </div>
                    <Progress
                      value={project.status === "em andamento" ? 65 : project.status === "concluído" ? 100 : 30}
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Status das Tarefas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suas Tarefas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.length > 0 ? (
                  recentTasks.map((task: any, index: number) => (
                    <div key={index} className="flex items-start p-3 border border-border rounded-lg">
                      <div className="mr-3">
                        {task.status === "pendente" && (
                          <AlertCircle className="h-5 w-5 text-warning" />
                        )}
                        {task.status === "em progresso" && (
                          <Timer className="h-5 w-5 text-primary" />
                        )}
                        {task.status === "concluída" && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-foreground">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description.substring(0, 60)}...</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {task.dueDate ? formatDate(task.dueDate) : "Sem prazo"}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary">
                            {task.priority === "alta" ? "Alta" : task.priority === "média" ? "Média" : "Baixa"}
                          </div>
                          <div className="text-xs text-muted-foreground">{task.projectName}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ListTodo className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-foreground">Nenhuma tarefa encontrada</h3>
                    <p className="text-muted-foreground">Você ainda não possui tarefas atribuídas.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unreadNotifications.length > 0 ? (
                  unreadNotifications.map((notification: any, index: number) => (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-foreground">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-foreground">Nenhuma notificação</h3>
                    <p className="text-muted-foreground">Você não tem novas notificações.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
