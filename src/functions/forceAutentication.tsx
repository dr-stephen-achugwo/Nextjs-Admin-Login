import Head from '../../node_modules/next/head'
import Image from '../../node_modules/next/image'
import router from '../../node_modules/next/router'
import loading from '../../public/images/loading.gif'
import useAuth from '../data/hook/useAuth'

export default function ForceAutentication(jsx){

    const {usuario, carregando } = useAuth()

    function rederizarConteudo(){

        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            if(!document.cookie.includes('admin-template-decantar-auth=true')){ 
                                window.localStorage
                            }
                            `
                        }}
                    />
                </Head>
                {jsx}
            </>
        )
    }

    function renderizarCarregando(){
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                {/* define load image */}

            <Image src={loading}/> 
            </div>
        )
    }

    if (!carregando && usuario?.email){
        return rederizarConteudo()
    }else if(carregando){
        return renderizarCarregando()
    }else {
        router.push('/autenticacao')
        return null
    }

}