import { useDraggable } from '@dnd-kit/core'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

function Card({ tarefa, coluna, onRemover }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: tarefa.id })
  const { temaEscuro } = useContext(ThemeContext)

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={{ opacity: isDragging ? 0.5 : 1 }} className={`flex justify-between items-center p-3 rounded-lg border cursor-grab active:cursor-grabbing ${temaEscuro ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-sm'}`}>
      <p>{tarefa.titulo}</p>
      <button 
        onClick={() => onRemover(tarefa.id, coluna)} 
        onPointerDown={(e) => e.stopPropagation()} 
        className={`p-1 ml-2 ${temaEscuro ? 'text-gray-400' : 'text-gray-500'}`}
      >
        ❌
      </button>
    </div>
  )
}

export default Card