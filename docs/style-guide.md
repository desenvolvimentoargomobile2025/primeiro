# Guia de Estilo - Argo Mobile

Este documento define as convenções de codificação, design e arquitetura para o desenvolvimento do projeto Argo Mobile.

## 🎨 Design Visual

### Paleta de Cores

#### Cores Primárias
- **Primária**: `#6E56CF` (Roxo)
  - Hover: `#7C66D9`
  - Texto em fundo primário: `#FFFFFF`

#### Cores Secundárias
- **Secundária**: `#0CA5E9` (Azul)
  - Hover: `#3CB9F2`
  - Texto em fundo secundário: `#FFFFFF`

#### Cores de Interface
- **Background**: `#FCFCFC` (Branco)
- **Card/Componente**: `#FFFFFF` (Branco)
- **Texto primário**: `#1A1523` (Quase preto)
- **Texto secundário**: `#6F6E77` (Cinza escuro)
- **Texto desabilitado**: `#BEBCC1` (Cinza claro)
- **Borda**: `#E4E2E4` (Cinza muito claro)
- **Input Background**: `#F9F8F9` (Cinza quase branco)

#### Cores de Estado
- **Sucesso**: `#30A46C` (Verde)
- **Aviso**: `#FBA94C` (Laranja)
- **Erro**: `#E5484D` (Vermelho)
- **Info**: `#0CA5E9` (Azul)

### Tipografia

#### Família de Fontes
- **Principal**: Inter, sans-serif
- **Alternativa**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif

#### Tamanhos
- **Texto base**: 16px
- **Títulos**:
  - h1: 36px (2.25rem)
  - h2: 30px (1.875rem)
  - h3: 24px (1.5rem)
  - h4: 20px (1.25rem)
  - h5: 18px (1.125rem)
  - h6: 16px (1rem)
- **Pequeno**: 14px (0.875rem)
- **Micro**: 12px (0.75rem)

#### Pesos
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Espaçamento

- **Unidade base**: 4px
- **Espaçamentos comuns**:
  - xs: 4px (0.25rem)
  - sm: 8px (0.5rem)
  - md: 16px (1rem)
  - lg: 24px (1.5rem)
  - xl: 32px (2rem)
  - 2xl: 48px (3rem)

### Arredondamento de Bordas

- **Pequeno**: 4px (0.25rem)
- **Médio**: 8px (0.5rem)
- **Grande**: 12px (0.75rem)
- **Extra Grande**: 16px (1rem)
- **Circular**: 9999px

### Sombras

- **Sutil**: `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Média**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Pronunciada**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Elevada**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

### Ícones

- Usar o pacote [Lucide React](https://lucide.dev/) para ícones
- Tamanho padrão: 24px
- Tamanho pequeno: 16px
- Tamanho grande: 32px

### Design Responsivo

#### Breakpoints
- **Mobile**: 0px - 639px
- **Tablet (sm)**: 640px - 767px
- **Tablet (md)**: 768px - 1023px
- **Desktop (lg)**: 1024px - 1279px
- **Desktop grande (xl)**: 1280px - 1535px
- **Desktop extra grande (2xl)**: 1536px ou mais

#### Grades
- Layout baseado em grid de 12 colunas
- Espaçamento de colunas: 16px (1rem) em mobile, 24px (1.5rem) em desktop
- Margens laterais: 16px (1rem) em mobile, 64px (4rem) em desktop

## 📝 Convenções de Código

### Geral

- Utilize TypeScript para todas as partes do projeto
- Use aspas duplas (`"`) para strings
- Final de linha Unix (LF)
- Indentação com 2 espaços
- Comprimento máximo de linha: 100 caracteres
- Utilize ponto-e-vírgula ao final das instruções
- Arquivos devem terminar com uma linha em branco

### Nomenclatura

- **Arquivos**: Use camelCase para arquivos de código (ex: `userProfile.ts`)
- **Componentes React**: Use PascalCase (ex: `UserProfile.tsx`)
- **Interfaces/Types**: Use PascalCase prefixado com `I` para interfaces (ex: `IUserData`)
- **Variáveis e funções**: Use camelCase (ex: `getUserData`)
- **Constantes**: Use UPPER_SNAKE_CASE (ex: `MAX_RETRY_COUNT`)
- **Componentes de CSS**: Use kebab-case (ex: `user-profile`)

### React

- Um componente por arquivo
- Componentes devem ser funções, não classes
- Use desestruturação para props
- Use o hook personalizado `useAuth` para verificações de autenticação
- Utilize React.FC para componentes com TypeScript

```tsx
// Exemplo de componente bem formatado
import React from "react";
import { SomeComponent } from "./SomeComponent";

interface IUserProfileProps {
  username: string;
  isActive: boolean;
}

export const UserProfile: React.FC<IUserProfileProps> = ({ username, isActive }) => {
  // Lógica do componente
  
  return (
    <div className="user-profile">
      <h2>{username}</h2>
      {isActive && <SomeComponent />}
    </div>
  );
};
```

### API e Backend

- Use substantivos plurais para endpoints REST (ex: `/api/users`)
- Retorne objetos JSON consistentes nas respostas
- Inclua códigos de status HTTP apropriados
- Documente todas as rotas com comentários JSDoc
- Valide sempre os dados de entrada usando Zod

```ts
// Exemplo de rota bem formatada
/**
 * Obtém um usuário pelo ID
 * @route GET /api/users/:id
 * @param {string} id - ID do usuário
 * @returns {Object} Dados do usuário
 * @throws {404} - Usuário não encontrado
 */
app.get("/api/users/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await storage.getUser(Number(id));
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### CSS com Tailwind

- Utilize classes Tailwind para estilos sempre que possível
- Agrupar classes por tipo (layout, tipografia, cores, etc.)
- Usar variantes organizadas (hover:, focus:, dark:, sm:, etc.)

```tsx
// Exemplo de uso adequado de classes Tailwind
<button 
  className="
    px-4 py-2 
    font-medium text-sm text-white 
    bg-primary hover:bg-primary-light focus:ring-2 focus:ring-primary/50
    rounded-md
    transition-colors
    disabled:opacity-50
  "
>
  Enviar
</button>
```

## 🏛️ Arquitetura

### Estrutura de Diretórios

```
argo-mobile/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── auth/        # Componentes de autenticação
│   │   │   ├── dashboard/   # Componentes do dashboard
│   │   │   ├── home/        # Componentes da página inicial
│   │   │   ├── layout/      # Layouts e estrutura da página
│   │   │   └── ui/          # Componentes de UI reutilizáveis
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── lib/             # Utilitários e configurações
│   │   ├── pages/           # Definições de páginas
│   │   │   └── dashboard/   # Páginas do dashboard
│   │   ├── App.tsx          # Componente principal
│   │   ├── index.css        # Estilos globais e de reset
│   │   └── main.tsx         # Ponto de entrada
│   └── index.html           # Template HTML
├── server/                  # Backend Node.js/Express
│   ├── index.ts             # Ponto de entrada do servidor
│   ├── routes.ts            # Definição das rotas da API
│   ├── storage.ts           # Abstração de armazenamento
│   └── vite.ts              # Configuração de desenvolvimento
├── shared/                  # Código compartilhado
│   └── schema.ts            # Definições de esquema e tipos
├── docs/                    # Documentação
│   ├── api.md               # Documentação da API
│   └── style-guide.md       # Guia de estilo (este arquivo)
├── public/                  # Ativos estáticos
│   ├── fonts/               # Fontes
│   └── images/              # Imagens
└── components.json          # Configuração do Shadcn UI
```

### Padrões de Design e Arquiteturais

#### Frontend
- Utilização de Atomic Design para componentes
- Componentes inteligentes e de apresentação separados
- Hook `useQuery` para busca e cache de dados
- Hook `useMutation` para operações de criação/atualização/exclusão
- Custom hooks para lógica de negócios reutilizável

#### Backend
- Arquitetura API RESTful
- Separação clara de responsabilidades
- Interface de armazenamento abstrata para possibilitar diferentes implementações
- Middleware para autenticação e autorização
- Validação de dados com Zod

### Fluxo de Trabalho de Desenvolvimento

1. Desenvolver esquemas e tipos em `shared/schema.ts`
2. Implementar a interface de armazenamento para os novos tipos
3. Adicionar rotas de API para o recurso
4. Criar componentes e hooks no frontend para consumir a API
5. Integrar os componentes nas páginas

## 🔐 Segurança

### Boas Práticas

- Nunca armazene senhas em texto plano
- Use bcrypt para hash de senhas
- Tokens JWT devem expirar
- Valide todos os dados de entrada
- Sanitize todos os dados antes de exibir
- Use HTTPS em produção
- Implemente rate limiting para endpoints de autenticação
- Adicione protection CSRF para formulários

### Autenticação

- Use tokens JWT para autenticação stateless
- Armazene tokens no localStorage ou sessionStorage
- Adicione o token no header Authorization como Bearer
- Implemente refresh tokens para sessões prolongadas
- Forneça logout em todos os dispositivos

## 📱 Responsividade e Acessibilidade

### Acessibilidade

- Todas as imagens devem ter alt text
- Use elementos semânticos (header, nav, main, section, etc)
- Formulários devem ter labels associados aos inputs
- Cores devem ter contraste suficiente
- Interfaces devem ser navegáveis por teclado
- Use ARIA attributes quando necessário

### Responsividade

- Design mobile-first
- Use unidades relativas (rem, em, %) em vez de pixels quando possível
- Teste em diferentes tamanhos de tela
- Use CSS Grid e Flexbox para layouts
- Adicione Media Queries para ajustes específicos

## 🧪 Testes

### Tipos de Testes

- **Testes Unitários**: Componentes individuais e funções
- **Testes de Integração**: Interações entre componentes
- **Testes E2E**: Fluxos de usuário completos

### Convenções de Testes

- Arquivos de teste devem ser nomeados `[nome].test.tsx` ou `[nome].spec.tsx`
- Use Jest para testes unitários e de integração
- Use Testing Library para testes de componentes React
- Use Cypress para testes E2E
- Mock de serviços externos e API

## 📦 Versionamento e Deploy

### Versionamento Semântico

- **Major (x.0.0)**: Mudanças incompatíveis com versões anteriores
- **Minor (0.x.0)**: Adição de funcionalidades mantendo compatibilidade
- **Patch (0.0.x)**: Correções de bugs mantendo compatibilidade

### Processo de Deploy

1. Build da aplicação (`npm run build`)
2. Testes automatizados (`npm test`)
3. Deploy para ambiente de staging
4. Testes de QA no ambiente de staging
5. Deploy para produção

## 🔍 Revisão de Código

### Checklist de Revisão

- O código segue o guia de estilo?
- Existe documentação adequada?
- Os testes foram implementados?
- Há problemas de performance?
- O código é seguro?
- As mensagens de erro são claras?
- A experiência do usuário é adequada?

---

**© Argo Mobile, 2025**