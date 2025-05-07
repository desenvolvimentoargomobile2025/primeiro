import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-primary/30 z-0"></div>
      
      <div className="container mx-auto px-4 py-24 lg:py-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="font-bold text-4xl md:text-6xl mb-6 text-white leading-tight">
            Transformamos <span className="text-gradient">ideias</span> em jogos <span className="text-secondary">extraordinários</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl">
            Somos uma empresa especializada em desenvolvimento de games mobile com foco em experiências inovadoras e imersivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/servicos">
              <Button className="bg-primary hover:bg-primary-light text-white px-8 py-6 rounded-md">
                Nossos Serviços
              </Button>
            </Link>
            <Link href="/contato">
              <Button variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-background px-8 py-6 rounded-md">
                Entre em Contato
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
