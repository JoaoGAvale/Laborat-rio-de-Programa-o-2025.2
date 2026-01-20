'use client'

import React, { useState, useEffect} from "react";
import GenericTable from "../components/GenericTable";
import { Eye } from "lucide-react";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";
import { PageLoading } from "../components/PageLoading";

export default function HistoricoDoacoesPage() {
  const [columns, setColumns] = useState([])
  const {showAlert} = useAlert()
  const [isLoading, setIsLoading] = useState(true)
  const [perfil, setPerfil] = useState("")
  const router = useRouter()
  const [doacoes, setDoacoes] = useState([]); 


  // Ações específicas para doações
  const actions = [
    {
      icon: (item)=> <Eye size={27} />,
      title: "Ver Detalhes",
      className: "text-green-800",
      onClick: (item) => router.push(`/detalhes/${item.id_doacao}`)
    },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setPerfil(user.perfil)
      setColumns([
        { key: "descricao", label: "DESCRIÇÃO" },
        {
          key: user.perfil === "Doador" ? "receptor" : "doador",
          label: user.perfil === "Doador" ? "RECEPTOR" : "DOADOR",
        },
        { key: "quantidade", label: "QUANTIDADE" },
        { key: "unidade", label: "UNIDADE" },
        {
          key: "fotografia",
          label: "FOTO",
          render: (item) => item.fotografia ? (
            <div className="h-16 w-16 rounded overflow-hidden">
              <img src={item.fotografia} alt={item.descricao} className="h-full w-full object-cover" />
            </div>
          ) : "Sem foto"
        },
        {
          key: "data_cadastro",
          label: "DATA DA ENTREGA",
          render: (item) => item.data_entrega ?? "Não definida"
        },
      ])
      
      fetchHistorico(user.id_usuario);
    } else {
      showAlert({
        isError: true,
        topMessage: "Erro!",
        bottomMessage: "Usuário não autenticado."
      })
      setIsLoading(false)
    }
  }, [])

  const fetchHistorico = async (userId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:5000/doacao/usuario/${userId}?status=Finalizada`);
      if (!response.ok) throw new Error("Erro ao buscar dados do servidor");
      
      const data = await response.json();
      setDoacoes(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
      showAlert({
        isError: true,
        topMessage: "Erro de Conexão",
        bottomMessage: "Não foi possível carregar o histórico."
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(doacoes)

  return isLoading? <PageLoading /> : (
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