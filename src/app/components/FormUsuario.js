"use client"

import React, {useState, useEffect} from "react"
import { apiFetch } from "../utils/apifetch";
import { API_ROUTES } from "../utils/routes";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";
import { PageLoading } from "./PageLoading";
import { Botao } from "@/app/components/Botao";
import { TextInput } from "./TextInput";
import { RadioInput } from "./RadioInput";

export const FormUsuario = ({
    pagina = "cadastrar"
}) => {

    // Usado nas 3 páginas
    const [nome, setNome] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const tipos = ["Doador","Receptor"]
    const [tipoSelecionado, setTipoSelecionado] = useState("")
    const router = useRouter()
    const {showAlert} = useAlert()
    const [isLoading, setIsLoading] = useState(true)
    const [realizandoOperacao,setRealizandoOperacao] = useState(false)
    const tiposPagina = [
        "cadastrar",
        "visualizar",
        "editar"
    ]
    const titles = [
        "CADASTRAR USUÁRIO",
        "VISUALIZAR USUÁRIO",
        "EDITAR USUÁRIO"
    ]
    const labels = [
        "Informe os dados abaixo para realizar o cadastro de usuário.",
        "Confira abaixo as informações do usuário.",
        "Informe os dados de usuário que devem ser alterados."
    ]
    const actions = [
        cadastrarUsuario,
        moverParaEditar,
        editarUsuario,
    ]

    const mainButtonText = tiposPagina.includes(pagina) && pagina !== "visualizar" ? "CONFIRMAR" : pagina === "visualizar" ? "EDITAR" : ""
    const cancelButtonText = tiposPagina.includes(pagina) && pagina !== "visualizar" ? "CANCELAR" : pagina === "visualizar" ? "VOLTAR" : ""
    const mainButtonAction = pagina === "cadastrar" ? actions[0] : pagina === "visualizar" ? actions[1] : pagina === "editar" ? actions[2] : ""
    const title = pagina === "cadastrar" ? titles[0] : pagina === "visualizar" ? titles[1] : pagina === "editar" ? titles[2] : ""
    const label = pagina === "cadastrar" ? labels[0] : pagina === "visualizar" ? labels[1] : pagina === "editar" ? labels[2] : ""

    // Usado em visualizar e editar
    async function carregar_dados() {
        try {
            setIsLoading(true);
            
            const userStored = JSON.parse(localStorage.getItem("user"));
            
            if (!userStored || !userStored.id_usuario) {
                throw new Error("Usuário não encontrado no cache local.");
            }

            const response = await apiFetch(API_ROUTES.USUARIO.GET(userStored.id_usuario), {
                method: "GET",
                auth: true
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar dados no servidor.");
            }

            const data = await response.json();
            console.log("Dados vindos do Backend:", data);

            setNome(data.nome);
            setCnpj(data.cnpj);
            setEmail(data.email);
            setTipoSelecionado(data.perfil);

        } catch (error) {
            console.error("Erro no fetch:", error);
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage: "Não foi possível carregar os dados atualizados do usuário.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Usado nas 3 páginas. Só
    function disableButtom(){
        if(tiposPagina.includes(pagina) && pagina !== "visualizar"){
            return(
                cnpj.trim().length < 18 || 
                !nome.trim() || 
                !email.trim() || 
                ((senha.trim().length < 3 || 
                senha !==confirmarSenha) && 
                pagina === "cadastrar") ||
                !tipoSelecionado
            )
        }
        return false
    }
    async function sair(){
        try{
            setRealizandoOperacao(true)
            const response = await apiFetch(API_ROUTES.AUTH.LOGOUT,{
                method:"POST",
                auth:true
            })
            if(!response.ok){
                const data = await response.json()
                console.error(data)
                throw new Error(data.msg)
            }
            showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage:"Logout realizado com sucesso.",
            })
            localStorage.removeItem("user");
            router.push(`/inicio`)
        }catch(e){
            if(e.message === "Token has expired"){
                showAlert({
                    isError: true,
                    topMessage: "Erro!",
                    bottomMessage:"Sua sessão expirou.",
                })
                localStorage.removeItem("user");
                router.push(`/inicio`)
            }else{
                showAlert({
                    isError: true,
                    topMessage: "Erro!",
                    bottomMessage:"Erro ao realizar logout de usuário.",
                })
            }
        }finally{
            setRealizandoOperacao(false)
        }
    }

    async function cadastrarUsuario() {
        try{
            setRealizandoOperacao(true)
            const response = await apiFetch(API_ROUTES.USUARIO.CREATE,{
                method:"POST",
                auth:true,
                body:{
                    nome:nome, 
                    cnpj:cnpj, 
                    perfil:tipoSelecionado, 
                    email:email,
                    password:senha
                }
            })
            const data = await response.json()
            if(!response.ok){
                if (response.status === 409){
                    throw new Error("O email informado já está sendo utilizado.")
                }
                throw new Error("Erro ao cadastrar usuário. Tente novamente mais tarde.")
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage:"Usuário cadastrado com sucesso.",
            })
            router.push('/inicio')
        }catch(e){
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage:e.message,
            })
        }finally{
            setRealizandoOperacao(false)
        }
    }

    async function editarUsuario() {
        try{
            setRealizandoOperacao(true)
            const response = await apiFetch(API_ROUTES.USUARIO.UPDATE,{
                method:"PUT",
                auth:true,
                body:{
                    nome:nome, 
                    cnpj:cnpj, 
                    email:email,
                }
            })
            const data = await response.json()
            if(!response.ok){
                if (response.status === 409){
                    throw new Error("O email informado já está sendo utilizado.")
                }
                throw new Error("Erro ao editar usuário. Tente novamente mais tarde.")
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage:"Usuário editado com sucesso.",
            })
            router.push('/usuario')
        }catch(e){
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage:e.message,
            })
        }finally{
            setRealizandoOperacao(false)
        }
    }

    function moverParaEditar(){
        router.push(`/usuario/editar_usuario`)
    }

    useEffect(()=>{
        if(tiposPagina.includes(pagina) && pagina !== "cadastrar"){
            carregar_dados()
        }else{
            setIsLoading(false)
        }
    },[])

    return(isLoading ? <PageLoading/> :
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center font-['PoppinsRegular'] mb-10">
            <div className="flex flex-col items-center gap-10 w-full">
            
            {/* Título da página */}
            <div className="page-title mt-[60px] text-center">
                {title}
            </div>
    
            <span className="text-gray-600 text-center">
                {label}
            </span>
    
            {/* Container */}
            <div className="w-full flex flex-col items-center shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] p-[60px] rounded-md gap-6 bg-white">
                <TextInput
                    value={nome}
                    setValue={setNome}
                    label={"NOME"}
                    placeholder="Digite o nome"
                    disabled={pagina==="visualizar"}
                    type="text"
                />
                <TextInput
                    value={cnpj}
                    setValue={setCnpj}
                    label={"CNPJ"}
                    placeholder="Digite o CNPJ"
                    disabled={pagina==="visualizar"}
                    type="text"
                    mask="cnpj"
                />
                <TextInput
                    value={email}
                    setValue={setEmail}
                    label={"E-MAIL"}
                    placeholder="Digite o e-mail"
                    disabled={pagina==="visualizar"}
                    type="text"
                />
                {/*Utilizado na visualização e edição (não pode mudar, fica disabled sempre)*/}
                {tiposPagina.includes(pagina) && pagina!=="cadastrar" ?
                    <TextInput
                        value={tipoSelecionado}
                        setValue={setTipoSelecionado}
                        label={"PERFIL"}
                        disabled
                        type="text"
                    />
                : pagina === "cadastrar" ?
                    <>
                        <RadioInput
                            values={tipos}
                            setSelectedValue={setTipoSelecionado}
                            selectedValue={tipoSelecionado}
                            mainLabel="PERFIL"
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
                    </>
                : ""
                }
                {/* Botões */}
                <div className="flex flex-row justify-between w-full max-w-[720px] pt-[24px]">
                <Botao
                    onClick={() => router.back()}
                    type="cancel"
                    text={cancelButtonText}
                />
                <Botao
                    onClick={mainButtonAction}
                    type={realizandoOperacao?"cancel":"normal"}
                    loading={realizandoOperacao}
                    text={mainButtonText}
                    disabled={disableButtom()}
                />
                </div>
            </div>
            {pagina ==="cadastrar" &&
                <a href="/login" className="text-green-800 cursor-pointer text-center w-fit hover:text-green-600">
                    Já possui usuário cadastrado?
                </a>
            }
            {pagina === "visualizar" &&
                <Botao
                    onClick={() => sair()}
                    type="cancel"
                    loading={realizandoOperacao}
                    disabled={realizandoOperacao}
                    text="SAIR"
                />
            }
            </div>
        </div>
    )
}