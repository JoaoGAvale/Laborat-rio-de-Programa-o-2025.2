'use client'

import React, { useState, useEffect } from "react";
import GenericTable from "../components/GenericTable";
import { Trash2Icon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Botao } from "../components/Botao";
import { useAlert } from "../context/AlertContext";

export default function AcompanharDoacoesPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const {showAlert} = useAlert()
    
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsuario(user);
      setIsLoading(false)
    }
  }, []);

  // Dados específicos para doações
  const [doacoes, setDoacoes] = useState([
  {
    id_doacao: 12,
    descricao: "Cesta de alimentos variados",
    quantidade: 3,
    unidade: "UNIDADE",
    validade: "2025-01-22",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 18,
    descricao: "Pacote de arroz 5kg",
    quantidade: 10,
    unidade: "KG",
    validade: "2024-12-10",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 25,
    descricao: "Leite integral caixa 1L",
    quantidade: 20,
    unidade: "LITRO",
    validade: "2025-02-01",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 31,
    descricao: "Feijão preto pacote 1kg",
    quantidade: 15,
    unidade: "KG",
    validade: "2025-05-10",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 33,
    descricao: "Azeite de oliva 500ml",
    quantidade: 6,
    unidade: "LITRO",
    validade: "2025-06-22",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 41,
    descricao: "Farinha de trigo pacote 1kg",
    quantidade: 12,
    unidade: "KG",
    validade: "2025-03-15",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 47,
    descricao: "Sabonete neutro barra",
    quantidade: 30,
    unidade: "UNIDADE",
    validade: "2026-08-10",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 52,
    descricao: "Macarrão espaguete pacote 500g",
    quantidade: 18,
    unidade: "KG",
    validade: "2025-04-02",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 56,
    descricao: "Café torrado e moído 500g",
    quantidade: 10,
    unidade: "KG",
    validade: "2025-07-18",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 60,
    descricao: "Leite em pó integral 400g",
    quantidade: 25,
    unidade: "UNIDADE",
    validade: "2025-01-30",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 67,
    descricao: "Óleo de soja 900ml",
    quantidade: 22,
    unidade: "LITRO",
    validade: "2025-03-05",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 72,
    descricao: "Detergente líquido 500ml",
    quantidade: 28,
    unidade: "UNIDADE",
    validade: "2026-01-12",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 79,
    descricao: "Papel higiênico pacote com 12 rolos",
    quantidade: 12,
    unidade: "UNIDADE",
    validade: "2028-12-31",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 85,
    descricao: "Açúcar refinado 1kg",
    quantidade: 20,
    unidade: "KG",
    validade: "2025-09-20",
    status: "Aguardando Recebedor"
  },
  {
    id_doacao: 90,
    descricao: "Caixa de suco 1L sabores variados",
    quantidade: 14,
    unidade: "LITRO",
    validade: "2025-05-28",
    status: "Aguardando Recebedor"
  }
])

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
      render: (item) => new Date(item.validade).toLocaleDateString("pt-BR")
    },
    {
      key: "status",
      label: "Status"
    }
  ];

  // Ações específicas para doações
  const actions = [
    {
      icon: <EyeIcon size={22} />,
      title: "Detalhes da Doação",
      className: "text-green-800 ",
      getHref: (item) => `/detalhes/${item.id_doacao}`
    },
    {
      icon: <Trash2Icon size={22} />,
      title: "Cancelar Doação",
      className: "text-green-800 cursor-pointer",
      onClick: (item) => {cancelarDoacao(item.id_doacao)}
    },
  ];

  function cancelarDoacao(id){
    setDoacoes(prev=>prev.filter(item=>item.id_doacao!==id))
    showAlert({
      isError: false,
      topMessage: "Sucesso!",
      bottomMessage: `${usuario.perfil === "Doador" ? "Doação" : "Reserva de doação"} cancelada com sucesso.`,
    })
  }

  return (isLoading ?
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] text-black"/>
    :
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] text-black">

      <main className="pt-24 px-6 flex flex-col items-center gap-10 mb-10">
        <h1 className="text-3xl font-bold text-center">
          {usuario.perfil === "Doador" ? "DOAÇÕES CADASTRADAS" : "DOAÇÕES RESERVADAS"}
        </h1>
        <span className="text-gray-600 text-center">
          Acompanhe o andamento das doações {usuario.perfil === "Doador" ? "cadastradas" : "reservadas"} pelo usuário.
        </span>
        <GenericTable 
          data={doacoes}
          columns={columns}
          actions={actions}
          headerClassName="bg-green-200 text-gray-900"
        />
        {usuario.perfil === "Doador" ?
          <div className="flex flex-row justify-end w-full">
            <Botao
                onClick={()=>{router.push("/cadastro_doacao")}}
                disabled={false}
                type="normal"
                text="CADASTRAR DOAÇÃO"
            />
          </div>
          :
          ""
        }
      </main>
    </div>
  );
}