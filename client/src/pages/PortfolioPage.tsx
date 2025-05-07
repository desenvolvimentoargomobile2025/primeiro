import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  platform: string;
}

const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const projects: Project[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1498736297812-3a08021f206f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Cosmic Racers",
      description: "Jogo de corrida futurista com elementos de RPG onde os jogadores competem em pistas através da galáxia, personalizando naves e desbloqueando habilidades únicas.",
      category: "corrida",
      platform: "iOS, Android"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Mystic Realms",
      description: "RPG de mundo aberto com sistema de combate inovador onde os jogadores exploram um reino mágico, enfrentam criaturas místicas e completam missões épicas.",
      category: "rpg",
      platform: "Android"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Geometric Flow",
      description: "Jogo de quebra-cabeça minimalista com desafios progressivos que testa a lógica e o pensamento espacial através de padrões geométricos e mecânicas baseadas em física.",
      category: "puzzle",
      platform: "iOS, Android"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Battle Commander",
      description: "Jogo de estratégia em tempo real com modo multijogador onde os jogadores comandam exércitos, constroem bases e desenvolvem táticas militares em cenários diversos.",
      category: "estrategia",
      platform: "iOS, Android"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1618331833071-ce81bd50d300?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Green Valley",
      description: "Simulador de fazenda com elementos de construção e customização onde os jogadores cultivam, criam animais e expandem sua propriedade em um cenário rural idílico.",
      category: "simulacao",
      platform: "Android"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Lost Horizon",
      description: "Jogo de aventura com narrativa envolvente e gráficos detalhados onde os jogadores exploram locais misteriosos, resolvem enigmas e descobrem tesouros perdidos.",
      category: "aventura",
      platform: "iOS"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Cubic Challenge",
      description: "Jogo de quebra-cabeça 3D onde os jogadores manipulam estruturas de cubos para resolver desafios espaciais cada vez mais complexos.",
      category: "puzzle",
      platform: "iOS, Android"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Speed Demons",
      description: "Jogo de corrida arcade com pistas dinâmicas e veículos personalizáveis, oferecendo modos de jogo emocionantes e desafios diários.",
      category: "corrida",
      platform: "iOS, Android"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Ninja Warrior",
      description: "Jogo de ação com elementos de plataforma onde o jogador controla um ninja que deve superar obstáculos, derrotar inimigos e dominar habilidades especiais.",
      category: "acao",
      platform: "Android"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <MainLayout>
      <Helmet>
        <title>Portfólio - Argo Mobile</title>
        <meta name="description" content="Conheça os jogos mobile desenvolvidos pela Argo Mobile. Nosso portfólio inclui jogos de diversos gêneros como ação, aventura, RPG, corrida e muito mais." />
        <meta property="og:title" content="Portfólio de Jogos - Argo Mobile" />
        <meta property="og:description" content="Conheça alguns dos projetos de sucesso que desenvolvemos para nossos clientes." />
      </Helmet>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-bold text-4xl md:text-5xl mb-6 text-foreground">Nosso Portfólio</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Conheça alguns dos projetos de sucesso que desenvolvemos para nossos clientes.
              Nossa equipe cria games inovadores para plataformas móveis.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-primary" : ""}
            >
              Todos
            </Button>
            <Button
              variant={filter === "aventura" ? "default" : "outline"}
              onClick={() => setFilter("aventura")}
              className={filter === "aventura" ? "bg-primary" : ""}
            >
              Aventura
            </Button>
            <Button
              variant={filter === "rpg" ? "default" : "outline"}
              onClick={() => setFilter("rpg")}
              className={filter === "rpg" ? "bg-primary" : ""}
            >
              RPG
            </Button>
            <Button
              variant={filter === "corrida" ? "default" : "outline"}
              onClick={() => setFilter("corrida")}
              className={filter === "corrida" ? "bg-primary" : ""}
            >
              Corrida
            </Button>
            <Button
              variant={filter === "puzzle" ? "default" : "outline"}
              onClick={() => setFilter("puzzle")}
              className={filter === "puzzle" ? "bg-primary" : ""}
            >
              Puzzle
            </Button>
            <Button
              variant={filter === "estrategia" ? "default" : "outline"}
              onClick={() => setFilter("estrategia")}
              className={filter === "estrategia" ? "bg-primary" : ""}
            >
              Estratégia
            </Button>
            <Button
              variant={filter === "simulacao" ? "default" : "outline"}
              onClick={() => setFilter("simulacao")}
              className={filter === "simulacao" ? "bg-primary" : ""}
            >
              Simulação
            </Button>
            <Button
              variant={filter === "acao" ? "default" : "outline"}
              onClick={() => setFilter("acao")}
              className={filter === "acao" ? "bg-primary" : ""}
            >
              Ação
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl card-hover"
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-white">{project.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-primary/70 px-2 py-1 rounded-full text-white">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                      <span className="bg-secondary/70 px-2 py-1 rounded-full text-background">
                        {project.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Quer ver seu jogo aqui?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos transformar sua ideia em um jogo de sucesso.
              Nossa equipe está pronta para criar sua próxima grande experiência mobile.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary-light">Solicitar Orçamento</Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PortfolioPage;
