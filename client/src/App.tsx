import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Páginas Públicas
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import PortfolioPage from "@/pages/PortfolioPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/not-found";

// Páginas do Dashboard
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProjectsPage from "@/pages/dashboard/ProjectsPage";
import ProjectDetailPage from "@/pages/dashboard/ProjectDetailPage";
import TasksPage from "@/pages/dashboard/TasksPage";
import TeamPage from "@/pages/dashboard/TeamPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";

function Router() {
  return (
    <Switch>
      {/* Páginas Públicas */}
      <Route path="/" component={HomePage} />
      <Route path="/servicos" component={ServicesPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/contato" component={ContactPage} />
      <Route path="/login" component={LoginPage} />
      
      {/* Páginas do Dashboard */}
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/dashboard/projetos" component={ProjectsPage} />
      <Route path="/dashboard/projetos/:id" component={ProjectDetailPage} />
      <Route path="/dashboard/tarefas" component={TasksPage} />
      <Route path="/dashboard/equipe" component={TeamPage} />
      <Route path="/dashboard/perfil" component={ProfilePage} />
      
      {/* Fallback para 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
