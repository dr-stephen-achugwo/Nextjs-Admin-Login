import Link from "next/link"
import useAuth from '../../data/hook/useAuth'

interface AvatarUsuarioProps{
    //caso o usuário queira personalizar a stilo da imagem
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps){
    const {usuario} = useAuth()

    return (
        <Link href="/perfil">
            <img 
                src={usuario?.imagemUrl ?? '/images/avatar.svg'} 
                alt="Avatar User" 
                className={`
                    h-10 w-10 rounded-full cursos-pointer
                    ${props.className} 
                `}
            />
        </Link>
    )
}