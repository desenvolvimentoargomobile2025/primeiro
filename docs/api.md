# Documentação da API - Argo Mobile

Este documento descreve todas as rotas de API disponíveis no sistema Argo Mobile, seus parâmetros, corpo de requisição, respostas e exemplos.

## 🔑 Autenticação

Todas as rotas protegidas exigem um token JWT válido no cabeçalho de autorização:

```
Authorization: Bearer seu-token-jwt
```

O token é obtido através do endpoint de login.

## 📡 Endpoints

### Autenticação

#### Login

```
POST /api/auth/login
```

Autentica um usuário e retorna um token JWT.

**Corpo da Requisição:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "username": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "avatar": "string"
  }
}
```

**Códigos de Resposta:**
- `200 OK`: Login bem-sucedido
- `401 Unauthorized`: Credenciais inválidas

#### Obter Usuário Atual

```
GET /api/auth/me
```

Retorna os dados do usuário autenticado.

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "username": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "avatar": "string"
}
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `401 Unauthorized`: Usuário não autenticado

#### Alterar Senha

```
POST /api/auth/change-password
```

Altera a senha do usuário autenticado.

**Corpo da Requisição:**
```json
{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Senha alterada com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Senha alterada com sucesso
- `400 Bad Request`: Senhas não coincidem ou validação falhou
- `401 Unauthorized`: Senha atual incorreta

#### Logout

```
POST /api/auth/logout
```

Invalida o token atual.

**Resposta de Sucesso:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Logout bem-sucedido
- `401 Unauthorized`: Token inválido

### Usuários

#### Listar Usuários

```
GET /api/users
```

Retorna uma lista de todos os usuários. Requer permissão de administrador.

**Parâmetros de Consulta:**
- `role` (opcional): Filtra por função (admin, gerente, programador, designer)
- `search` (opcional): Pesquisa por nome ou email

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "username": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "avatar": "string"
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Sem permissão

#### Obter Usuário

```
GET /api/users/:id
```

Retorna um usuário específico.

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "username": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "avatar": "string"
}
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `404 Not Found`: Usuário não encontrado

#### Criar Usuário

```
POST /api/users
```

Cria um novo usuário. Requer permissão de administrador.

**Corpo da Requisição:**
```json
{
  "username": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "avatar": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "username": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "avatar": "string"
}
```

**Códigos de Resposta:**
- `201 Created`: Usuário criado com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão

#### Atualizar Usuário

```
PATCH /api/users/:id
```

Atualiza um usuário existente. Usuários normais só podem atualizar seus próprios dados.

**Corpo da Requisição:**
```json
{
  "name": "string",
  "email": "string",
  "role": "string",
  "avatar": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "username": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "avatar": "string"
}
```

**Códigos de Resposta:**
- `200 OK`: Usuário atualizado com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Usuário não encontrado

### Projetos

#### Listar Projetos

```
GET /api/projects
```

Retorna uma lista de projetos acessíveis pelo usuário.

**Parâmetros de Consulta:**
- `status` (opcional): Filtra por status (planejamento, em progresso, concluído, pausado)
- `search` (opcional): Pesquisa por nome ou descrição

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "ownerId": "number",
    "owner": {
      "id": "number",
      "name": "string"
    }
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `401 Unauthorized`: Não autenticado

#### Obter Projeto

```
GET /api/projects/:id
```

Retorna um projeto específico.

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string",
  "ownerId": "number",
  "owner": {
    "id": "number",
    "name": "string"
  }
}
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `404 Not Found`: Projeto não encontrado

#### Criar Projeto

```
POST /api/projects
```

Cria um novo projeto.

**Corpo da Requisição:**
```json
{
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string",
  "ownerId": "number"
}
```

**Códigos de Resposta:**
- `201 Created`: Projeto criado com sucesso
- `400 Bad Request`: Dados inválidos

#### Atualizar Projeto

```
PATCH /api/projects/:id
```

Atualiza um projeto existente.

**Corpo da Requisição:**
```json
{
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string",
  "ownerId": "number"
}
```

**Códigos de Resposta:**
- `200 OK`: Projeto atualizado com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Projeto não encontrado

#### Excluir Projeto

```
DELETE /api/projects/:id
```

Remove um projeto existente.

