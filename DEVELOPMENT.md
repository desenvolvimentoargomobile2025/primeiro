# Guia de Desenvolvimento - Argo Mobile

Este documento fornece instruções detalhadas para desenvolvedores que desejam contribuir ou manter o projeto Argo Mobile.

## 🛠️ Ambiente de Desenvolvimento

### Requisitos
- Node.js versão 18.x ou superior
- npm versão 8.x ou superior
- Editor de código (recomendado: VS Code)
- PostgreSQL (opcional, apenas para ambiente de produção)

### Configuração Inicial

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/argo-mobile.git
cd argo-mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação:
- Frontend: http://localhost:5000
- Backend API: http://localhost:5000/api

## 📁 Estrutura do Projeto

```
argo-mobile/
├── client/                 # Frontend da aplicação
│   ├── src/
│   │   ├── components/     # Componentes React reutilizáveis
│   │   ├── hooks/          # Custom hooks React
│   │   ├── lib/            # Utilitários, configurações e helpers
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── App.tsx         # Componente principal da aplicação
│   │   └── main.tsx        # Ponto de entrada do React
│   └── index.html          # Arquivo HTML principal
├── server/                 # Backend da aplicação
│   ├── index.ts            # Ponto de entrada do servidor
│   ├── routes.ts           # Definição de rotas da API
│   ├── storage.ts          # Interface de armazenamento
│   └── vite.ts             # Configuração de desenvolvimento Vite
├── shared/                 # Código compartilhado entre frontend e backend
│   └── schema.ts           # Esquemas e tipos de dados
└── package.json            # Dependências e scripts do projeto
```

## 🧩 Arquitetura

### Frontend (React)
- **Componentes**: Organizados por funcionalidade (layout, ui, auth, dashboard, home)
- **Routing**: Implementado com wouter
- **Estado Global**: 
  - React Query para chamadas de API e cache
  - Custom hooks para lógica de negócios específica
- **Validação de Formulários**: React Hook Form + Zod
- **Estilização**: TailwindCSS + Shadcn UI

### Backend (Node.js + Express)
- **API RESTful**: Endpoints organizados por recursos (usuários, projetos, tarefas)
- **Autenticação**: JWT com sessão de usuário
- **Armazenamento**: Interface abstrata que suporta tanto armazenamento em memória quanto PostgreSQL
- **Validação**: Esquemas Zod para validação de entrada

## 🔄 Fluxo de Trabalho

### Desenvolvimento de Novas Funcionalidades

1. Crie uma nova branch:
```bash
git checkout -b feature/nome-da-feature
```

2. Desenvolva e teste sua funcionalidade

3. Garanta que o código segue os padrões do projeto:
```bash
npm run lint
```

4. Faça o commit das alterações:
```bash
git commit -m "Adiciona nova funcionalidade XYZ"
```

5. Envie a branch para o repositório:
```bash
git push origin feature/nome-da-feature
```

6. Abra um Pull Request para a branch main

### Adicionando Novos Componentes

1. Crie o componente na pasta apropriada em `client/src/components/`
2. Siga o padrão de nomenclatura já existente
3. Adicione documentação através de comentários no código
4. Se for um componente reutilizável, considere adicioná-lo à pasta `ui/`

### Adicionando Novas Páginas

1. Crie o arquivo da página em `client/src/pages/`
2. Adicione a rota para a página no arquivo `client/src/App.tsx`
3. Se for uma página protegida, utilize o componente de autenticação

## 📊 Modelo de Dados

### Usuários (User)
- id: número (chave primária)
- username: string (único)
- name: string
- email: string (único)
- password: string (hash)
- role: string (enum: 'admin', 'gerente', 'programador', 'designer')
- avatar: string (opcional, URL)

### Projetos (Project)
- id: número (chave primária)
- name: string
- description: string
- startDate: Date
- endDate: Date (opcional)
- status: string (enum: 'planejamento', 'em progresso', 'concluído', 'pausado')
- ownerId: número (referência a User)

### Membros do Projeto (ProjectMember)
- id: número (chave primária)
- projectId: número (referência a Project)
- userId: número (referência a User)
- role: string (enum: 'gerente', 'programador', 'designer', 'tester')
- joinedAt: Date

### Tarefas (Task)
- id: número (chave primária)
- projectId: número (referência a Project)
- title: string
- description: string
- status: string (enum: 'pendente', 'em progresso', 'concluída')
- priority: string (enum: 'baixa', 'média', 'alta')
- createdAt: Date
- dueDate: Date (opcional)
- assignedToId: número (referência a User, opcional)

### Documentos (Document)
- id: número (chave primária)
- projectId: número (referência a Project)
- name: string
- url: string
- uploadedAt: Date
- uploadedById: número (referência a User)

### Comentários (Comment)
- id: número (chave primária)
- taskId: número (referência a Task)
- userId: número (referência a User)
- content: string
- createdAt: Date

### Notificações (Notification)
- id: número (chave primária)
- userId: número (referência a User)
- title: string
- content: string
- isRead: boolean
- createdAt: Date
- type: string (enum: 'system', 'task', 'project', 'comment')
- relatedId: número (opcional, referência ao objeto relacionado)

## 🔐 Autenticação e Autorização

### Rotas Protegidas

- **Middleware de autenticação**: Verifica se o usuário está logado
- **Middleware de autorização**: Verifica se o usuário tem permissão para acessar o recurso

### Níveis de Acesso

- **Administrador**: Acesso completo a todas as funcionalidades
- **Gerente**: Gerenciamento de projetos e equipes
- **Programador/Designer**: Acesso às tarefas e projetos associados

## 🧪 Testes

### Testes Unitários
```bash
npm run test:unit
```

### Testes de Integração
```bash
npm run test:integration
```

### Testes End-to-End
```bash
npm run test:e2e
```

## 📦 Deploy

### Preparação para Produção

1. Configure as variáveis de ambiente necessárias:
```bash
# .env.production
DATABASE_URL=postgres://user:password@localhost:5432/database
JWT_SECRET=your-jwt-secret
```

2. Construa a aplicação:
```bash
npm run build
```

3. Inicie o servidor em modo de produção:
```bash
npm start
```

## 📚 Recursos Adicionais

- [Documentação da API](./docs/api.md)
- [Guia de Estilo](./docs/style-guide.md)
- [FAQ para Desenvolvedores](./docs/developer-faq.md)

## 🆘 Solução de Problemas

### Problemas Comuns

1. **Erro "Address already in use"**
   - A porta 5000 já está sendo usada por outro processo
   - Solução: Encerre o processo ou altere a porta no arquivo `.env`

2. **Falha na autenticação**
   - Verifique se as credenciais estão corretas
   - Certifique-se de que o JWT_SECRET está configurado corretamente

3. **Problemas de CORS**
   - Durante o desenvolvimento, certifique-se de que as configurações de CORS estão corretas
   - Em produção, configure corretamente os domínios permitidos

Para problemas não listados aqui, consulte o [repositório de issues](https://github.com/seu-usuario/argo-mobile/issues) ou abra uma nova issue.