'use client'

import React, { useState, useEffect } from "react";
import GenericTable from "../components/GenericTable";
import { ClipboardCheck } from "lucide-react";
import { useAlert } from "../context/AlertContext";

export default function ReceberDoacoesPage() {

  const {showAlert} = useAlert()
  // Dados específicos para doações
  const [doacoes, setDoacoes] = useState([
    {
      id_doacao: 12,
      descricao: "Cesta de alimentos variados",
      quantidade: 3,
      unidade: "UNIDADE",
      validade: "2025-01-22",
      status: "Disponível"
    },
    {
      id_doacao: 18,
      descricao: "Pacote de arroz 5kg",
      quantidade: 10,
      unidade: "KG",
      validade: "2024-12-10",
      status: "Disponível"
    },
    {
      id_doacao: 25,
      descricao: "Leite integral caixa 1L",
      quantidade: 20,
      unidade: "LITRO",
      validade: "2025-02-01",
      status: "Disponível"
    },
    {
      id_doacao: 31,
      descricao: "Feijão preto 1kg",
      quantidade: 15,
      unidade: "KG",
      validade: "2025-03-18",
      status: "Disponível"
    },
    {
      id_doacao: 37,
      descricao: "Macarrão espaguete 500g",
      quantidade: 25,
      unidade: "KG",
      validade: "2025-04-09",
      status: "Disponível"
    },
    {
      id_doacao: 41,
      descricao: "Café torrado e moído 500g",
      quantidade: 12,
      unidade: "KG",
      validade: "2025-06-15",
      status: "Disponível"
    },
    {
      id_doacao: 46,
      descricao: "Óleo de soja 900ml",
      quantidade: 30,
      unidade: "LITRO",
      validade: "2025-05-03",
      status: "Disponível"
    },
    {
      id_doacao: 52,
      descricao: "Farinha de trigo 1kg",
      quantidade: 20,
      unidade: "KG",
      validade: "2025-07-12",
      status: "Disponível"
    },
    {
      id_doacao: 58,
      descricao: "Detergente líquido 500ml",
      quantidade: 40,
      unidade: "UNIDADE",
      validade: "2026-01-22",
      status: "Disponível"
    },
    {
      id_doacao: 63,
      descricao: "Papel higiênico pacote 12 rolos",
      quantidade: 10,
      unidade: "UNIDADE",
      validade: "2028-09-10",
      status: "Disponível"
    },
    {
      id_doacao: 67,
      descricao: "Sabonete neutro",
      quantidade: 30,
      unidade: "UNIDADE",
      validade: "2026-04-30",
      status: "Disponível"
    },
    {
      id_doacao: 72,
      descricao: "Açúcar refinado 1kg",
      quantidade: 18,
      unidade: "KG",
      validade: "2025-08-14",
      status: "Disponível"
    },
    {
      id_doacao: 79,
      descricao: "Leite em pó integral 400g",
      quantidade: 22,
      unidade: "UNIDADE",
      validade: "2025-03-20",
      status: "Disponível"
    },
    {
      id_doacao: 84,
      descricao: "Caixa de suco 1L",
      quantidade: 14,
      unidade: "LITRO",
      validade: "2025-10-01",
      status: "Disponível"
    },
    {
      id_doacao: 90,
      descricao: "Azeite de oliva 500ml",
      quantidade: 8,
      unidade: "UNIDADE",
      validade: "2026-02-11",
      status: "Disponível"
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
      icon: <ClipboardCheck size={22} />,
      title: "Reservar Doação",
      className: "text-green-800 cursor-pointer",
      onClick: (item)=>{reservarDoacao(item.id_doacao)}
    },
  ];

  function reservarDoacao(id){
    setDoacoes(prev=>prev.filter(doacao=>doacao.id_doacao!==id))
    showAlert({
      isError: false,
      topMessage: "Sucesso!",
      bottomMessage: `Doação reservada com sucesso.`,
    })
  }

  useEffect(()=>{console.log("Doacoes: ", doacoes)},[doacoes])

  return (
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
