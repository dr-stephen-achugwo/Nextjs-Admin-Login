
import useAppData from "../../data/hook/useAppData"
import ButtonChangeTheme from "./ButtonChangeTheme"
import Titulo from "./Titulo"
import AvatarUsuario from "./AvatarUsuario"

interface CabecalhoProps {
    titulo: string
    subtitulo: string
   
}

export default function Cabecalho(props: CabecalhoProps) {
    const {tema, alternarTema} = useAppData()

    return (
        <div className={`flex `}>
           <Titulo titulo = {props.titulo} subtitulo = {props.subtitulo}/>
           <div className={`flex flex-grow justify-end items-center`}>
                <ButtonChangeTheme tema={tema} alternarTema= {alternarTema}/>
                <AvatarUsuario className="ml-3"/>
           </div>
        </div>
    )
}