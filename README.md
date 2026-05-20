# TaskFlow

Aplicação de gerenciamento de projetos com quadro Kanban, construída com React.

## Funcionalidades

- Autenticação simples com controle de rotas protegidas
- Criação e exclusão de projetos
- Quadro Kanban por projeto com as colunas: Backlog, A Fazer, Em Progresso e Concluído
- Drag and drop de tarefas entre colunas
- Busca de projetos com debounce
- Dashboard com estatísticas gerais (total de projetos, tarefas concluídas e pendentes)
- Tema claro/escuro
- Persistência via localStorage

## Tecnologias e conceitos

- React 18
- @dnd-kit/core (drag and drop)
- Tailwind CSS
- Vitest

**Conceitos React utilizados**
- `useReducer`, `useState`, `useEffect`, `useMemo`
- `Context API` — `AuthContext` e `ThemeContext`
- Hook customizado `useDebounce`
- Rotas protegidas e dinâmicas com React Router

## Como rodar

```bash
npm run dev
```

## Testes

```bash
npm run test
```
