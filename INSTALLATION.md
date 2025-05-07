# Guia de Instalação e Configuração - Argo Mobile

Este documento fornece instruções detalhadas para instalar, configurar e executar o sistema Argo Mobile em diferentes ambientes.

## 📋 Pré-requisitos

### Requisitos de Sistema
- Sistema operacional: Windows 10+, macOS 10.15+, ou Linux (Ubuntu 20.04+ recomendado)
- Node.js versão 18.x ou superior
- npm versão 8.x ou superior
- Memória RAM: 4GB mínimo (8GB recomendado)
- Armazenamento: 500MB para o código fonte e dependências

### Requisitos Opcionais
- PostgreSQL 13+ (para ambiente de produção)
- Serviço de e-mail SMTP (para recuperação de senha e notificações)
- Serviço de armazenamento de arquivos (para uploads de documentos)

## 🚀 Instalação

### Método 1: Instalação por Download

1. Baixe o código fonte do [repositório oficial](https://github.com/seu-usuario/argo-mobile/releases/latest)
2. Extraia o arquivo ZIP para o diretório desejado
3. Abra um terminal no diretório do projeto
4. Continue com a seção "Configuração" abaixo

### Método 2: Instalação via Git

1. Abra um terminal
2. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/argo-mobile.git
cd argo-mobile
```
3. Continue com a seção "Configuração" abaixo

## ⚙️ Configuração

### Instalação de Dependências

Instale as dependências do projeto:
```bash
npm install
```

### Configuração do Ambiente de Desenvolvimento

1. Crie um arquivo `.env` na raiz do projeto:
```bash
touch .env
```

2. Adicione as seguintes variáveis de ambiente ao arquivo `.env`:
```
# Configuração do Servidor
PORT=5000
NODE_ENV=development

# Segurança
JWT_SECRET=sua-chave-secreta-para-jwt
JWT_EXPIRATION=1d

# Banco de Dados (opcional para desenvolvimento, usando armazenamento em memória por padrão)
# DATABASE_URL=postgres://usuário:senha@localhost:5432/argo_mobile

# Configuração de Email (opcional)
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=seu-email@example.com
# SMTP_PASS=sua-senha
```

### Configuração do Banco de Dados (Opcional)

Para usar um banco de dados PostgreSQL em vez do armazenamento em memória:

1. Instale o PostgreSQL no seu sistema
2. Crie um novo banco de dados:
```sql
CREATE DATABASE argo_mobile;
```

3. Descomente e configure a variável `DATABASE_URL` no arquivo `.env`
4. Modifique a implementação do armazenamento em `server/index.ts` para usar PostgreSQL

## 🏃‍♂️ Execução

### Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

Este comando inicia:
- O servidor backend Express na porta 5000
- O servidor frontend Vite com HMR (Hot Module Replacement)

Acesse o aplicativo em: [http://localhost:5000](http://localhost:5000)

### Ambiente de Produção

1. Construa a aplicação:
```bash
npm run build
```

2. Inicie o servidor em modo de produção:
```bash
npm start
```

## 🔐 Configuração Inicial de Segurança

### Criação do Usuário Administrador

Na primeira execução, o sistema cria automaticamente um usuário administrador padrão:

```
Username: admin
Senha: admin123
```

**IMPORTANTE**: Por segurança, altere a senha imediatamente após o primeiro login.

### Configuração de CORS (Produção)

Para ambientes de produção, configure corretamente os domínios permitidos para CORS no arquivo `.env`:

```
CORS_ORIGIN=https://seu-dominio.com,https://outro-dominio.com
```

## 🔄 Atualização

Para atualizar para uma nova versão:

1. Faça backup dos seus dados (se estiver usando PostgreSQL)
2. Pare o servidor em execução
3. Atualize o código fonte:
```bash
git pull origin main
```
4. Instale as dependências atualizadas:
```bash
npm install
```
5. Execute migrações de banco de dados (se aplicável):
```bash
npm run migrate
```
6. Reinicie o servidor:
```bash
npm run dev
```

## 📱 Responsividade e Compatibilidade

O sistema foi testado e é compatível com:

### Navegadores Desktop
- Google Chrome 90+
- Mozilla Firefox 90+
- Microsoft Edge 90+
- Safari 14+

### Dispositivos Móveis
- iOS 14+ (Safari)
- Android 8+ (Chrome)

## 🐳 Usando Docker (Opcional)

### Pré-requisitos
- Docker 20.10+
- Docker Compose 2.0+

### Iniciando com Docker Compose

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/argo-mobile.git
cd argo-mobile
```

2. Inicie os contêineres:
```bash
docker-compose up -d
```

O aplicativo estará disponível em: [http://localhost:5000](http://localhost:5000)

## ❓ Solução de Problemas de Instalação

### Problemas Comuns

#### Erro de permissão ao instalar pacotes
```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
```

**Solução**: Execute com permissões de administrador ou configure o npm para usar um diretório diferente

#### Porta 5000 já está em uso
```
Error: listen EADDRINUSE: address already in use 0.0.0.0:5000
```

**Solução**: Altere a porta no arquivo `.env` ou encerre o processo que está usando a porta 5000

#### Falha na conexão com o banco de dados
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solução**: Verifique se o PostgreSQL está em execução e se as credenciais de conexão estão corretas

## 📞 Suporte e Contato

Se você encontrar problemas durante a instalação ou configuração, entre em contato:

- Email: suporte@argomobile.com.br
- GitHub: [Criar uma issue](https://github.com/seu-usuario/argo-mobile/issues/new)

---

**© Argo Mobile, 2025**