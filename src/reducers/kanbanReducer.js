export const COLUNAS = {
  BACKLOG: 'Backlog',
  TODO: 'A Fazer',
  DOING: 'Em Progresso',
  DONE: 'Concluído',
}

export const estadoInicial = {
  BACKLOG: [],
  TODO: [],
  DOING: [],
  DONE: [],
}

export function kanbanReducer(state, action) {
  const uuid = crypto.randomUUID();

  switch (action.type) {
    case 'ADICIONAR_TAREFA':
        return {
            ...state,
            BACKLOG: [...state.BACKLOG, { id: uuid, titulo: action.payload }]
        }
    case 'REMOVER_TAREFA':
        return {
            ...state,
            [action.payload.coluna]: state[action.payload.coluna].filter(a => a.id !== action.payload.tarefaId)
        }
    case 'MOVER_TAREFA': {
        const tarefa = state[action.payload.deColuna].find(t => t.id === action.payload.tarefaId)
        return {
            ...state,
            [action.payload.deColuna]: state[action.payload.deColuna].filter(a => a.id !== action.payload.tarefaId),
            [action.payload.paraColuna]: [...state[action.payload.paraColuna], tarefa]
        }
    }
    default:
      return state
  }
}