import route from '../../../node_modules/next/router'
import { createContext, useState, useEffect } from "react"
//import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import firebase from "../../firebase/config"
import Usuario from "../../model/Usuario"

interface AuthContextProps{
    usuario?: Usuario
    carregando?: boolean
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}


const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado( usuarioFirebase: firebase.User): Promise<Usuario>{
    const token = await usuarioFirebase.getIdToken()

    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displeyName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado){
        Cookies.set('admin-template-decantar-auth', logado, {
           // quantidade de dias 
            expires: 7
        })
    } else {
            Cookies.remove('admin-template-decantar-auth')
        }
    
}

export function AuthProvider(props) {
    //gif de imagem carregando 
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase){
        if (usuarioFirebase?.email){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        }else{
            
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email, senha){
        try {
            setCarregando(true)
            //console.log('Login Google...')
            const resp = await firebase.auth()
                .signInWithEmailAndPassword(email, senha)

                await configurarSessao(resp.user)
            route.push('/') //caminho para onde ir 
        }finally {
            setCarregando(false)
        }

    }


    async function cadastrar(email, senha){
        try {
            setCarregando(true)
            //console.log('Login Google...')
            const resp = await firebase.auth()
                .createUserWhitEmailAndPassword(email, senha)
               

            await configurarSessao(resp.user)
            route.push('/') //caminho para onde ir 
        }finally {
            setCarregando(false)
        }

    }

    async function loginGoogle(){
        try {
            setCarregando(true)
            //console.log('Login Google...')
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            ) 

            await configurarSessao(resp.user)
            route.push('/') //caminho para onde ir 
        }finally {
            setCarregando(false)
        }

    }

    async function logout(){
        try{
            setCarregando(true)
            await firebase.auth().signOut() 
            await configurarSessao(null) 
        } finally {
            setCarregando(false)
        }
    }

    useEffect( () => {
        //possibility verification if cookie is  
        if (Cookies.get('admin-template-decantar-auth')){
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            //se nao setar aqui ele fica carregando eternamente 
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            login,
            cadastrar,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext