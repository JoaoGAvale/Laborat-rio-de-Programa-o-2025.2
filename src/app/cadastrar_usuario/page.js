'use client'
import React, {useState, useEffect} from "react";
import { TextInput } from "../components/TextInput";
import { Botao } from "../components/Botao";
import { RadioInput } from "../components/RadioInput";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";

/*
Nome
CNPJ
E-mail
Senha
Tipo de Usuário
Endereço
*/

export default function RegisterUserPage(){
    const [nome, setNome] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const tipos = ["Doador","Receptor"]
    const [tipoSelecionado, setTipoSelecionado] = useState("")
    const router = useRouter()
    const {showAlert} = useAlert()

    function disableButtom(){
        return(cnpj.trim().length < 18 || !nome.trim() || !email.trim() || senha.trim().length < 8 || !confirmarSenha.trim() || !tipoSelecionado || senha !==confirmarSenha)
    }

    function cadastrarUsuario(){
        showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage:"Usuário cadastrado com sucesso.",
        })
        const usuarioCadastrado = {
            email: email,
            senha: senha,
            nome:nome,
            id:tipoSelecionado === "Doador" ? 1 : 2,
            perfil:tipoSelecionado
        }
        localStorage.setItem("user", JSON.stringify(usuarioCadastrado));
        router.push(`usuario/${tipoSelecionado === "Doador" ? 1 : 2}`)
    }

    useEffect(()=>{
        console.log("Tipo: ", tipoSelecionado)
    },[tipoSelecionado])

    return(
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular']">
            <div className="flex flex-col gap-10">
                <div className="page-title mt-[60px] text-center">CADASTRO DE USUÁRIO</div>
                <span className="text-gray-600 text-center">
                    Informe os dados abaixo para realizar o cadastro de usuário.
                </span>
                <div className="w-full flex flex-col items-center shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] p-[60px] rounded-md gap-4 mb-10">
                    <TextInput
                        value={nome}
                        setValue={setNome}
                        label={"NOME"}
                        placeholder="Digite o nome"
                        type="text"
                    />
                    <TextInput
                        value={cnpj}
                        setValue={setCnpj}
                        label={"CNPJ"}
                        placeholder="Digite o CNPJ"
                        type="text"
                        mask="cnpj"
                    />
                    <TextInput
                        value={email}
                        setValue={setEmail}
                        label={"E-MAIL"}
                        placeholder="Digite o e-mail"
                        type="text"
                    />
                    <RadioInput
                        values={tipos}
                        setSelectedValue={setTipoSelecionado}
                        selectedValue={tipoSelecionado}
                        mainLabel="TIPO DE USUÁRIO"
                        labels={tipos}
                    />
                    <TextInput
                        value={senha}
                        setValue={setSenha}
                        label={"SENHA"}
                        placeholder="Digite a senha"
                        type="password"
                    />
                    <TextInput
                        value={confirmarSenha}
                        setValue={setConfirmarSenha}
                        label={"CONFIRMAR SENHA"}
                        placeholder="Confirme a senha"
                        type="password"
                    />
                    <div className="flex flex-row justify-between w-full max-w-[720px] pt-[24px]">
                        <Botao
                            onClick={()=>{router.back()}}
                            disabled={false}
                            type="cancel"
                            text="CANCELAR"
                        />
                        <Botao
                            onClick={()=>{cadastrarUsuario()}}
                            type="normal"
                            disabled={disableButtom()}
                            text="CONFIRMAR"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}