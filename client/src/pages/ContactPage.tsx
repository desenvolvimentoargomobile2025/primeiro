import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { 
  MapPin, 
  Phone, 
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Send
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(5, { message: "Assunto deve ter pelo menos 5 caracteres" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    toast({
      title: "Mensagem enviada!",
      description: "Agradecemos seu contato. Responderemos em breve.",
    });
    form.reset();
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Contato - Argo Mobile</title>
        <meta name="description" content="Entre em contato com a Argo Mobile para discutir seu projeto de desenvolvimento de jogos ou para mais informações sobre nossos serviços." />
        <meta property="og:title" content="Contato - Argo Mobile" />
        <meta property="og:description" content="Entre em contato conosco para transformar sua ideia em um jogo de sucesso." />
      </Helmet>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-bold text-4xl md:text-5xl mb-6 text-foreground">Entre em Contato</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Estamos prontos para transformar sua ideia em um jogo de sucesso. 
              Entre em contato para iniciar uma conversa sobre seu projeto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Assunto da mensagem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Sua mensagem" 
                            className="resize-none" 
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary-light w-full md:w-auto"
                  >
                    <Send className="mr-2 h-4 w-4" /> Enviar mensagem
                  </Button>
                </form>
              </Form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="rounded-xl overflow-hidden mb-8 h-64">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                  alt="Escritório da Argo Mobile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-foreground mb-4">Informações de Contato</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start">
                        <MapPin className="text-secondary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                        <span>Av. Paulista, 1000<br />São Paulo, SP - Brasil</span>
                      </li>
                      <li className="flex items-center">
                        <Phone className="text-secondary mr-3 h-5 w-5 flex-shrink-0" />
                        <span>+55 (11) 1234-5678</span>
                      </li>
                      <li className="flex items-center">
                        <Mail className="text-secondary mr-3 h-5 w-5 flex-shrink-0" />
                        <span>contato@argomobile.com.br</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-foreground mb-4">Horário de Funcionamento</h3>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex justify-between items-center">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-secondary" /> Segunda - Sexta:
                        </span>
                        <span>09:00 - 18:00</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-secondary" /> Sábado:
                        </span>
                        <span>09:00 - 13:00</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-secondary" /> Domingo:
                        </span>
                        <span>Fechado</span>
                      </li>
                    </ul>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Redes Sociais</h4>
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
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Onde Estamos</h2>
            <div className="w-full h-[400px] rounded-xl overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.098693296441!2d-46.655470485022574!3d-23.56518178468079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1652809096619!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Mapa da localização da Argo Mobile"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactPage;
