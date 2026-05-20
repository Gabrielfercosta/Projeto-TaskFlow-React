import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import '.././index.css'

function Login() {
  const navigate = useNavigate()
  const { setLogado } = useContext(AuthContext)

  function entrar() {
    setLogado(true)
    navigate('/inicio')
  }

  return (
    <div className='flex justify-center items-center h-screen m-0 bg-gray-950'>
      <div className='border border-gray-800 shadow-xl rounded p-10 bg-gray-900 text-white w-96 text-center'>
        <h2 className='text-2xl font-bold mb-6'>Kanban - Login</h2>
        <button onClick={entrar} className='bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm font-medium transition-colors cursor-pointer w-full'>
          Entrar no Sistema
        </button>
      </div>
    </div>
  )
}

export default Login