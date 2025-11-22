'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Botao } from "@/app/components/Botao";
import { TextInput } from "@/app/components/TextInput";

export default function UserDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsuario(user);
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
      <span className="text-gray-500">Carregando...</span>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center font-['PoppinsRegular'] mb-10">
      <div className="flex flex-col items-center gap-10 w-full">
        
        {/* Título da página */}
        <div className="page-title mt-[60px] text-center">
          DETALHES DO USUÁRIO
        </div>

        <span className="text-gray-600 text-center">
          Confira abaixo as informações do usuário.
        </span>

        {/* Container */}
        <div className="w-full flex flex-col items-center shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] p-[60px] rounded-md gap-6 bg-white">
            <TextInput
                value={usuario.nome}
                setValue={()=>{}}
                label={"NOME"}
                disabled
                type="text"
            />
            <TextInput
                value={usuario.cnpj}
                setValue={()=>{}}
                label={"CNPJ"}
                disabled
                type="text"
                mask="cnpj"
            />
            <TextInput
                value={usuario.email}
                setValue={()=>{}}
                label={"E-MAIL"}
                disabled
                type="text"
            />
            <TextInput
                value={usuario.perfil}
                setValue={()=>{}}
                label={"PERFIL"}
                disabled
                type="text"
            />
          {/* Botões */}
          <div className="flex flex-row justify-between w-full max-w-[720px] pt-[24px]">
            <Botao
              onClick={() => router.back()}
              type="cancel"
              text="VOLTAR"
            />
            <Botao
              onClick={() =>
                router.push(`/usuario/editar_usuario`)
              }
              type="normal"
              text="EDITAR"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
