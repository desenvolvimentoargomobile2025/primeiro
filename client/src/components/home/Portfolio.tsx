import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PortfolioItemProps {
  image: string;
  title: string;
  description: string;
  delay: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ image, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl card-hover"
    >
      <img 
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1498736297812-3a08021f206f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Cosmic Racers",
      description: "Jogo de corrida futurista com elementos de RPG"
    },
    {
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Mystic Realms",
      description: "RPG de mundo aberto com sistema de combate inovador"
    },
    {
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Geometric Flow",
      description: "Jogo de quebra-cabeça minimalista com desafios progressivos"
    },
    {
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Battle Commander",
      description: "Jogo de estratégia em tempo real com modo multijogador"
    },
    {
      image: "https://images.unsplash.com/photo-1618331833071-ce81bd50d300?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Green Valley",
      description: "Simulador de fazenda com elementos de construção e customização"
    },
    {
      image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Lost Horizon",
      description: "Jogo de aventura com narrativa envolvente e gráficos detalhados"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-4 text-foreground">Nosso Portfólio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos de sucesso que desenvolvemos para nossos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/portfolio">
            <Button variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-background px-6 py-2 rounded-md inline-flex items-center">
              Ver todos os projetos <span className="ml-2">→</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
