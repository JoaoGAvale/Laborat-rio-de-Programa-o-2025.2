'use client'
import React, { useState, useEffect } from "react";
import GenericTable from "../components/GenericTable";
import { Eye } from "lucide-react";
import { PageLoading } from "../components/PageLoading";
import { apiFetch } from "../utils/apifetch";
import { API_ROUTES } from "../utils/routes";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";
import { Spinner } from "../components/Spinner";

export default function NotificationPage(){
    const [notificacoes, setNotificacoes] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [visualizando, setVisualizando] = useState(false)
    const { showAlert } = useAlert();
    const router = useRouter()

    async function carregar_dados() {
        try{
            setIsloading(true)
            const response = await apiFetch(API_ROUTES.NOTIFICACAO.PAGINA,{
                method: "GET",
                auth: true
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error("Erro ao carregar página de notificações.")
            }
            setNotificacoes(data.notificacoes)
        }catch{
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage:"Erro ao buscar dados da página de notificações. Tente novamente mais tarde.",
            })
        }finally{
            setIsloading(false)
        }
    }

    async function visualizarNotificacao(notificacao) {
        try{
            if(notificacao.condicao === "Nao lida"){
                setVisualizando(notificacao.id_notificacao)
                const response = await apiFetch(API_ROUTES.NOTIFICACAO.UPDATE(notificacao.id_notificacao),{
                    method: "PUT",
                    auth: true,
                    body:{
                        condicao:"Lida"
                    }
                })
                const data = await response.json()
                if(!response.ok){
                    throw new Error("Erro ao carregar página de notificações.")
                }
                showAlert({
                    isError: false,
                    topMessage: "Sucesso!",
                    bottomMessage:"Notificação visualizada com sucesso.",
                })
            }
            router.push(`/detalhes/${notificacao.doacao_id}`)
        }catch{
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage:"Erro ao visualizar notificação.",
            })
        }finally{
            setVisualizando(false)
        }
    }

    useEffect(()=>{
        carregar_dados()
    },[])

    const actions = [
    {
      icon: (item) => visualizando === item.id_notificacao ? <Spinner size={16}/> : <Eye size={27} />,
      title: "Ver Detalhes",
      className: "text-green-800",
      onClick: (item) => !visualizando ? visualizarNotificacao(item) : {}
    },
  ];

  const notificationColumns = [
        {
            key: "texto",
            label: "Texto",
            render: (item) => item.texto.length > 50 
            ? item.texto.substring(0, 50) + "..." 
            : item.texto
        },
        {
            key: "data_cadastro",
            label: "Data",
            render: (item) =>
            item.data_cadastro ?? "Não definida"
        },
        {
            key: "condicao",
            label: "Status",
            render: (item) => (
            <span
                className={
                item.condicao === "Lida"
                    ? "text-green-600 font-semibold"
                    : "text-neutral-400 font-semibold"
                }
            >
                {item.condicao}
            </span>
            )
        }
    ];

    return(isLoading ? <PageLoading/> :
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] mb-10">
            <div className="flex flex-col items-center gap-10">
                <div className="page-title mt-[60px] text-center">NOTIFICAÇÕES</div>
                <span className="text-gray-600 text-center">
                    Abaixo esta o registro das notificações do usuário.
                </span>
                <GenericTable
                    data={notificacoes}
                    columns={notificationColumns}
                    actions={actions}
                    headerClassName="bg-green-200 text-gray-900"
                />
            </div>
        </div>
    )
}