import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Palette,
  Code,
  Gamepad2,
  Brush,
  Headphones,
  BarChart4,
  TestTube2,
  Store,
  Users,
  GanttChartSquare,
  CloudCog,
  GraduationCap,
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full card-hover">
        <CardContent className="p-6">
          <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
            {icon}
          </div>
          <h3 className="font-semibold text-xl text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <Palette className="h-6 w-6 text-secondary" />,
      title: "Design de Games",
      description: "Nossa equipe de design cria experiências de jogo envolventes com foco na jogabilidade e satisfação do usuário. Desenvolvemos conceitos visuais impressionantes e sistemas de jogo inovadores."
    },
    {
      icon: <Code className="h-6 w-6 text-secondary" />,
      title: "Desenvolvimento Mobile",
      description: "Desenvolvemos jogos otimizados para as principais plataformas mobile (iOS e Android) utilizando tecnologias modernas como Unity, Unreal Engine e frameworks nativos."
    },
    {
      icon: <Gamepad2 className="h-6 w-6 text-secondary" />,
      title: "Game Testing",
      description: "Garantimos a qualidade dos jogos através de testes rigorosos de jogabilidade, performance e experiência do usuário. Nossos testadores identificam e resolvem problemas antes do lançamento."
    },
    {
      icon: <Brush className="h-6 w-6 text-secondary" />,
      title: "Arte e Animação",
      description: "Criamos assets gráficos de alta qualidade e animações fluidas que dão vida aos seus personagens e cenários. Nossa equipe de artistas trabalha com 2D, 3D e efeitos visuais."
    },
    {
      icon: <Headphones className="h-6 w-6 text-secondary" />,
      title: "Design de Áudio",
      description: "Desenvolvemos trilhas sonoras imersivas e efeitos sonoros que complementam a experiência de jogo. Nossos designers de áudio criam ambientes sonoros únicos e memoráveis."
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-secondary" />,
      title: "Monetização e Analytics",
      description: "Implementamos estratégias eficientes de monetização e ferramentas de analytics para maximizar o retorno do seu jogo, incluindo compras in-app, anúncios e modelos freemium."
    },
    {
      icon: <TestTube2 className="h-6 w-6 text-secondary" />,
      title: "Prototipagem Rápida",
      description: "Transformamos conceitos em protótipos jogáveis rapidamente para validar ideias e mecânicas antes de iniciar o desenvolvimento completo, economizando tempo e recursos."
    },
    {
      icon: <Store className="h-6 w-6 text-secondary" />,
      title: "Publicação nas Lojas",
      description: "Auxiliamos em todo o processo de publicação nas lojas de aplicativos, otimizando fichas de jogo, screenshots, vídeos promocionais e estratégias para maximizar downloads."
    },
    {
      icon: <Users className="h-6 w-6 text-secondary" />,
      title: "Game Design Participativo",
      description: "Envolvemos os jogadores no processo de design através de testes de usuário, feedback iterativo e comunidades de early access para criar jogos que realmente atendem às expectativas."
    },
    {
      icon: <GanttChartSquare className="h-6 w-6 text-secondary" />,
      title: "Gestão de Projetos Ágil",
      description: "Utilizamos metodologias ágeis adaptadas especificamente para o desenvolvimento de games, garantindo entregas frequentes e maior controle sobre escopo e qualidade."
    },
    {
      icon: <CloudCog className="h-6 w-6 text-secondary" />,
      title: "Serviços Online e Multiplayer",
      description: "Implementamos recursos online como placares, conquistas, salvamento em nuvem e modos multiplayer em tempo real ou assíncrono para enriquecer a experiência do jogador."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-secondary" />,
      title: "Consultoria em Games",
      description: "Oferecemos consultoria especializada em todas as fases do desenvolvimento de jogos, desde o conceito inicial até estratégias de lançamento e pós-lançamento."
    }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Serviços - Argo Mobile</title>
        <meta name="description" content="Conheça nossos serviços completos de desenvolvimento de games mobile, desde o design e programação até a publicação e monetização." />
        <meta property="og:title" content="Serviços de Desenvolvimento de Games - Argo Mobile" />
        <meta property="og:description" content="Oferecemos soluções completas para desenvolvimento de jogos mobile, desde o conceito até o lançamento." />
      </Helmet>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-bold text-4xl md:text-5xl mb-6 text-foreground">Nossos Serviços</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Oferecemos soluções completas para desenvolvimento de jogos mobile, com foco em qualidade, 
              inovação e experiências envolventes para os usuários.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 text-center bg-card p-10 rounded-xl border border-border"
          >
            <h2 className="font-bold text-2xl md:text-3xl mb-4 text-foreground">
              Precisando de serviços de desenvolvimento de jogos?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para transformar sua ideia em um jogo de sucesso. 
              Entre em contato para conversarmos sobre seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" className="bg-primary hover:bg-primary-light text-white">
                  Entrar em contato
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline">
                  Ver nosso portfólio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ServicesPage;
