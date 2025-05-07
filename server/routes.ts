import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { z } from "zod";
import { insertUserSchema, insertProjectSchema, insertTaskSchema, insertCommentSchema } from "@shared/schema";
import MemoryStore from "memorystore";

// Estendendo o Express session
declare module "express-session" {
  interface SessionData {
    user: { id: number; username: string; role: string };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Configuração de sessão
  const sessionStore = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "argomobile-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      },
      store: new sessionStore({
        checkPeriod: 86400000, // limpar expiradas a cada 24h
      }),
    })
  );

  // Configuração do Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Estratégias de autenticação
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Usuário não encontrado" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Senha incorreta" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Middleware que verifica se o usuário está autenticado
  const isAuthenticated = (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Não autorizado" });
  };

  // Middleware que verifica se o usuário é administrador
  const isAdmin = (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated() && (req.user as any).role === "admin") {
      return next();
    }
    res.status(403).json({ message: "Acesso restrito a administradores" });
  };

  // Rotas de autenticação
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message });
      
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Erro ao desconectar" });
      res.status(200).json({ message: "Desconectado com sucesso" });
    });
  });

  app.get("/api/auth/me", isAuthenticated, (req, res) => {
    const user = req.user as any;
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    });
  });

  // Rotas de usuários
  app.get("/api/users", isAuthenticated, async (req, res) => {
    try {
      const users = await storage.getUsers();
      // Remover senhas da resposta
      const safeUsers = users.map(u => ({
        id: u.id,
        username: u.username,
        name: u.name,
        email: u.email,
        role: u.role,
        avatar: u.avatar
      }));
      res.json(safeUsers);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  });

  app.post("/api/users", isAdmin, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Verificar se o usuário já existe
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Nome de usuário já está em uso" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email já está em uso" });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Remover senha da resposta
      const { password, ...userResponse } = newUser;
      res.status(201).json(userResponse);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  });

  // Rotas de projetos
  app.get("/api/projects", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      let projects;
      
      if (user.role === "admin") {
        projects = await storage.getProjects();
      } else {
        projects = await storage.getProjectsByUser(user.id);
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar projetos" });
    }
  });

  app.get("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar acesso ao projeto
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        const members = await storage.getProjectMembers(projectId);
        const isMember = members.some(m => m.userId === user.id);
        
        if (!isMember) {
          return res.status(403).json({ message: "Acesso negado a este projeto" });
        }
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar projeto" });
    }
  });

  app.post("/api/projects", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const projectData = insertProjectSchema.parse({
        ...req.body,
        createdById: user.id
      });
      
      const newProject = await storage.createProject(projectData);
      
      // Adicionar o criador como membro do projeto
      await storage.addProjectMember({
        projectId: newProject.id,
        userId: user.id,
        role: "gerente"
      });
      
      res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao criar projeto" });
    }
  });

  app.put("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar permissão para editar
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        return res.status(403).json({ message: "Permissão negada para editar este projeto" });
      }
      
      const updatedProject = await storage.updateProject(projectId, req.body);
      res.json(updatedProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao atualizar projeto" });
    }
  });

  app.delete("/api/projects/:id", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar permissão para deletar
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        return res.status(403).json({ message: "Permissão negada para excluir este projeto" });
      }
      
      await storage.deleteProject(projectId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir projeto" });
    }
  });

  // Rotas de membros do projeto
  app.get("/api/projects/:id/members", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar acesso ao projeto
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        const members = await storage.getProjectMembers(projectId);
        const isMember = members.some(m => m.userId === user.id);
        
        if (!isMember) {
          return res.status(403).json({ message: "Acesso negado a este projeto" });
        }
      }
      
      const members = await storage.getProjectMembers(projectId);
      
      // Buscar detalhes dos usuários
      const memberDetails = await Promise.all(
        members.map(async (member) => {
          const user = await storage.getUser(member.userId);
          return {
            id: member.id,
            projectId: member.projectId,
            userId: member.userId,
            role: member.role,
            user: user ? {
              id: user.id,
              username: user.username,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar
            } : null
          };
        })
      );
      
      res.json(memberDetails);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar membros do projeto" });
    }
  });

  app.post("/api/projects/:id/members", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar permissão para adicionar membros
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        return res.status(403).json({ message: "Permissão negada para adicionar membros" });
      }
      
      const { userId, role } = req.body;
      
      // Verificar se o usuário existe
      const memberUser = await storage.getUser(userId);
      if (!memberUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      
      // Verificar se já é membro
      const members = await storage.getProjectMembers(projectId);
      const existingMember = members.find(m => m.userId === userId);
      
      if (existingMember) {
        return res.status(400).json({ message: "Usuário já é membro deste projeto" });
      }
      
      const newMember = await storage.addProjectMember({
        projectId,
        userId,
        role
      });
      
      // Adicionar detalhes do usuário à resposta
      const memberWithUser = {
        ...newMember,
        user: {
          id: memberUser.id,
          username: memberUser.username,
          name: memberUser.name,
          email: memberUser.email,
          role: memberUser.role,
          avatar: memberUser.avatar
        }
      };
      
      res.status(201).json(memberWithUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar membro ao projeto" });
    }
  });

  app.delete("/api/projects/:projectId/members/:userId", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const memberUserId = parseInt(req.params.userId);
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar permissão
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        return res.status(403).json({ message: "Permissão negada para remover membros" });
      }
      
      // Não permitir remover o criador do projeto
      if (memberUserId === project.createdById) {
        return res.status(400).json({ message: "Não é possível remover o criador do projeto" });
      }
      
      const result = await storage.removeProjectMember(projectId, memberUserId);
      
      if (!result) {
        return res.status(404).json({ message: "Membro não encontrado neste projeto" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover membro do projeto" });
    }
  });

  // Rotas de tarefas
  app.get("/api/projects/:id/tasks", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar acesso ao projeto
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        const members = await storage.getProjectMembers(projectId);
        const isMember = members.some(m => m.userId === user.id);
        
        if (!isMember) {
          return res.status(403).json({ message: "Acesso negado a este projeto" });
        }
      }
      
      const tasks = await storage.getTasks(projectId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefas" });
    }
  });

  app.post("/api/projects/:id/tasks", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar acesso ao projeto
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        const members = await storage.getProjectMembers(projectId);
        const isMember = members.some(m => m.userId === user.id);
        
        if (!isMember) {
          return res.status(403).json({ message: "Acesso negado a este projeto" });
        }
      }
      
      const taskData = insertTaskSchema.parse({
        ...req.body,
        projectId,
        createdById: (req.user as any).id
      });
      
      // Se tem assignedToId, verificar se é membro do projeto
      if (taskData.assignedToId) {
        const members = await storage.getProjectMembers(projectId);
        const isAssigneeMember = members.some(m => m.userId === taskData.assignedToId);
        
        if (!isAssigneeMember) {
          return res.status(400).json({ message: "O usuário designado deve ser membro do projeto" });
        }
      }
      
      const newTask = await storage.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao criar tarefa" });
    }
  });

  app.put("/api/tasks/:id", isAuthenticated, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      
      const project = await storage.getProject(task.projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar permissão
      const user = req.user as any;
      const isAdmin = user.role === "admin";
      const isProjectOwner = project.createdById === user.id;
      const isTaskCreator = task.createdById === user.id;
      const isAssignee = task.assignedToId === user.id;
      
      if (!isAdmin && !isProjectOwner && !isTaskCreator && !isAssignee) {
        return res.status(403).json({ message: "Permissão negada para atualizar esta tarefa" });
      }
      
      // Se mudar assignedToId, verificar se é membro do projeto
      if (req.body.assignedToId && req.body.assignedToId !== task.assignedToId) {
        const members = await storage.getProjectMembers(task.projectId);
        const isAssigneeMember = members.some(m => m.userId === req.body.assignedToId);
        
        if (!isAssigneeMember) {
          return res.status(400).json({ message: "O usuário designado deve ser membro do projeto" });
        }
      }
      
      const updatedTask = await storage.updateTask(taskId, req.body);
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar tarefa" });
    }
  });

  app.delete("/api/tasks/:id", isAuthenticated, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      
      const project = await storage.getProject(task.projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar permissão
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id && task.createdById !== user.id) {
        return res.status(403).json({ message: "Permissão negada para excluir esta tarefa" });
      }
      
      await storage.deleteTask(taskId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir tarefa" });
    }
  });

  // Rotas de comentários
  app.get("/api/tasks/:id/comments", isAuthenticated, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      
      const project = await storage.getProject(task.projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar acesso ao projeto
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        const members = await storage.getProjectMembers(task.projectId);
        const isMember = members.some(m => m.userId === user.id);
        
        if (!isMember) {
          return res.status(403).json({ message: "Acesso negado a esta tarefa" });
        }
      }
      
      const comments = await storage.getComments(taskId);
      
      // Adicionar detalhes do usuário a cada comentário
      const commentsWithUsers = await Promise.all(
        comments.map(async (comment) => {
          const user = await storage.getUser(comment.userId);
          return {
            ...comment,
            user: user ? {
              id: user.id,
              username: user.username,
              name: user.name,
              avatar: user.avatar
            } : null
          };
        })
      );
      
      res.json(commentsWithUsers);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar comentários" });
    }
  });

  app.post("/api/tasks/:id/comments", isAuthenticated, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      
      const project = await storage.getProject(task.projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }
      
      // Verificar acesso ao projeto
      const user = req.user as any;
      if (user.role !== "admin" && project.createdById !== user.id) {
        const members = await storage.getProjectMembers(task.projectId);
        const isMember = members.some(m => m.userId === user.id);
        
        if (!isMember) {
          return res.status(403).json({ message: "Acesso negado a esta tarefa" });
        }
      }
      
      const commentData = insertCommentSchema.parse({
        ...req.body,
        taskId,
        userId: (req.user as any).id,
        createdAt: new Date()
      });
      
      const newComment = await storage.createComment(commentData);
      
      // Adicionar detalhes do usuário à resposta
      const commentWithUser = {
        ...newComment,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          avatar: user.avatar
        }
      };
      
      res.status(201).json(commentWithUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao criar comentário" });
    }
  });

  // Rotas de notificações
  app.get("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const notifications = await storage.getNotifications(user.id);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar notificações" });
    }
  });

  app.put("/api/notifications/:id/read", isAuthenticated, async (req, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      const result = await storage.markNotificationAsRead(notificationId);
      
      if (!result) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao marcar notificação como lida" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
