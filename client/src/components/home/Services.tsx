import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Code, 
  Gamepad2, 
  Brush, 
  Headphones, 
  BarChart4 
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
    >
      <Card className="bg-card h-full card-hover">
        <CardContent className="p-6">
          <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
            {icon}
          </div>
          <h3 className="font-semibold text-xl text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <Link href="/servicos">
            <a className="text-secondary flex items-center font-medium">
              Saiba mais <span className="ml-2">→</span>
            </a>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Palette className="text-2xl text-secondary h-6 w-6" />,
      title: "Design de Games",
      description: "Criamos conceitos visuais impressionantes e experiências de jogo envolventes com foco na satisfação do usuário."
    },
    {
      icon: <Code className="text-2xl text-secondary h-6 w-6" />,
      title: "Desenvolvimento Mobile",
      description: "Desenvolvemos jogos otimizados para as principais plataformas mobile (iOS e Android) utilizando tecnologias modernas."
    },
    {
      icon: <Gamepad2 className="text-2xl text-secondary h-6 w-6" />,
      title: "Game Testing",
      description: "Garantimos a qualidade dos jogos através de testes rigorosos de jogabilidade, performance e experiência do usuário."
    },
    {
      icon: <Brush className="text-2xl text-secondary h-6 w-6" />,
      title: "Arte e Animação",
      description: "Criamos assets gráficos de alta qualidade e animações fluidas que dão vida aos seus personagens e cenários."
    },
    {
      icon: <Headphones className="text-2xl text-secondary h-6 w-6" />,
      title: "Design de Áudio",
      description: "Desenvolvemos trilhas sonoras imersivas e efeitos sonoros que complementam a experiência de jogo."
    },
    {
      icon: <BarChart4 className="text-2xl text-secondary h-6 w-6" />,
      title: "Monetização e Analytics",
      description: "Implementamos estratégias eficientes de monetização e ferramentas de analytics para maximizar o retorno do seu jogo."
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-background bg-grid">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-4 text-foreground">Nossos Serviços</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas para desenvolvimento de jogos mobile, desde o conceito até o lançamento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/portfolio">
            <Button className="bg-gradient text-white px-8 py-3 rounded-md inline-flex items-center">
              Ver nosso portfólio <span className="ml-2">→</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
