import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Lock, ChevronRight, CheckCircle, Users, ListTodo, Database } from "lucide-react";
import { motion } from "framer-motion";

const SystemPreview: React.FC = () => {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-4 text-foreground">Sistema de Gerenciamento</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nossa plataforma proprietária oferece ferramentas poderosas para gerenciar projetos de jogos e equipes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-background p-1 rounded-xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=550&q=80" 
                alt="Dashboard do sistema de gerenciamento Argo" 
                className="rounded-lg"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-2xl md:text-3xl mb-6 text-foreground">Sistema interno completo para sua equipe</h3>
            <p className="text-muted-foreground mb-6">
              Nosso sistema proprietário de gerenciamento de projetos foi desenvolvido especificamente para equipes de desenvolvimento de games, integrando as necessidades de designers, programadores e gerentes em uma interface intuitiva.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="mr-3 text-secondary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Gerenciamento de tarefas</h4>
                  <p className="text-sm text-muted-foreground">Organize e acompanhe o progresso da equipe</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 text-secondary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Perfis por função</h4>
                  <p className="text-sm text-muted-foreground">Visões personalizadas para cada função na equipe</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 text-secondary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Banco de dados integrado</h4>
                  <p className="text-sm text-muted-foreground">Armazenamento seguro de assets e dados</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 text-secondary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Relatórios e métricas</h4>
                  <p className="text-sm text-muted-foreground">Análise de performance e progresso</p>
                </div>
              </div>
            </div>
            
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-md">
                Solicitar demonstração <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mt-20"
      >
        <div className="relative mx-auto max-w-4xl glow rounded-xl">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" 
            alt="Dashboard do sistema de gerenciamento de projetos" 
            className="w-full rounded-xl shadow-2xl"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-lg text-center">
            <h3 className="font-bold text-2xl md:text-3xl text-foreground mb-4">Sistema de gestão completo</h3>
            <p className="text-muted-foreground mb-6">
              25 módulos integrados para gerenciar todos os aspectos do desenvolvimento de games, desde o planejamento até o lançamento.
            </p>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-md">
                <Lock className="mr-2 h-4 w-4" /> Acessar sistema
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-xl card-hover border border-border">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Gestão de Equipe</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Organize sua equipe por funções, atribua tarefas e monitore o progresso de cada membro.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl card-hover border border-border">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <ListTodo className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Gestão de Tarefas</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Acompanhe o progresso de cada fase do projeto com visualizações em Kanban, Gantt e listas.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl card-hover border border-border">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <Database className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Banco de Dados</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Armazenamento seguro de assets, documentos e dados relacionados aos projetos.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SystemPreview;