**Resposta de Sucesso:**
```json
{
  "message": "Projeto removido com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Projeto removido com sucesso
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Projeto não encontrado

### Membros do Projeto

#### Listar Membros de um Projeto

```
GET /api/projects/:projectId/members
```

Retorna uma lista de membros de um projeto específico.

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "projectId": "number",
    "userId": "number",
    "role": "string",
    "joinedAt": "date",
    "user": {
      "id": "number",
      "name": "string",
      "avatar": "string"
    }
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `404 Not Found`: Projeto não encontrado

#### Adicionar Membro ao Projeto

```
POST /api/projects/:projectId/members
```

Adiciona um usuário como membro de um projeto.

**Corpo da Requisição:**
```json
{
  "userId": "number",
  "role": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "projectId": "number",
  "userId": "number",
  "role": "string",
  "joinedAt": "date"
}
```

**Códigos de Resposta:**
- `201 Created`: Membro adicionado com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Projeto ou usuário não encontrado
- `409 Conflict`: Usuário já é membro do projeto

#### Remover Membro do Projeto

```
DELETE /api/projects/:projectId/members/:userId
```

Remove um membro de um projeto.

**Resposta de Sucesso:**
```json
{
  "message": "Membro removido com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Membro removido com sucesso
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Projeto, usuário ou relação não encontrada

### Tarefas

#### Listar Tarefas de um Projeto

```
GET /api/projects/:projectId/tasks
```

Retorna uma lista de tarefas de um projeto específico.

**Parâmetros de Consulta:**
- `status` (opcional): Filtra por status (pendente, em progresso, concluída)
- `priority` (opcional): Filtra por prioridade (baixa, média, alta)
- `assignedTo` (opcional): Filtra por responsável (ID do usuário)

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "projectId": "number",
    "title": "string",
    "description": "string",
    "status": "string",
    "priority": "string",
    "createdAt": "date",
    "dueDate": "date",
    "assignedToId": "number",
    "assignedTo": {
      "id": "number",
      "name": "string",
      "avatar": "string"
    }
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `404 Not Found`: Projeto não encontrado

#### Obter Tarefas do Usuário

```
GET /api/tasks/me
```

Retorna todas as tarefas atribuídas ao usuário autenticado.

**Parâmetros de Consulta:**
- `status` (opcional): Filtra por status (pendente, em progresso, concluída)
- `priority` (opcional): Filtra por prioridade (baixa, média, alta)

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "projectId": "number",
    "title": "string",
    "description": "string",
    "status": "string",
    "priority": "string",
    "createdAt": "date",
    "dueDate": "date",
    "project": {
      "id": "number",
      "name": "string"
    }
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `401 Unauthorized`: Não autenticado

#### Obter Tarefa

```
GET /api/tasks/:id
```

Retorna uma tarefa específica.

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "projectId": "number",
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "createdAt": "date",
  "dueDate": "date",
  "assignedToId": "number",
  "assignedTo": {
    "id": "number",
    "name": "string",
    "avatar": "string"
  },
  "project": {
    "id": "number",
    "name": "string"
  }
}
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `404 Not Found`: Tarefa não encontrada

#### Criar Tarefa

```
POST /api/projects/:projectId/tasks
```

Cria uma nova tarefa em um projeto.

**Corpo da Requisição:**
```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "dueDate": "date",
  "assignedToId": "number"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "projectId": "number",
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "createdAt": "date",
  "dueDate": "date",
  "assignedToId": "number"
}
```

**Códigos de Resposta:**
- `201 Created`: Tarefa criada com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Projeto não encontrado

#### Atualizar Tarefa

```
PATCH /api/tasks/:id
```

Atualiza uma tarefa existente.

**Corpo da Requisição:**
```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "dueDate": "date",
  "assignedToId": "number"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "projectId": "number",
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "createdAt": "date",
  "dueDate": "date",
  "assignedToId": "number"
}
```

**Códigos de Resposta:**
- `200 OK`: Tarefa atualizada com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Tarefa não encontrada

#### Excluir Tarefa

```
DELETE /api/tasks/:id
```

Remove uma tarefa existente.

