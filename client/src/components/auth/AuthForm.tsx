import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "./LoginForm";

interface AuthFormProps {
  type?: "login" | "register" | "reset";
}

const AuthForm: React.FC<AuthFormProps> = ({ type = "login" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-lg text-white">AM</span>
              </div>
              <span className="font-bold text-lg text-foreground">Argo Mobile</span>
            </div>
            <h2 className="font-bold text-2xl text-foreground">
              {type === "login" && "Acesso ao Sistema"}
              {type === "register" && "Criar Nova Conta"}
              {type === "reset" && "Recuperar Senha"}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {type === "login" && "Acesse nossa plataforma de gerenciamento de projetos"}
              {type === "register" && "Crie sua conta para acessar o sistema"}
              {type === "reset" && "Informe seu email para recuperar sua senha"}
            </p>
          </div>
          
          {type === "login" && <LoginForm />}
          
          <div className="mt-6 text-center text-muted-foreground text-sm">
            <p>
              Não tem acesso?{" "}
              <a href="/contato" className="text-secondary hover:text-secondary-light">
                Entre em contato
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
