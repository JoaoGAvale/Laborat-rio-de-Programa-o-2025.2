'use client'
import React, {useState} from "react";
import UserAlert from "../components/Alert";

export default function LoginPage(){

    const [email,setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [alerta, setAlerta] = useState(true)
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
            setAlerta(true)
            console.log("Erro ao logar")
        } else {
            localStorage.setItem("user", JSON.stringify(usuarioLogado));
            console.log(usuarioLogado)
        }
    }

    function disableButtom(){
        return (!email.trim() || !senha.trim())
    }

    return(
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular']">
        <UserAlert
            isError={false}
            topMessage={"Teste"} 
            bottomMessage={"Testando aqui um negócio..."}
            isVisible={alerta}
            onClose={()=>{setAlerta(false)}}
        />
        <div className="flex flex-col gap-10">
            <div className="page-title text-center">LOGIN</div>
            <div className="w-full flex flex-col shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] p-[60px] rounded-md gap-4">
                <div>
                    <span className="text-[14px] text-left block ml-1">
                        E-MAIL
                    </span>
                    <input
                    type="text"
                    placeholder="Informe um e-mail"
                    value={email}
                    className="w-full p-[11px] border-2 rounded-md border-gray-300 focus:border-gray-500"
                    onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <span className="text-[14px] text-left block ml-1">
                        SENHA
                    </span>
                    <input
                    type="password"
                    placeholder="Informe a senha"
                    value={senha}
                    className="w-full p-[11px] border-2 rounded-md border-gray-300 focus:border-gray-500"
                    onChange={(e)=>setSenha(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-row justify-end pt-[24px]">
                    <button 
                        className={`bg-green-400 px-5 border-2 border-green-600 rounded-full w-[200px] h-[50px] ${disableButtom() ? "border-pink-500 text-pink-600 bg-white opacity-70" : " hover:bg-green-500 text-white"}`}
                        onClick={()=>{setUsuarioLocalStorage()}}
                        disabled={disableButtom()}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}