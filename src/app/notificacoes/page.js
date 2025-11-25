'use client'
import React from "react";
import GenericTable from "../components/GenericTable";
import { EyeClosed, Eye } from "lucide-react";

export default function NotificationPage(){

    const actions = [
    {
      icon: <Eye size={27} />,
      title: "Ver Detalhes",
      className: "text-green-800",
      getHref: (item) => `/doacao/${item.id_doacao}`
    },
  ];
  const notificationsData = [
        {
            id_notificacao: 1,
            texto: "Sua doação foi aprovada!",
            data_cadastro: "2024-11-20",
            condicao: "Lida",
            id_doacao: 1
        },
        {
            id_notificacao: 2,
            texto: "A entrega da doação foi confirmada.",
            data_cadastro: "2024-11-21",
            condicao: "Não Lida",
            id_doacao: 2
        },
        {
            id_notificacao: 3,
            texto: "Os dados da doação foram editados com sucesso.",
            data_cadastro: "2024-11-25",
            condicao: "Não Lida",
            id_doacao: 3
        },
        {
            id_notificacao: 4,
            texto: "A doação foi cadastrada com sucesso.",
            data_cadastro: "2024-11-27",
            condicao: "Não Lida",
            id_doacao: 4
        },
        {
            id_notificacao: 5,
            texto: "A entrega da doação foi realizada com sucesso.",
            data_cadastro: "2024-11-30",
            condicao: "Não Lida",
            id_doacao: 5
        },
        {
            id_notificacao: 6,
            texto: "Um novo receptor demonstrou interesse em sua doação.",
            data_cadastro: "2024-12-01",
            condicao: "Não Lida",
            id_doacao: 6
        },
        {
            id_notificacao: 7,
            texto: "A doação mudou para o status 'Reservada'.",
            data_cadastro: "2024-12-02",
            condicao: "Lida",
            id_doacao: 7
        },
        {
            id_notificacao: 8,
            texto: "O endereço de entrega foi atualizado pelo receptor.",
            data_cadastro: "2024-12-03",
            condicao: "Não Lida",
            id_doacao: 8
        },
        {
            id_notificacao: 9,
            texto: "Uma nova notificação importante está disponível.",
            data_cadastro: "2024-12-04",
            condicao: "Lida",
            id_doacao: 9
        },
        {
            id_notificacao: 10,
            texto: "A doação foi finalizada com sucesso.",
            data_cadastro: "2024-12-05",
            condicao: "Não Lida",
            id_doacao: 10
        },
        {
            id_notificacao: 11,
            texto: "O administrador revisou seus dados de usuário.",
            data_cadastro: "2024-12-06",
            condicao: "Lida",
            id_doacao: 11
        },
        {
            id_notificacao: 12,
            texto: "Você recebeu uma nova mensagem sobre uma doação.",
            data_cadastro: "2024-12-07",
            condicao: "Não Lida",
            id_doacao: 12
        },
        {
            id_notificacao: 13,
            texto: "Um doador atualizou informações sobre a doação reservada.",
            data_cadastro: "2024-12-08",
            condicao: "Não Lida",
            id_doacao: 13
        },
        {
            id_notificacao: 14,
            texto: "Seu perfil foi atualizado com sucesso.",
            data_cadastro: "2024-12-09",
            condicao: "Lida",
            id_doacao: 14
        },
        {
            id_notificacao: 15,
            texto: "O receptor confirmou o recebimento da doação.",
            data_cadastro: "2024-12-10",
            condicao: "Não Lida",
            id_doacao: 15
        }
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
            new Date(item.data_cadastro).toLocaleDateString("pt-BR")
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

    return(
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] mb-10">
            <div className="flex flex-col items-center gap-10">
                <div className="page-title mt-[60px] text-center">NOTIFICAÇÕES</div>
                <span className="text-gray-600 text-center">
                    Abaixo esta o registro das notificações do usuário.
                </span>
                <GenericTable
                    data={notificationsData}
                    columns={notificationColumns}
                    actions={actions}
                    headerClassName="bg-green-200 text-gray-900"
                />
            </div>
        </div>
    )
}