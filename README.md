# 🔍 Sistema de Pessoas Desaparecidas - PJC/MT

Sistema web desenvolvido para a Polícia Judiciária Civil de Mato Grosso para consulta e visualização de informações sobre pessoas desaparecidas.

---

## 👨‍💻 Dados do Desenvolvedor

- **Nome:** Luan Capistrano Bispo de Freitas
- **Email:** luan71k4@gmail.com
- **Telefone:** (65)99997-2003

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript
- **Estilização:** Tailwind CSS
- **Gerenciamento de Estado:** React Query (TanStack Query)
- **Roteamento:** React Router DOM
- **Validação:** Zod + React Hook Form
- **Build Tool:** Vite
- **API:** Axios para integração REST
- **Containerização:** Docker

---

## 📦 Dependências Principais

- [react](https://react.dev/)
- [typescript](https://www.typescriptlang.org/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [axios](https://axios-http.com/)
- [react-router-dom](https://reactrouter.com/)
- [tailwindcss](https://tailwindcss.com/)
- [zod](https://zod.dev/)
- [react-hook-form](https://react-hook-form.com/)

---

## 📋 Funcionalidades

- Listagem de pessoas desaparecidas com paginação
- Filtros por nome, sexo e status (desaparecido/localizado)
- Visualização detalhada de cada pessoa
- Estatísticas em tempo real (pessoas desaparecidas/encontradas)
- Formulário para adicionar observações (com validação)
- Interface responsiva e acessível
- Loading states e tratamento de erros

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Git
- Docker (opcional)

### Passo a passo

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/luancbf/pessoas-desaparecidas.git
    cd pessoas-desaparecidas
    ```

2. **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3. **Configure as variáveis de ambiente:**
    ```bash
    # Crie o arquivo .env na raiz do projeto
    cp .env.example .env

    # Edite o arquivo .env com as configurações:
    REACT_APP_API_BASE_URL=https://abitus-api.geia.vip/v1
    ```

4. **Execute o projeto em modo desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5. **Acesse a aplicação:**
    ```
    http://localhost:5173
    ```

---

## 🐳 Execução com Docker

O projeto inclui um `Dockerfile` para facilitar a execução em ambiente isolado.

### Passo a passo

1. **Construa a imagem Docker:**
    ```bash
    docker build -t pessoas-desaparecidas .
    ```

2. **Execute o container:**
    ```bash
    docker run -p 5173:5173 pessoas-desaparecidas
    ```

3. **Acesse a aplicação:**
    ```
    http://localhost:5173
    ```

> O Dockerfile está configurado para rodar o projeto em modo desenvolvimento.  
> Para produção, adapte o Dockerfile para servir o build estático (ex: com nginx ou serve).

---

## 🧪 Execução e Testes

- **Modo Desenvolvimento:**  
    ```bash
    npm run dev
    ```
    - Servidor local na porta 5173
    - Hot reload habilitado

- **Build de Produção:**  
    ```bash
    npm run build
    ```
    - Gera build otimizado na pasta `dist/`

- **Pré-visualização do Build:**  
    ```bash
    npm run preview
    ```

- **Verificação de Tipos:**  
    ```bash
    npm run type-check
    ```

- **Lint e Formatação:**  
    ```bash
    npm run lint        # Verifica problemas de código
    npm run lint:fix    # Corrige problemas automaticamente
    ```

---

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Configurações globais
│   ├── queryClient.ts      # Configuração React Query
│   └── router.tsx          # Configuração de rotas
├── components/             # Componentes reutilizáveis
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PersonCard.tsx
│   ├── SearchBar.tsx
│   ├── Pagination.tsx
│   └── StatusBadge.tsx
├── features/               # Funcionalidades principais
│   └── people/
│       ├── list/           # Listagem de pessoas
│       └── details/        # Detalhes da pessoa
├── hooks/                  # Custom hooks
│   ├── usePeople.ts
│   ├── usePerson.ts
│   └── usePeopleStatistics.ts
├── services/               # Serviços externos
│   └── api.ts              # Configuração Axios
├── types/                  # Definições TypeScript
│   └── person.ts
└── router/                 # Configuração de rotas
    └── index.tsx
```

---

## 🔗 Endpoints da API

- **Listagem com Filtros**
    ```
    GET /pessoas/aberto/filtro
    Parâmetros:
    - pagina: number (base 0)
    - porPagina: number
    - nome?: string
    - sexo?: "MASCULINO" | "FEMININO"
    - status?: "DESAPARECIDO" | "LOCALIZADO"
    ```

- **Detalhes da Pessoa**
    ```
    GET /pessoas/{id}
    ```

- **Estatísticas**
    ```
    GET /pessoas/aberto/estatistico
    ```

- **Adicionar Observação**
    ```
    POST /pessoas/{id}/observacao
    Body: { observacao: string }
    ```

---

## 🚨 Tratamento de Erros

O sistema implementa tratamento robusto de erros:

- **500 - Erro interno:** "Servidor temporariamente indisponível"
- **404 - Não encontrado:** "Recurso não encontrado"
- **401/403 - Autorização:** "Acesso negado"
- **Timeout:** "Sem resposta do servidor"
- **Rede:** "Verifique sua conexão"

---

## 📱 Responsividade

- Mobile First Design
- Grid adaptativo para diferentes telas
- Navegação otimizada para touch

---

## 🎨 Design System

- **Cores principais:** Tons de cinza
- **Tipografia:** Sistema de fonts nativo
- **Componentes:** Design consistente e acessível
- **Estados:** Loading, erro, vazio bem definidos

---

## 🔧 Configurações Adicionais

- **Tailwind CSS:** Classes utilitárias, gradientes, animações, responsividade
- **TypeScript:** Strict mode, interfaces bem definidas, tipagem completa da API
- **React Query:** Cache otimizado, retry automático, background refetch
- **Zod + React Hook Form:** Validação e gerenciamento de formulários

---

**Desenvolvido com ❤️**
