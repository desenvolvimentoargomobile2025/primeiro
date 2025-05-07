import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | undefined | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

export function formatDateTime(date: Date | string | undefined | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Status dos projetos
export const projectStatus = {
  inProgress: 'em andamento',
  completed: 'concluído',
  paused: 'pausado'
};

export const projectStatusLabels = {
  [projectStatus.inProgress]: 'Em Andamento',
  [projectStatus.completed]: 'Concluído',
  [projectStatus.paused]: 'Pausado'
};

export const projectStatusColors = {
  [projectStatus.inProgress]: 'bg-amber-500',
  [projectStatus.completed]: 'bg-green-500',
  [projectStatus.paused]: 'bg-slate-500'
};

// Status das tarefas
export const taskStatus = {
  pending: 'pendente',
  inProgress: 'em progresso',
  completed: 'concluída'
};

export const taskStatusLabels = {
  [taskStatus.pending]: 'Pendente',
  [taskStatus.inProgress]: 'Em Progresso',
  [taskStatus.completed]: 'Concluída'
};

export const taskStatusColors = {
  [taskStatus.pending]: 'bg-slate-500',
  [taskStatus.inProgress]: 'bg-amber-500',
  [taskStatus.completed]: 'bg-green-500'
};

// Prioridades das tarefas
export const taskPriority = {
  low: 'baixa',
  medium: 'média',
  high: 'alta'
};

export const taskPriorityLabels = {
  [taskPriority.low]: 'Baixa',
  [taskPriority.medium]: 'Média',
  [taskPriority.high]: 'Alta'
};

export const taskPriorityColors = {
  [taskPriority.low]: 'bg-blue-500',
  [taskPriority.medium]: 'bg-amber-500',
  [taskPriority.high]: 'bg-red-500'
};

// Funções para gerar cores de avatares
export function generateColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const baseHue = hash % 360;
  return `hsl(${baseHue}, 65%, 55%)`;
}

export function getInitials(name: string): string {
  if (!name) return '?';
  
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
