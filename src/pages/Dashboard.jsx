import { useContext, useState, useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'
import Sidebar from './Sidebar'
import { estadoInicial } from '../reducers/kanbanReducer'
import '.././index.css'

function Dashboard() {
  const { logado } = useContext(AuthContext)
  if (!logado) return <Navigate to="/login" replace />

  const [atualizar, setAtualizar] = useState(0)
  const { temaEscuro } = useContext(ThemeContext)

  useEffect(() => {
    const escutarMudanca = () => setAtualizar(prev => prev + 1)
    window.addEventListener('projetos_mudaram', escutarMudanca)
    return () => window.removeEventListener('projetos_mudaram', escutarMudanca)
  }, [])
  
  const estatisticas = useMemo(() => {
    const projetos = JSON.parse(localStorage.getItem("projetos")) || []
    let concluidas = 0, pendentes = 0
    projetos.forEach(projeto => {
        const item = localStorage.getItem(`colunas_${projeto.id}`)
        const colunasSalvas = item ? JSON.parse(item) : estadoInicial
        concluidas += colunasSalvas.DONE.length
        pendentes += (colunasSalvas.BACKLOG.length + colunasSalvas.TODO.length + colunasSalvas.DOING.length)
    })
    return { totalProjetos: projetos.length, tarefasConcluidas: concluidas, tarefasPendentes: pendentes }
  }, [atualizar])
  
  return (
    <div className='flex h-screen m-0 bg-gray-950'>
      <Sidebar /> 
      <div className={`flex-1 p-8 overflow-x-auto flex flex-col gap-6 ${temaEscuro ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
          <div className={`border p-6 rounded-xl flex flex-col gap-2 ${temaEscuro ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'}`}>
              <h3 className={`text-sm font-medium ${temaEscuro ? 'text-gray-400' : 'text-gray-500'}`}>Total de Projetos</h3>
              <p className='text-4xl font-bold text-blue-500'>{estatisticas.totalProjetos}</p>
          </div>
          <div className={`border p-6 rounded-xl flex flex-col gap-2 ${temaEscuro ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'}`}>
              <h3 className={`text-sm font-medium ${temaEscuro ? 'text-gray-400' : 'text-gray-500'}`}>Tarefas Concluídas</h3>
              <p className='text-4xl font-bold text-green-500'>{estatisticas.tarefasConcluidas}</p>
          </div>
          <div className={`border p-6 rounded-xl flex flex-col gap-2 ${temaEscuro ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'}`}>
              <h3 className={`text-sm font-medium ${temaEscuro ? 'text-gray-400' : 'text-gray-500'}`}>Tarefas Pendentes</h3>
              <p className='text-4xl font-bold text-yellow-500'>{estatisticas.tarefasPendentes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard