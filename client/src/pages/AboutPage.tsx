import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Trophy,
  Users,
  Rocket,
  Heart,
  Coffee,
  Code,
  Gamepad2,
  Smartphone,
  Zap,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image, delay }) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full card-hover">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-xl mb-1">{name}</h3>
            <p className="text-primary font-medium mb-3">{role}</p>
            <p className="text-muted-foreground">{bio}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Value: React.FC<ValueProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Alexandre Costa",
      role: "CEO & Game Designer",
      bio: "Com mais de 15 anos de experiência na indústria de jogos, Alexandre fundou a Argo Mobile com a visão de criar experiências móveis inovadoras.",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      delay: 0.1
    },
    {
      name: "Mariana Silva",
      role: "Diretora de Arte",
      bio: "Mariana lidera nosso time de artistas, trazendo sua experiência em design visual e animação para dar vida aos nossos jogos.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      delay: 0.2
    },
    {
      name: "Ricardo Oliveira",
      role: "Líder de Desenvolvimento",
      bio: "Ricardo é especialista em desenvolvimento mobile com Unity e Unreal Engine, focado em otimização e performance.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      delay: 0.3
    },
    {
      name: "Carolina Mendes",
      role: "Gerente de Projetos",
      bio: "Carolina coordena nossas equipes usando metodologias ágeis adaptadas especificamente para desenvolvimento de games.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      delay: 0.4
    },
    {
      name: "Thiago Santos",
      role: "Designer de Som",
      bio: "Thiago cria trilhas sonoras cativantes e efeitos sonoros imersivos que complementam a experiência visual dos nossos jogos.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      delay: 0.5
    },
    {
      name: "Juliana Costa",
      role: "Especialista em Monetização",
      bio: "Juliana desenvolve estratégias para maximizar receitas mantendo uma experiência positiva para os jogadores.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      delay: 0.6
    }
  ];

  const values: ValueProps[] = [
    {
      icon: <Heart className="h-8 w-8 text-secondary" />,
      title: "Paixão por Games",
      description: "Somos apaixonados por jogos e acreditamos no seu poder de entretenimento, educação e transformação.",
      delay: 0.1
    },
    {
      icon: <Zap className="h-8 w-8 text-secondary" />,
      title: "Inovação Constante",
      description: "Buscamos sempre novas tecnologias, mecânicas e formas de interação para criar experiências únicas.",
      delay: 0.2
    },
    {
      icon: <Trophy className="h-8 w-8 text-secondary" />,
      title: "Excelência",
      description: "Comprometimento com a qualidade em cada detalhe, do conceito ao lançamento e além.",
      delay: 0.3
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Colaboração",
      description: "Trabalho em equipe e comunicação aberta são essenciais para nosso processo criativo.",
      delay: 0.4
    },
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Criatividade",
      description: "Incentivamos o pensamento criativo e a experimentação para inovar em cada projeto.",
      delay: 0.5
    }
  ];

  const stats = [
    { value: "2015", label: "Ano de fundação" },
    { value: "+50", label: "Jogos lançados" },
    { value: "+100M", label: "Downloads" },
    { value: "+30", label: "Profissionais" }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Sobre Nós - Argo Mobile</title>
        <meta name="description" content="Conheça a Argo Mobile, empresa especializada em desenvolvimento de games para dispositivos móveis. Nossa equipe de profissionais apaixonados cria experiências de jogo únicas e envolventes." />
        <meta property="og:title" content="Sobre a Argo Mobile - Empresa de Desenvolvimento de Games" />
        <meta property="og:description" content="Conheça nossa história, equipe e valores que guiam o desenvolvimento de games mobile inovadores." />
      </Helmet>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-bold text-4xl md:text-5xl mb-6 text-foreground">Sobre a Argo Mobile</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Somos uma empresa especializada em desenvolvimento de games mobile, 
              comprometida em criar experiências de jogo envolventes e inovadoras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Fundada em 2015 por um grupo de desenvolvedores apaixonados por games mobile, 
                  a Argo Mobile nasceu com a missão de criar jogos que proporcionassem experiências 
                  envolventes para jogadores de todas as idades.
                </p>
                <p className="text-muted-foreground">
                  Começamos com uma pequena equipe de cinco pessoas em um escritório compartilhado 
                  em São Paulo. Nosso primeiro jogo, "Cosmic Racers", foi um sucesso imediato, 
                  atingindo mais de 1 milhão de downloads em seu primeiro mês.
                </p>
                <p className="text-muted-foreground">
                  Hoje, contamos com uma equipe multidisciplinar de designers, programadores, 
                  artistas e gerentes de projeto, todos unidos pela paixão de criar games 
                  inovadores que fazem a diferença no mercado mobile.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Equipe Argo Mobile" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent rounded-lg"></div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">Nossos Valores</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
              Estes são os princípios que guiam nosso trabalho e nos ajudam a 
              criar jogos excepcionais que encantam os jogadores.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-20">
            {values.map((value, index) => (
              <Value
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={value.delay}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">Nossa Equipe</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
              Conheça os talentos por trás dos nossos jogos de sucesso. 
              Uma equipe diversificada e apaixonada por criar experiências incríveis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                delay={member.delay}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center bg-card p-10 rounded-xl border border-border"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 mx-auto">
              <Rocket className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa História</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Estamos sempre à procura de talentos apaixonados por games para se juntarem à nossa equipe.
              Se você é um game designer, programador, artista ou produtor talentoso, queremos conhecê-lo!
            </p>
            <a 
              href="/contato"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary-light h-10 px-4 py-2"
            >
              Entre em contato
            </a>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutPage;
