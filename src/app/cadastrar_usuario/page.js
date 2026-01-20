'use client'

import React, { useState } from "react";
import { TextInput } from "../components/TextInput";
import { Botao } from "../components/Botao";
import { RadioInput } from "../components/RadioInput";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "../utils/routes";
import { apiFetch } from "../utils/apifetch";

export default function RegisterUserPage(){

    const [nome, setNome] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const tipos = ["Doador","Receptor"]
    const [tipoSelecionado, setTipoSelecionado] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)

    const router = useRouter()
    const { showAlert } = useAlert()

    function disableButtom(){
        return(
            cnpj.trim().length < 18 ||
            !nome.trim() ||
            !email.trim() ||
            !telefone.trim() ||
            senha.trim().length < 8 ||
            !confirmarSenha.trim() ||
            !tipoSelecionado ||
            senha !== confirmarSenha ||
            isRegistering
        )
    }

    async function cadastrarUsuario(){
        try{
            setIsRegistering(true)

            const response = await apiFetch(API_ROUTES.AUTH.REGISTER,{
                method:"POST",
                body:{
                    nome,
                    email,
                    password: senha,
                    cnpj,
                    perfil: tipoSelecionado,
                    telefone
                }
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "Erro ao cadastrar usuário")
            }

            localStorage.setItem("user", JSON.stringify(data.user))

            showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage:"Usuário cadastrado com sucesso.",
            })

            router.push("/inicio")

        }catch(err){
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage: err.message || "Erro ao cadastrar usuário.",
            })
            setIsRegistering(false)
        }
    }

    return(
        <div className="w-full min-h-screen bg-gray-50 flex flex-col mb-10">
            <div className="flex flex-col items-center gap-10">
                <div className="page-title mt-[60px] text-center">
                    CADASTRO DE USUÁRIO
                </div>

                <div className="w-full flex flex-col items-center shadow p-[60px] rounded-md gap-4">

                    <TextInput label="NOME" value={nome} setValue={setNome} />
                    <TextInput label="CNPJ" value={cnpj} setValue={setCnpj} mask="cnpj" />
                    <TextInput label="E-MAIL" value={email} setValue={setEmail} />
                    <TextInput
                        label="TELEFONE"
                        value={telefone}
                        setValue={setTelefone}
                        mask="phone"
                    />

                    <RadioInput
                        values={tipos}
                        setSelectedValue={setTipoSelecionado}
                        selectedValue={tipoSelecionado}
                        mainLabel="TIPO DE USUÁRIO"
                        labels={tipos}
                    />

                    <TextInput label="SENHA" value={senha} setValue={setSenha} type="password"/>
                    <TextInput label="CONFIRMAR SENHA" value={confirmarSenha} setValue={setConfirmarSenha} type="password"/>

                    <Botao
                        onClick={cadastrarUsuario}
                        disabled={disableButtom()}
                        loading={isRegistering}
                        text="CONFIRMAR"
                    />
                </div>
            </div>
        </div>
    )
}
