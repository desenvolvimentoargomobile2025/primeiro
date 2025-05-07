import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Usuários do sistema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(), // designer, programador, admin, etc.
  avatar: text("avatar"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
});

// Projetos de jogos
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // em andamento, concluído, pausado
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  thumbnail: text("thumbnail"),
  platform: text("platform").notNull(), // iOS, Android, ambos
  genre: text("genre").notNull(), // RPG, Corrida, Puzzle, etc.
  createdById: integer("created_by_id").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  status: true,
  startDate: true,
  endDate: true,
  thumbnail: true,
  platform: true,
  genre: true,
  createdById: true,
});

// Membros do projeto
export const projectMembers = pgTable("project_members", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  userId: integer("user_id").notNull(),
  role: text("role").notNull(), // designer, programador, gerente
});

export const insertProjectMemberSchema = createInsertSchema(projectMembers).pick({
  projectId: true,
  userId: true,
  role: true,
});

// Tarefas do projeto
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // pendente, em progresso, concluída
  priority: text("priority").notNull(), // baixa, média, alta
  dueDate: timestamp("due_date"),
  assignedToId: integer("assigned_to_id"),
  createdById: integer("created_by_id").notNull(),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  projectId: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  assignedToId: true,
  createdById: true,
});

// Documentos/arquivos do projeto
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // documento, imagem, audio, código
  url: text("url").notNull(),
  uploadedById: integer("uploaded_by_id").notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  projectId: true,
  name: true,
  type: true,
  url: true,
  uploadedById: true,
});

// Comentários em tarefas
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  taskId: true,
  content: true,
  userId: true,
  createdAt: true,
});

// Notificações para usuários
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull(),
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  userId: true,
  title: true,
  message: true,
  read: true,
  createdAt: true,
});

// Tipos para inserção e seleção
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProjectMember = z.infer<typeof insertProjectMemberSchema>;
export type ProjectMember = typeof projectMembers.$inferSelect;

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
