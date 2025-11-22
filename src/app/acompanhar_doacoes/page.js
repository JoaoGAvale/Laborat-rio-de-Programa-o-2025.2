'use client'

import React, { useState } from "react";
import GenericTable from "../components/GenericTable";
import { ClipboardCheck, Info, ArrowRightCircle, Trash2Icon, EyeOffIcon, EyeIcon } from "lucide-react";

export default function AcompanharDoacoesPage() {
  const [open, setOpen] = useState(false);

  // Dados específicos para doações
  const doacoes = [
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
    }
  ];

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
      getHref: (item) => `/doacao/${item.id_doacao}`
    },
    {
      icon: <Trash2Icon size={22} />,
      title: "Cancelar Doação",
      className: "text-green-800 ",
      getHref: (item) => `/cancelar/${item.id_doacao}`
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] text-black">

      <main className="pt-24 px-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-center">
          Doações Disponibilizadas
        </h1>

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