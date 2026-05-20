import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjetoDetalhe from './pages/ProjetoDetalhe'
import Sidebar from './pages/Sidebar'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inicio" element={<Sidebar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projeto/:id" element={<ProjetoDetalhe />} />
      <Route path="*" element={<h2>Página não encontrada</h2>} />
    </Routes>
  )
}

export default App