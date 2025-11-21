'use client'
import React, {useState} from "react";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";
import { TextInput } from "../components/TextInput";
import { Botao } from "../components/Botao";

export default function LoginPage(){

    const [email,setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const router = useRouter()
    const { showAlert } = useAlert();
    const mockUsuarios = [
        {
            email: "Doador@gmail.com",
            senha: "123",
            nome:"Doador das Dores Furtado",
            id:1,
            perfil:"Doador"
        },
        {
            email: "Receptor@gmail.com",
            senha: "123",
            nome:"Receptor da Silva Correia",
            id:2,
            perfil:"Receptor"
        }
    ]

    function setUsuarioLocalStorage(){
        const usuarioLogado = mockUsuarios.find(usuario => usuario.email ===email && usuario.senha ===senha)
        if (!usuarioLogado){
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage:"Erro ao realizar login de usuário. Credenciais inválidas.",
            })
            console.log("Erro ao logar")
        } else {
            showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage:"Login realizado com sucesso.",
            })
            localStorage.setItem("user", JSON.stringify(usuarioLogado));
            console.log(usuarioLogado)
            router.push('/inicio')
        }
    }

    function disableButtom(){
        return (!email.trim() || !senha.trim())
    }

    return(
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular']">
        {/* alerta ? 
            <UserAlert
                isError={alerta?.isError}
                topMessage={alerta?.topMessage} 
                bottomMessage={alerta?.bottomMessage}
                onClose={()=>{setAlerta(false)}}
                key={Math.random(0,1000000)}
            /> 
            : 
            ""
        */}
        <div className="flex flex-col gap-10">
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
                        onClick={setUsuarioLocalStorage}
                        disabled={disableButtom()}
                        type="normal"
                        text="CONFIRMAR"
                    />
                </div>
            </div>
        </div>
    </div>
    )
}