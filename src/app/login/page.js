'use client'

import React, {useState} from "react";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";
import { TextInput } from "../components/TextInput";
import { Botao } from "../components/Botao";
import { API_ROUTES } from "../utils/routes";
import { apiFetch } from "../utils/apifetch";

export default function LoginPage(){

    const [email,setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const router = useRouter()
    const { showAlert } = useAlert();

    async function login(){
        try{
            setIsLogin(true)
            const response = await apiFetch(API_ROUTES.AUTH.LOGIN,{
                method:"POST",
                auth:true,
                body:{
                    email:email,
                    password:senha
                },
            }
            )
            const data = await response.json()
            if(!response.ok){
                throw new Error("Erro ao realizar login de usuário.")
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage:"Login realizado com sucesso.",
            })
            router.push('/inicio')
        }catch{
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage:"Erro ao realizar login de usuário.",
            })
            setIsLogin(false)
        }
    }

    function disableButtom(){
        return (!email.trim() || !senha.trim() || isLogin)
    }

    return(
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] mb-10">
        <div className="flex flex-col items-center gap-10">
            <div className="page-title mt-[60px] text-center">LOGIN</div>
            <span className="text-gray-600 text-center">
                Informe os dados abaixo para realizar o login no sistema.
            </span>
            <div className="w-full flex flex-col items-center shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] p-[60px] rounded-md gap-4">
                <TextInput
                    value={email}
                    setValue={setEmail}
                    label={"E-MAIL"}
                    placeholder="Digite o e-mail"
                    type="text"
                />
                <TextInput
                    value={senha}
                    setValue={setSenha}
                    label={"SENHA"}
                    placeholder="Digite a senha"
                    type="password"
                />
                <div className="flex flex-col items-center w-full pt-[24px]">
                    <Botao
                        onClick={()=>login()}
                        disabled={disableButtom()}
                        type={isLogin?"cancel":"normal"}
                        loading={isLogin}
                        text="CONFIRMAR"
                    />
                </div>
            </div>
            <a href="/cadastrar_usuario" className="text-green-800 cursor-pointer text-center w-fit hover:text-green-600">
                Ainda não está cadastrado?
            </a>
        </div>
    </div>
    )
}