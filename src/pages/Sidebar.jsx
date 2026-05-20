import { Link } from 'react-router-dom'
import '.././index.css'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeContext'
import useDebounce from '../hooks/useDebounce'

function Sidebar() {
  const { logado } = useContext(AuthContext)
  if (!logado) return <Navigate to="/" replace />
  
  const [projetos, setProjetos] = useState(() => {
    const salvo = localStorage.getItem("projetos")
    return salvo ? JSON.parse(salvo) : []
  })
  
  useEffect(() => {
    localStorage.setItem("projetos", JSON.stringify(projetos))
    window.dispatchEvent(new Event('projetos_mudaram'))
  }, [projetos])
  
  const [busca, setBusca] = useState('') 
  const [novoProjeto, setNovoProjeto] = useState('')
  const {id} = useParams()
  const navigate = useNavigate()
  const { mudarTema, temaEscuro } = useContext(ThemeContext)
  const buscaDebounced = useDebounce(busca, 300)

  function Adicionar(){
    if (!novoProjeto.trim("")) {return}
    const objeto = {id: window.crypto.randomUUID(), nome: novoProjeto}
    setProjetos([...projetos, objeto])
    setNovoProjeto('')
  }

  function Deletar(idR){
    setProjetos(projetos.filter(projeto => projeto.id !== idR))
    window.dispatchEvent(new Event('projetos_mudaram'))

    if (idR === id){
      navigate('/dashboard')
    }
  }

return (
    <div className={`flex h-screen m-0 ${temaEscuro ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className={`w-64 h-full border-r flex flex-col p-5 gap-4 ${temaEscuro ? 'bg-gray-900 text-white border-gray-800' : 'bg-gray-100 text-gray-900 border-gray-300'}`}>
        <button className='text-left text-sm opacity-80' onClick={mudarTema}>
          {temaEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
        <h2 className='text-xl font-bold text-center'>Seus Projetos</h2>
        <input placeholder='Buscar Projeto' value={busca} onChange={e => setBusca(e.target.value)} className={`p-2 rounded border text-sm w-full ${temaEscuro ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}/>
        <ul className='flex-1 flex flex-col gap-2 overflow-y-auto'>
          {projetos.filter(projeto => projeto.nome.toLowerCase().includes(buscaDebounced.toLowerCase())).map(projeto => (
            <li key={projeto.id} className='flex justify-between items-center py-1 border-b border-gray-400/20'>
              <Link to={`/projeto/${projeto.id}`} className='hover:underline truncate max-w-[80%]'>
                {projeto.nome}
              </Link> 
              <button onClick={() => Deletar(projeto.id)} className='text-xs p-1'>❌</button>
            </li>
          ))}
          <input className={`p-2 border mt-4 text-sm w-full rounded ${temaEscuro ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder='Adicionar Projeto' value={novoProjeto} onChange={e => setNovoProjeto(e.target.value)}/>
          <button className='p-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 w-full' onClick={Adicionar}>
            Adicionar
          </button>
        </ul>
        <button className='p-2 rounded bg-gray-700 text-white text-sm font-medium hover:bg-gray-600 w-full' onClick={() => navigate("/dashboard")}>
          Ir para o Dashboard
        </button>
      </div>
    </div>
  )
}

export default Sidebar