**Resposta de Sucesso:**
```json
{
  "message": "Tarefa removida com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Tarefa removida com sucesso
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Tarefa não encontrada

### Documentos

#### Listar Documentos de um Projeto

```
GET /api/projects/:projectId/documents
```

Retorna uma lista de documentos de um projeto específico.

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "projectId": "number",
    "name": "string",
    "url": "string",
    "uploadedAt": "date",
    "uploadedById": "number",
    "uploadedBy": {
      "id": "number",
      "name": "string"
    }
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `404 Not Found`: Projeto não encontrado

#### Enviar Documento

```
POST /api/projects/:projectId/documents
```

Envia um novo documento para um projeto.

**Corpo da Requisição:**
```json
{
  "name": "string",
  "url": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "projectId": "number",
  "name": "string",
  "url": "string",
  "uploadedAt": "date",
  "uploadedById": "number"
}
```

**Códigos de Resposta:**
- `201 Created`: Documento enviado com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Projeto não encontrado

#### Excluir Documento

```
DELETE /api/documents/:id
```

Remove um documento existente.

**Resposta de Sucesso:**
```json
{
  "message": "Documento removido com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Documento removido com sucesso
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Documento não encontrado

### Comentários

#### Listar Comentários de uma Tarefa

```
GET /api/tasks/:taskId/comments
```

Retorna uma lista de comentários de uma tarefa específica.

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "taskId": "number",
    "userId": "number",
    "content": "string",
    "createdAt": "date",
    "user": {
      "id": "number",
      "name": "string",
      "avatar": "string"
    }
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `404 Not Found`: Tarefa não encontrada

#### Adicionar Comentário

```
POST /api/tasks/:taskId/comments
```

Adiciona um novo comentário a uma tarefa.

**Corpo da Requisição:**
```json
{
  "content": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "taskId": "number",
  "userId": "number",
  "content": "string",
  "createdAt": "date"
}
```

**Códigos de Resposta:**
- `201 Created`: Comentário adicionado com sucesso
- `400 Bad Request`: Dados inválidos
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Tarefa não encontrada

#### Excluir Comentário

```
DELETE /api/comments/:id
```

Remove um comentário existente.

**Resposta de Sucesso:**
```json
{
  "message": "Comentário removido com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Comentário removido com sucesso
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Comentário não encontrado

### Notificações

#### Listar Notificações do Usuário

```
GET /api/notifications
```

Retorna uma lista de notificações do usuário autenticado.

**Parâmetros de Consulta:**
- `read` (opcional): Filtra por status de leitura (true/false)

**Resposta de Sucesso:**
```json
[
  {
    "id": "number",
    "userId": "number",
    "title": "string",
    "content": "string",
    "isRead": "boolean",
    "createdAt": "date",
    "type": "string",
    "relatedId": "number"
  }
]
```

**Códigos de Resposta:**
- `200 OK`: Sucesso
- `401 Unauthorized`: Não autenticado

#### Marcar Notificação como Lida

```
PATCH /api/notifications/:id/read
```

Marca uma notificação como lida.

**Resposta de Sucesso:**
```json
{
  "id": "number",
  "userId": "number",
  "title": "string",
  "content": "string",
  "isRead": true,
  "createdAt": "date",
  "type": "string",
  "relatedId": "number"
}
```

**Códigos de Resposta:**
- `200 OK`: Notificação marcada como lida
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Notificação não encontrada

#### Excluir Notificação

```
DELETE /api/notifications/:id
```

Remove uma notificação existente.

**Resposta de Sucesso:**
```json
{
  "message": "Notificação removida com sucesso"
}
```

**Códigos de Resposta:**
- `200 OK`: Notificação removida com sucesso
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Notificação não encontrada

## ✋ Gestão de Erros

Todas as respostas de erro seguem o formato padrão:

```json
{
  "message": "Mensagem de erro",
  "error": "Erro detalhado (apenas em ambiente de desenvolvimento)"
}
```

### Códigos de Erro Comuns

- `400 Bad Request`: Dados fornecidos inválidos ou incompletos
- `401 Unauthorized`: Autenticação necessária ou falha de autenticação
- `403 Forbidden`: Não tem permissão para acessar o recurso
- `404 Not Found`: Recurso não encontrado
- `409 Conflict`: Conflito de dados (por exemplo, nome de usuário já em uso)
- `500 Internal Server Error`: Erro interno do servidor

## 📋 Limites e Paginação

Para endpoints que retornam muitos resultados, a paginação está disponível:

**Parâmetros de Consulta para Paginação:**
- `page` (opcional): Número da página, começando em 1
- `limit` (opcional): Número de itens por página (padrão: 20, máximo: 100)

**Resposta com Paginação:**
```json
{
  "data": [...],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

## 🚀 Exemplos

### Exemplo: Login

**Requisição:**
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Resposta:**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Administrador",
    "email": "admin@argomobile.com.br",
    "role": "admin",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

### Exemplo: Criar Projeto

**Requisição:**
```
POST /api/projects
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Cosmic Racers 2",
  "description": "Sequência do jogo de corrida Cosmic Racers com novos planetas e naves",
  "startDate": "2025-06-01",
  "status": "planejamento"
}
```

**Resposta:**
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 10,
  "name": "Cosmic Racers 2",
  "description": "Sequência do jogo de corrida Cosmic Racers com novos planetas e naves",
  "startDate": "2025-06-01T00:00:00.000Z",
  "endDate": null,
  "status": "planejamento",
  "ownerId": 1
}
```

### Exemplo: Listar Tarefas do Usuário

**Requisição:**
```
GET /api/tasks/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta:**
```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 5,
    "projectId": 3,
    "title": "Implementar sistema de economia do jogo",
    "description": "Criar sistema de loja virtual, moedas e itens colecionáveis",
    "status": "em progresso",
    "priority": "alta",
    "createdAt": "2025-04-10T14:23:11.000Z",
    "dueDate": "2025-05-15T00:00:00.000Z",
    "project": {
      "id": 3,
      "name": "Battle Commander"
    }
  },
  {
    "id": 8,
    "projectId": 2,
    "title": "Otimizar renderização de mundos abertos",
    "description": "Melhorar a performance em dispositivos de entrada",
    "status": "pendente",
    "priority": "média",
    "createdAt": "2025-04-12T09:45:22.000Z",
    "dueDate": "2025-05-20T00:00:00.000Z",
    "project": {
      "id": 2,
      "name": "Mystic Realms"
    }
  }
]
```

## 📝 Notas Adicionais

- Todas as datas estão no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
- O sistema utiliza o fuso horário UTC para todas as operações de data
- Os endpoints que retornam listas geralmente são ordenados por data de criação (decrescente)
- O limite padrão de upload de arquivos é de 10MB
- Todas as requisições devem usar UTF-8 para encoding

---

**© Argo Mobile, 2025**