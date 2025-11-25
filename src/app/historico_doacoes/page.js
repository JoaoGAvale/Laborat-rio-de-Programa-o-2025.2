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
      doador: "Atacadão",
      receptor: "CUFA",
      descricao: "Cesta de alimentos variados",
      quantidade: 3,
      unidade: "UNIDADE",
      data: "2025-01-22",
      fotografia: "/images/cesta.jpg"
    },
    {
      id_doacao: 18,
      doador: "Cabana do Sol",
      receptor: "Associação de Moradores do Cruzeiro do Anil",
      descricao: "Pacote de arroz 5kg",
      quantidade: 10,
      unidade: "KG",
      data: "2024-12-10",
      fotografia: "/images/arroz.jpg"
    },
    {
      id_doacao: 25,
      doador: "Supermercado Mateus",
      receptor: "Hospital Carlos Macieira",
      descricao: "Leite integral caixa 1L",
      quantidade: 20,
      unidade: "LITRO",
      data: "2023-02-01",
      fotografia: "/images/leite.png"
    },
    {
      id_doacao: 31,
      doador: "Ceasa",
      receptor: "Creche Tia Lurdes",
      descricao: "Tomate fresco caixa 10kg",
      quantidade: 10,
      unidade: "KG",
      data: "2025-03-12",
      fotografia: "/images/tomate.jpg"
    },
    {
      id_doacao: 37,
      doador: "Pão & Cia",
      receptor: "Lar São Francisco",
      descricao: "Pães variados",
      quantidade: 50,
      unidade: "UNIDADE",
      data: "2025-01-03",
      fotografia: "/images/pao.webp"
    },
    {
      id_doacao: 41,
      doador: "Mateus Delivery",
      receptor: "Casa do Idoso Esperança",
      descricao: "Frango congelado 1kg",
      quantidade: 15,
      unidade: "KG",
      data: "2025-04-20",
      fotografia: "/images/frango.jpg"
    },
    {
      id_doacao: 48,
      doador: "Mercadinho São José",
      receptor: "Escola Comunitária Sementinha",
      descricao: "Suco de frutas 1L",
      quantidade: 18,
      unidade: "UNIDADE",
      data: "2025-02-10",
      fotografia: "/images/suco.jpg"
    },
    {
      id_doacao: 52,
      doador: "Assaí Atacadista",
      receptor: "Casa de Apoio Ninar",
      descricao: "Feijão preto 1kg",
      quantidade: 22,
      unidade: "KG",
      data: "2025-05-11",
      fotografia: "/images/feijao.jpg"
    },
    {
      id_doacao: 57,
      doador: "Super Lagoa",
      receptor: "Comunidade da Liberdade",
      descricao: "Macarrão espaguete 500g",
      quantidade: 30,
      unidade: "KG",
      data: "2025-06-08",
      fotografia: "/images/macarrao.webp"
    },
    {
      id_doacao: 63,
      doador: "Cacau Center",
      receptor: "Casa da Criança Feliz",
      descricao: "Achocolatado 400g",
      quantidade: 25,
      unidade: "UNIDADE",
      data: "2025-02-18",
      fotografia: "/images/achocolatado.jfif"
    },
    {
      id_doacao: 69,
      doador: "Panificadora Imperial",
      receptor: "Casa de Repouso Bom Jesus",
      descricao: "Bolos Caseiros",
      quantidade: 12,
      unidade: "UNIDADE",
      data: "2025-03-02",
      fotografia: "/images/bolo.webp"
    },
    {
      id_doacao: 74,
      doador: "Mercado Popular",
      receptor: "Escola Comunitária São Miguel",
      descricao: "Detergente líquido 500ml",
      quantidade: 40,
      unidade: "UNIDADE",
      data: "2026-01-10",
      fotografia: "/images/detergente.png"
    },
    {
      id_doacao: 81,
      doador: "Hortifruti Brasil",
      receptor: "Creche Pequeno Cidadão",
      descricao: "Banana prata 12kg",
      quantidade: 12,
      unidade: "KG",
      data: "2025-05-15",
      fotografia: "/images/banana.jpg"
    },
    {
      id_doacao: 89,
      doador: "Empório Central",
      receptor: "Instituto Amigos Solidários",
      descricao: "Azeite de oliva 500ml",
      quantidade: 10,
      unidade: "UNIDADE",
      data: "2025-06-22",
      fotografia: "/images/azeite.webp"
    },
    {
      id_doacao: 93,
      doador: "Supermercado Tropical",
      receptor: "Projeto Criança Viva",
      descricao: "Biscoito cream cracker 400g",
      quantidade: 20,
      unidade: "UNIDADE",
      data: "2025-07-30",
      fotografia: "/images/biscoito.jpg"
    }
  ];


  // Ações específicas para doações
  const actions = [
    {
      icon: <Eye size={27} />,
      title: "Ver Detalhes",
      className: "text-green-800",
      getHref: (item) => `/detalhes/${item.id_doacao}`
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

      <main className="pt-24 flex flex-col items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold text-center">
          HISTÓRICO DE {perfil==="Doador" ? "DOAÇÕES" : perfil==="Receptor"?"RECEBIMENTOS" :"" }
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