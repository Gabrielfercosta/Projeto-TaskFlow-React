import { describe, test, expect } from 'vitest'
import { kanbanReducer, estadoInicial } from './kanbanReducer'

describe('Testes do Kanban Reducer', () => {

  test('Adicionar nova tarefa', () => {
    const acao = { 
      type: 'ADICIONAR_TAREFA', 
      payload: 'Estudar para a prova' 
    }
    const novoEstado = kanbanReducer(estadoInicial, acao)
    expect(novoEstado.BACKLOG).toHaveLength(1)
    expect(novoEstado.BACKLOG[0].titulo).toBe('Estudar para a prova')
    expect(novoEstado.BACKLOG[0]).toHaveProperty('id')
  })

  test('Remover tarefa', () => {
    const estadoComTarefa = {
      ...estadoInicial,
      TODO: [{ id: '123', titulo: 'Limpar o quarto' }]
    }
    const acao = { 
      type: 'REMOVER_TAREFA', 
      payload: { tarefaId: '123', coluna: 'TODO' } 
    }
    const novoEstado = kanbanReducer(estadoComTarefa, acao)
    expect(novoEstado.TODO).toHaveLength(0)
  })

  test('Mover tarefa', () => {
    const estadoComTarefa = {
      ...estadoInicial,
      BACKLOG: [{ id: '999', titulo: 'Corrigir bug tema' }]
    }
    const acao = {
      type: 'MOVER_TAREFA',
      payload: { tarefaId: '999', deColuna: 'BACKLOG', paraColuna: 'TODO' }
    }
    const novoEstado = kanbanReducer(estadoComTarefa, acao)
    expect(novoEstado.BACKLOG).toHaveLength(0)
    expect(novoEstado.TODO).toHaveLength(1)
    expect(novoEstado.TODO[0].titulo).toBe('Corrigir bug tema')
  })

})