import { createContext, useState } from 'react'

export const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  const [temaEscuro, setTemaEscuro] = useState(false)

  function mudarTema(){
    setTemaEscuro(!temaEscuro)
  }

  return (
    <ThemeContext.Provider value={{ temaEscuro, mudarTema }}>
      {children}
    </ThemeContext.Provider>
  )
}