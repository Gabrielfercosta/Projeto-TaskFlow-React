import { useState, useEffect } from 'react'

function useDebounce(valor, delay) {
  const [valorDebounced, setValorDebounced] = useState(valor)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDebounced(valor)
    }, delay)
    
    return () => clearTimeout(timer)
    
  }, [valor, delay])
  
  return valorDebounced
}

export default useDebounce;