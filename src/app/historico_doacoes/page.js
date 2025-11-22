'use client'

import React, { useState, useEffect} from "react";
import GenericTable from "../components/GenericTable";
import { Eye } from "lucide-react";
import { useAlert } from "../context/AlertContext";

export default function HistoricoDoacoesPage() {
  const [columns, setColumns] = useState([])
  const {showAlert} = useAlert()
  const [isLoading, setIsLoading] = useState(true)
  const [perfil, setPerfil] = useState("")

  // Dados específicos para doações
  const doacoes = [
    {
      id_doacao: 12,
      doador:"Atacadão",
      receptor:"CUFA",
      descricao: "Cesta de alimentos variados",
      quantidade: 3,
      unidade: "UNIDADE",
      data: "2025-01-22",
      fotografia: "/images/cesta.jpg"
    },
    {
      id_doacao: 18,
      doador:"Cabana do Sol",
      receptor:"Associação de Moradores do Cruzeiro do Anil",
      descricao: "Pacote de arroz 5kg",
      quantidade: 10,
      unidade: "KG",
      data: "2024-12-10",
      fotografia: "/images/arroz.jpg"
    },
    {
      id_doacao: 25,
      doador:"Supermercado Mateus",
      receptor:"Hospital Carlos Macieira",
      descricao: "Leite integral caixa 1L",
      quantidade: 20,
      unidade: "LITRO",
      data: "2023-02-01",
      fotografia: "/images/leite.png"
    }
  ];

  // Ações específicas para doações
  const actions = [
    {
      icon: <Eye size={27} />,
      title: "Ver Detalhes",
      className: "text-green-800",
      getHref: (item) => `/doacoes/detalhes/${item.id_doacao}`
    },
  ];

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    setPerfil(user.perfil)
    console.log("user",user)
    if(user){
        setColumns([
    {
      key: "descricao",
      label: "DESCRIÇÃO"
    },
    {
        key:user.perfil === "Doador" ? "receptor" : user.perfil === "Receptor" ? "doador" : "",
        label:user.perfil === "Doador" ? "RECEPTOR" : user.perfil === "Receptor" ? "DOADOR" : "",
    },
    {
      key: "quantidade",
      label: "QUANTIDADE"
    },
    {
      key: "unidade",
      label: "UNIDADE"
    },
    {
        key:"1",
        label:""
    },
    {
      key: "fotografia",
      label: "FOTO",
      render: (item) => item.fotografia ? (
        <div className="h-16 w-16 rounded overflow-hidden">
          <img
            src={item.fotografia}
            alt={item.descricao}
            className="h-full w-full object-cover"
          />
        </div>
      ) : "Sem foto"
    },
    {
      key: "data",
      label: "DATA DA ENTREGA",
      render: (item) => new Date(item.data).toLocaleDateString("pt-BR")
    },
  ])
    }else{
        showAlert({
            isError:true,
            topMessage:"Erro!",
            bottomMessage:"O usuário não tem permissão para visualizar esta página."
        })
        
    }
    setIsLoading(false)
  },[])
    useEffect(()=>{console.log(columns)},[columns])

  return isLoading? <div></div> : (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] text-black">

      <main className="pt-24 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-center">
          HISTORICO DE {perfil==="Doador" ? "DOAÇÕES" : perfil==="Receptor"?"RECEBIMENTOS" :"" }
        </h1>

        <span className="text-gray-600 text-center">
          Abaixo esta o registro das {perfil==="Doador" ? "doações realizadas" : perfil==="Receptor"?"doações recebidas" :"" }.
        </span>

        <GenericTable 
          key={isLoading}
          data={doacoes}
          columns={columns}
          actions={actions}
          headerClassName="bg-green-200 text-gray-900"
        />
      </main>

    </div>
  );
}