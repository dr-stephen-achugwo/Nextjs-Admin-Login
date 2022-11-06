import { createContext, useEffect, useState } from "react";

//essa info será pega do localstorage do usuário e não 
//mais setado por padrão
//type Tema = 'dark' | ''

interface AppContextProps  {
   tema?: string
  alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})  

export function AppProvider(props) {

    const [tema, setTema] = useState('dark')

    function alternarTema() {
      const novoTema = tema === '' ? 'dark' : '' 
      setTema(novoTema )
      localStorage.setItem('tema', novoTema)
   }

   useEffect(()=> {
      const temaSalvo = localStorage.getItem('tema')
      setTema(temaSalvo)
   }, [])

    return (
        <AppContext.Provider value = {{
            tema,
            alternarTema
        }}>
            {props.children}

        </AppContext.Provider>

    )
}

export default AppContext