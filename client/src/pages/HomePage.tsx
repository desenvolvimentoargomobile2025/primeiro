import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Team from "@/components/home/Team";
import SystemPreview from "@/components/home/SystemPreview";
import Contact from "@/components/home/Contact";
import { Helmet } from "react-helmet";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Argo Mobile - Desenvolvimento de Games para Dispositivos Móveis</title>
        <meta name="description" content="Somos uma empresa especializada em desenvolvimento de games mobile com foco em experiências inovadoras e imersivas. Transformamos ideias em jogos extraordinários." />
        <meta property="og:title" content="Argo Mobile - Desenvolvimento de Games" />
        <meta property="og:description" content="Empresa especializada em desenvolvimento de games mobile com foco em experiências inovadoras e imersivas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://argomobile.com.br" />
      </Helmet>
      
      <Hero />
      <Services />
      <SystemPreview />
      <Portfolio />
      <Team />
      <Contact />
    </MainLayout>
  );
};

export default HomePage;
