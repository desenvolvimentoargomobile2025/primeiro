import React from "react";
import { motion } from "framer-motion";
import { 
  PenTool, 
  Code, 
  ClipboardList 
} from "lucide-react";

const Team: React.FC = () => {
  return (
    <section id="equipe" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-4 text-foreground">Nossa Equipe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça os profissionais talentosos por trás dos nossos projetos de sucesso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80" 
            alt="Equipe Argo Mobile trabalhando em um projeto" 
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent rounded-xl"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-xl">
            <h3 className="font-bold text-2xl md:text-3xl text-white mb-3">Equipe multidisciplinar</h3>
            <p className="text-white/90">
              Nossa equipe é composta por designers, programadores, artistas e gerentes de projeto apaixonados por games e tecnologia.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center p-6"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
              <PenTool className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Design</h3>
            <p className="text-muted-foreground">
              Nossa equipe de design cria experiências de jogo envolventes, interfaces intuitivas e visuais impressionantes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center p-6"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
              <Code className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Desenvolvimento</h3>
            <p className="text-muted-foreground">
              Programadores experientes em Unity, Unreal Engine e tecnologias mobile nativas para iOS e Android.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center p-6"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
              <ClipboardList className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Gerenciamento</h3>
            <p className="text-muted-foreground">
              Gerentes de projeto especializados em metodologias ágeis para desenvolvimento de games.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Team;
