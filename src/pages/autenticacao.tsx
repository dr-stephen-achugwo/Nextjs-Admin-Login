import { useState } from "react";
import AuthImput from "../components/auth/AuthImput";
import { IconeWarn } from "../components/icons/index";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {

        const {cadastrar, login, loginGoogle} = useAuth()

        const [erro, setErro] = useState(null)
        const [modo, setModo ] = useState<'login' | 'cadastro'>('login')
        const [email, setEmail] = useState('')
        const [senha, setSenha] = useState('')

        function exibirErro(msg, tempoEmSeconds = 2){
            setErro(msg)
            setTimeout(()=> setErro(null), tempoEmSeconds * 1000)
        }

        async function submeter(){
            try{
                if (modo === 'login') {
                    await login(email, senha)
                    //console.log('login')
                    //showError('There was an error in login!!')
                }else {
                    await cadastrar(email, senha)
                    //console.log('register')
                    //displayError('There was an error in the Registration!!')
                } 
            }catch(e) {
                    exibirErro(e?.message ?? 'Erro inesperado!!')
                
            }

        }

        return (
            <div className="flex  h-screen items-center justify-center">
                <div className="hidden md:block md:w-1/2 lg:w-2/3">
                    <img 
                        src="https://source.unsplash.com/random" 
                        alt="Imagem da tela de autenticação" 
                        className="h-screen w-full object-cover"
                    />
                </div>

                <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                    <h1 className={`
                        text-3xl font-bold mb-5
                    `}>
                        {modo === 'login' ? "Login with your account" : "Register on the platform"}
                    </h1>
                    
                    {erro ? (
                        <div className={`
                                flex items-center
                                bg-red-400 text-white py-3 px-5 my-2
                                border-2 border-red-700 rounded-lg
                            `}>
                                {IconeWarn}
                            <span className="ml-3" >{erro}</span>

                        </div>       
                    ): false}



                    <AuthImput 
                        label="Email"
                        tipo ="email"
                        valor={email}
                        valorMudou={setEmail}
                        obrigatorio
                    />
                    <AuthImput 
                        label="Password"
                        tipo ="password"
                        valor={senha}
                        valorMudou={setSenha}
                        obrigatorio
                    />
                    <button onClick={submeter} className={`
                        w-full bg-indigo-500 hover:bg-indigo-400 
                        text-white rounded-lg px-4 py-3 mt-6
                    `}>
                    {modo === 'login' ? "Log in" : "register"}
                    </button>
                    
                    <hr className="my-6 border-gray-300 w-full" /*margin eixo y*/ />

                    <button onClick={loginGoogle} className={`
                        w-full bg-red-500 hover:bg-red-400 
                        text-white rounded-lg px-4 py-3
                    `}>
                       
                      Login with Google
                   
                    </button>

                    {modo === 'login' ? (
                        <p className="mt-8">
                            Are you new here?
                            <a onClick={() => setModo('cadastro')} className={`
                                text-blue-500 hover:text-blue-700 font-semi-bold 
                                cursor-pointer 
                            `}> Create a free Account
                            </a>
                        </p>
                    ) : (

                        <p className="mt-8">
                        Already part of our community?
                        <a onClick={() => setModo('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semi-bold 
                            cursor-pointer 
                        `}> Login with your Credentials
                        </a>
                    </p>
                    )}

                </div>
            </div>
        )
}
