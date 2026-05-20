import { useState, useReducer, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DndContext } from '@dnd-kit/core'
import { kanbanReducer, estadoInicial } from '../reducers/kanbanReducer'
import Coluna from '../components/Coluna'
import Sidebar from './Sidebar'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { Navigate } from 'react-router-dom'
import '.././index.css'

function Kanban({ id, navigate, projetoAtual }) {
  const [colunas, dispatch] = useReducer(kanbanReducer, JSON.parse(localStorage.getItem(`colunas_${id}`)) ? JSON.parse(localStorage.getItem(`colunas_${id}`)) : estadoInicial)
  const [novaTarefa, setNovaTarefa] = useState('')
  const { temaEscuro } = useContext(ThemeContext)

  useEffect(() => {
    localStorage.setItem(`colunas_${id}`, JSON.stringify(colunas))
  }, [colunas, id])

  function encontrarColuna(tarefaId) {
    return Object.keys(colunas).find(coluna => colunas[coluna].some(tarefa => tarefa.id === tarefaId))
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return
    const deColuna = encontrarColuna(active.id)
    const paraColuna = over.id
    if (deColuna === paraColuna) return
    dispatch({ type: 'MOVER_TAREFA', payload: { tarefaId: active.id, deColuna, paraColuna } })
  }

  function adicionarTarefa() {
    if (!novaTarefa.trim()) return
    dispatch({ type: 'ADICIONAR_TAREFA', payload: novaTarefa })
    setNovaTarefa('')
  }

  function removerTarefa(tarefaId, coluna) {
    dispatch({ type: 'REMOVER_TAREFA', payload: { tarefaId, coluna } })
  }

  return (
    <div className='flex h-screen m-0 bg-gray-950'>
      <Sidebar /> 
      <div className={`flex-1 p-8 overflow-x-auto flex flex-col gap-6 ${temaEscuro ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div>
          <h1 className='text-2xl font-bold'>Kanban - Projeto: {projetoAtual.nome}</h1>
        </div>
        <div className='flex items-center gap-2'>
          <input value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)} placeholder="Nova tarefa..." className={`border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-64 ${temaEscuro ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-black'}`} />
          <button onClick={adicionarTarefa} className='bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm font-medium transition-colors cursor-pointer'>
            Adicionar
          </button>
        </div>
        <div className={`flex-1 p-6 border rounded-2xl ${temaEscuro ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'}`}>
          <DndContext onDragEnd={handleDragEnd}>
            <div className='flex gap-4 items-start w-full'>
              <Coluna id="BACKLOG" label="Backlog" tarefas={colunas.BACKLOG} onRemover={removerTarefa} />
              <Coluna id="TODO" label="A Fazer" tarefas={colunas.TODO} onRemover={removerTarefa} />
              <Coluna id="DOING" label="Em Progresso" tarefas={colunas.DOING} onRemover={removerTarefa} />
              <Coluna id="DONE" label="Concluído" tarefas={colunas.DONE} onRemover={removerTarefa} />
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

function ProjetoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { logado } = useContext(AuthContext)
  const projetosSalvos = JSON.parse(localStorage.getItem("projetos")) || []
  const projetoAtual = projetosSalvos.find(p => p.id === id)

  if (!logado) return <Navigate to="/" replace />

  return <Kanban key={id} id={id} navigate={navigate} projetoAtual={projetoAtual} />
}

export default ProjetoDetalhe