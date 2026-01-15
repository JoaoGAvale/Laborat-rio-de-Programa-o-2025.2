'use client'

import React, { useState, useEffect } from "react";
import GenericTable from "../components/GenericTable";
import { Trash2Icon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Botao } from "../components/Botao";
import { useAlert } from "../context/AlertContext";
import { API_ROUTES } from "../utils/routes";
import { apiFetch } from "../utils/apifetch";
import { PageLoading } from "../components/PageLoading";

export default function AcompanharDoacoesPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const {showAlert} = useAlert()
    
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log(user)
      setUsuario(user);
      fetchData(user)
    }
  }, []);

  async function fetchData(usuario){
      try{
          const params = new URLSearchParams(usuario?.perfil === "Doador" ?{
              doador_id:usuario.id_usuario,
            }:{
              receptor_id:usuario.id_usuario,
              status:"Reservada"
            })
          const response = await apiFetch(API_ROUTES.DOACAO.LISTAR(params.toString()),{
              method:"GET",
              auth:true,
          }
          )
          console.log(response)
          const data = await response.json()
          if(!response.ok){
              throw new Error("Erro ao buscar doações do usuário.")
          }
          setDoacoes(data)
      }catch(e){
          console.log(e)
          showAlert({
              isError: true,
              topMessage: "Erro!",
              bottomMessage:"Erro ao buscar doações do usuário.",
          })
      }finally{
        setIsLoading(false)
      }
  }

  // Dados específicos para doações
  const [doacoes, setDoacoes] = useState([])

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
      icon: (item) => <EyeIcon size={22} />,
      title: "Detalhes da Doação",
      className: "text-green-800 ",
      onClick: (item) => router.push(`/detalhes/${item.id_doacao}`)
    },
    {
      icon: (item) =><Trash2Icon size={22} />,
      title: "Cancelar Doação",
      className: "text-green-800 cursor-pointer",
      onClick: (item) => {cancelarDoacao(item.id_doacao)}
    },
  ];

  function cancelarDoacao(id){
    // setDoacoes(prev=>prev.filter(item=>item.id_doacao!==id))
    // showAlert({
    //   isError: false,
    //   topMessage: "Sucesso!",
    //   bottomMessage: `${usuario.perfil === "Doador" ? "Doação" : "Reserva de doação"} cancelada com sucesso.`,
    // })
  }

  return (isLoading ?
    <PageLoading/>
    :
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['PoppinsRegular'] text-black">

      <main className="pt-24 px-6 flex flex-col items-center gap-10 mb-10">
        <h1 className="text-3xl font-bold text-center">
          {usuario?.perfil === "Doador" ? "DOAÇÕES CADASTRADAS" : "DOAÇÕES RESERVADAS"}
        </h1>
        <span className="text-gray-600 text-center">
          Acompanhe o andamento das doações {usuario?.perfil === "Doador" ? "cadastradas" : "reservadas"} pelo usuário.
        </span>
        <GenericTable 
          data={doacoes}
          columns={columns}
          actions={actions}
          headerClassName="bg-green-200 text-gray-900"
        />
        {usuario?.perfil === "Doador" ?
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