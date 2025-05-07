import React from "react";
import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-xl text-white">AM</span>
              </div>
              <span className="font-bold text-xl text-white">Argo Mobile</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Transformando ideias em jogos extraordinários desde 2015. Especialistas em desenvolvimento de games mobile.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-6">Navegação</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/">
                  <span className="hover:text-secondary transition-colors cursor-pointer">Início</span>
                </Link>
              </li>
              <li>
                <Link href="/servicos">
                  <span className="hover:text-secondary transition-colors cursor-pointer">Serviços</span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <span className="hover:text-secondary transition-colors cursor-pointer">Portfólio</span>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <span className="hover:text-secondary transition-colors cursor-pointer">Sobre</span>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <span className="hover:text-secondary transition-colors cursor-pointer">Contato</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-6">Serviços</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-secondary transition-colors">Design de Games</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Desenvolvimento Mobile</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Arte e Animação</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Design de Áudio</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Monetização</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-6">Contato</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <span>Av. Paulista, 1000<br />São Paulo, SP - Brasil</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                <span>+55 (11) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                <span>contato@argomobile.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Argo Mobile. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-secondary transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-secondary transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-secondary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
