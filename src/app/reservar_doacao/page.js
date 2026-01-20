'use client'

import React, { useState, useEffect } from "react";
import GenericTable from "../components/GenericTable";
import { ClipboardCheck } from "lucide-react";
import { useAlert } from "../context/AlertContext";
import { PageLoading } from "../components/PageLoading";
import { apiFetch } from "../utils/apifetch";
import { API_ROUTES } from "../utils/routes";

export default function ReceberDoacoesPage() {

  const {showAlert} = useAlert()
  // Dados específicos para doações
  const [doacoes, setDoacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Colunas específicas para doações
  const columns = [
    {
      key: "descricao",
      label: "Descrição"
    },
    {
      key: "quantidade",
      label: "Quantidade"
    },
    {
      key: "unidade",
      label: "Unidade"
    },
    {
      key: "validade",
      label: "Validade",
      render: (item)=> item.validade?? "Não definida"
    },
    {
      key: "status",
      label: "Status"
    }
  ];

  // Ações específicas para doações
  const actions = [
    {
      icon: (item)=> <ClipboardCheck size={22} />,
      title: "Reservar Doação",
      className: "text-green-800 cursor-pointer",
      onClick: (item)=>{reservarDoacao(item.id_doacao)}
    },
  ];

  // 1. Função que busca todas as doações com status 'Disponivel'
  const fetchDisponiveis = async () => {
    try {
      setIsLoading(true);
      // Chamada para a rota genérica com filtro de query string
      const response = await fetch("http://127.0.0.1:5000/doacao/disponiveis");
      
      if (!response.ok) throw new Error("Erro ao buscar doações.");
      
      const data = await response.json();
      setDoacoes(data);
    } catch (error) {
      console.error(error);
      showAlert({
        isError: true,
        topMessage: "Erro!",
        bottomMessage: "Não foi possível carregar as doações disponíveis.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. useEffect para disparar a busca assim que a página carregar
  useEffect(() => {
    fetchDisponiveis();
  }, []);

  console.log(doacoes)

  function reservarDoacao(id) {
    // Por enquanto removemos apenas da tela
    setDoacoes(prev => prev.filter(doacao => doacao.id_doacao !== id));
    showAlert({
      isError: false,
      topMessage: "Sucesso!",
      bottomMessage: `Doação reservada com sucesso.`,
    });
  }

  async function reservarDoacao(id) {
    try{
        //setRealizandoOperacao(true)
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await apiFetch(API_ROUTES.DOACAO.UPDATE(id),{
            method:"PUT",
            auth:true,
            body:{
                status:"Reservada",
                receptor_id:user.id_usuario
            }
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error("Erro ao reservar doação. Tente novamente mais tarde.")
        }
        showAlert({
            isError: false,
            topMessage: "Sucesso!",
            bottomMessage:"Doação reservada com sucesso.",
        })
        setDoacoes(prev => prev.filter(doacao => doacao.id_doacao !== id));
    }catch(e){
        showAlert({
            isError: true,
            topMessage: "Erro!",
            bottomMessage:e.message,
        })
    }finally{
        //setRealizandoOperacao(false)
    }
  }

  return ( isLoading ? <PageLoading /> :
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] text-black">

      <main className="pt-24 px-6 flex flex-col items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold text-center">
          Doações Disponíveis para Recebimento
        </h1>

        <span className="text-gray-600 text-center">
          As doações listadas abaixo estão com status <b>Disponível</b>.
        </span>

        <GenericTable 
          data={doacoes}
          columns={columns}
          actions={actions}
          headerClassName="bg-green-200 text-gray-900"
        />
      </main>

    </div>
  );
}
