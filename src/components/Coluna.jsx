import { useDroppable } from '@dnd-kit/core'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import Card from './Card' 

function Coluna({ id, label, tarefas, onRemover }) { 
  const { setNodeRef, isOver } = useDroppable({ id }) 
  const { temaEscuro } = useContext(ThemeContext)

  return (
    <div ref={setNodeRef} className={`flex flex-col flex-1 min-h-[300px] border rounded-xl p-4 ${temaEscuro ? `border-gray-700 ${isOver ? 'bg-gray-700' : 'bg-gray-800'}` : `border-gray-300 ${isOver ? 'bg-gray-200' : 'bg-gray-100'}`}`}>
      <h2 className={`text-lg font-bold mb-4 pb-2 border-b ${temaEscuro ? 'text-gray-200 border-gray-700' : 'text-gray-800 border-gray-300'}`}>
        {label}
      </h2>
      <div className='flex flex-col gap-3 overflow-y-auto'>
        {tarefas.map(tarefa => ( 
          <Card key={tarefa.id} tarefa={tarefa} coluna={id} onRemover={onRemover} />
        ))}
      </div>
    </div>
  )
}

export default Coluna