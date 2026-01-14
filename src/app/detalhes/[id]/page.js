'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Botao } from "@/app/components/Botao";
import { TextInput } from "@/app/components/TextInput";
import { useAlert } from "@/app/context/AlertContext";
import { PageLoading } from "@/app/components/PageLoading";
import { apiFetch } from "@/app/utils/apifetch";
import { API_ROUTES } from "@/app/utils/routes";

const DoacaoDetalhesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doacao, setDoacao] = useState({
    id_doacao: 12,
    doador: "Atacadão",
    receptor: "CUFA",
    descricao: "Cesta de alimentos variados",
    quantidade: 3,
    unidade: "UNIDADE",
    validade: "2024-12-31",
    data_cadastro: "2024-01-15",
    data: "2025-01-22",
    fotografia: "/images/cesta.jpg",
    status: "Disponível",
    confirmacao_entrega: false,
    confirmacao_recebimento: false,
    endereco: {
      logradouro: "Rua das Flores",
      numero: "123",
      cep: "01234-567",
      cidade: "São Paulo",
      estado: "SP"
    },
    doador_info: {
      nome: "Atacadão",
      telefone: "(11) 99999-9999",
      email: "contato@atacadao.com",
      endereco: "Rua das Flores, 123 - São Paulo/SP"
    },
    receptor_info: {
      nome: "CUFA",
      telefone: "(11) 98888-8888",
      email: "cufa@email.com",
      endereco: "Av. Principal, 456 - São Paulo/SP"
    }
  },);
  const [perfil, setPerfil] = useState("");
  const router = useRouter();
  const params = useParams();
  const { showAlert } = useAlert();

  async function carregar_dados() {
    try{
        setIsLoading(true)
        const response = await apiFetch(API_ROUTES.DOACAO.GET(params.id),{
          method: "GET",
          auth: true
        })
        const data = await response.json()
        if(!response.ok){
          throw new Error("Erro ao buscar dados da doação.")
        }
        console.log("data: ", data)
        setDoacao(data)
    }catch{
      showAlert({
        isError: true,
        topMessage: "Erro!",
        bottomMessage:"Erro ao buscar dados da doação. Tente novamente mais tarde.",
      })
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    carregar_dados()
    if(user){
      setPerfil(user.perfil);
    }
  },[params])

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
    
  //   if (!user) {
  //     showAlert({
  //       isError: true,
  //       topMessage: "Erro!",
  //       bottomMessage: "O usuário não tem permissão para visualizar esta página."
  //     });
  //     router.push("/login");
  //     return;
  //   }

  //   setPerfil(user.perfil);

  //   const fetchDoacao = async () => {
  //     try {
  //       setIsLoading(true);
        
  //       setTimeout(() => {
  //         const doacaoEncontrada = mockDoacoes.find(d => d.id_doacao === parseInt(params.id));
  //         /*if (doacaoEncontrada) {
  //           setDoacao(doacaoEncontrada);
  //         } else {
  //           showAlert({
  //             isError: true,
  //             topMessage: "Erro!",
  //             bottomMessage: "Doação não encontrada."
  //           });
  //         }*/
  //         setIsLoading(false);
  //       }, 1000);
  //     } catch (error) {
  //       console.error('Erro ao carregar doação:', error);
  //       showAlert({
  //         isError: true,
  //         topMessage: "Erro!",
  //         bottomMessage: "Erro ao carregar os dados da doação."
  //       });
  //       setIsLoading(false);
  //     }
  //   };

  //   if (params.id) {
  //     fetchDoacao();
  //   }
  // }, [params.id, router, showAlert]);

  const formatarData = (dataString) => {
    if (!dataString) return "Não definida";
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível': return 'bg-green-500';
      case 'Reservada': return 'bg-yellow-500';
      case 'Finalizada': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    if (perfil === "Doador") {
      switch (doacao?.status) {
        case 'Disponível': return 'Sua doação está disponível para reserva';
        case 'Reservada': return 'Sua doação foi reservada';
        case 'Finalizada': return 'Doação finalizada com sucesso';
        default: return doacao?.status;
      }
    } else if (perfil === "Receptor") {
      switch (doacao?.status) {
        case 'Disponível': return 'Doação disponível para reserva';
        case 'Reservada': return 'Você reservou esta doação';
        case 'Finalizada': return 'Doação recebida com sucesso';
        default: return doacao?.status;
      }
    }
    return doacao?.status;
  };

  const handleReservarDoacao = () => {
    if (doacao && perfil === "Receptor") {
      const doacaoAtualizada = {
        ...doacao,
        status: "Reservada"
      };
      setDoacao(doacaoAtualizada);
      
      showAlert({
        isError: false,
        topMessage: "Sucesso!",
        bottomMessage: "Doação reservada com sucesso."
      });
    }
  };

  const handleCancelarDoacao = () => {
    showAlert({
      isError: false,
      topMessage: "Sucesso!",
      bottomMessage: "Doação cancelada com sucesso."
    });
    router.push('/acompanhar_doacoes');
  };

  const handleEditarDoacao = () => {
    //router.push('/cadastro_doacao');
  };

  const handleConfirmarEntrega = () => {
    if (doacao) {
      const doacaoAtualizada = {
        ...doacao,
        status: "Finalizada",
        confirmacao_entrega: true,
        confirmacao_recebimento: true,
        data: new Date().toISOString().split('T')[0]
      };
      setDoacao(doacaoAtualizada);
      
      showAlert({
        isError: false,
        topMessage: "Sucesso!",
        bottomMessage: "Entrega confirmada com sucesso."
      });
    }
  };

  const handleEntrarContato = () => {
    const contato = perfil === "Doador" ? doacao?.receptor_info : doacao?.doador_info;
    if (contato) {
      showAlert({
        isError: false,
        topMessage: "Informações de Contato",
        bottomMessage: `Nome: ${contato.nome}\nTelefone: ${contato.telefone}\nEmail: ${contato.email}\nEndereço: ${contato.endereco}`
      });
    } else {
      showAlert({
        isError: true,
        topMessage: "Informação",
        bottomMessage: "Informações de contato não disponíveis."
      });
    }
  };

  if (!doacao) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
        <span className="text-gray-500">Doação não encontrada</span>
      </div>
    );
  }

  return (isLoading ? <PageLoading/> :
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center font-['PoppinsRegular'] mb-10">
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="page-title mt-[60px] text-center">
          DETALHES DA DOAÇÃO
        </div>

        <span className="text-gray-600 text-center">
          {perfil === "Doador" 
            ? "Confira os detalhes da sua doação." 
            : perfil === "Receptor" 
            ? "Confira os detalhes da doação disponível."
            : "Detalhes da doação"
          }
        </span>

        <div className="w-full max-w-4xl flex flex-col items-center shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] p-[60px] rounded-md gap-6 bg-white">
          <div className="w-full max-w-[720px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              STATUS
            </label>
            <div className="flex items-center gap-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(doacao.status)}`}>
                {doacao.status}
              </div>
              <span className="text-sm text-gray-600">{getStatusText()}</span>
            </div>
          </div>

          <TextInput
            value={doacao.descricao}
            setValue={()=>{}}
            label={"DESCRIÇÃO"}
            disabled
            type="text"
          />

          {doacao.fotografia && (
            <div className="w-full max-w-[720px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FOTOGRAFIA
              </label>
              <div className="h-32 w-32 rounded overflow-hidden border">
                <img
                  src={doacao.fotografia}
                  alt={doacao.descricao}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="w-full max-w-[720px] grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              value={`${doacao.quantidade} ${doacao.unidade}`}
              setValue={()=>{}}
              label={"QUANTIDADE"}
              disabled
              type="text"
            />
            
            <TextInput
              value={formatarData(doacao.validade)}
              setValue={()=>{}}
              label={"DATA DE VALIDADE"}
              disabled
              type="text"
            />
          </div>

          <div className="w-full max-w-[720px] grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              value={formatarData(doacao.data_cadastro)}
              setValue={()=>{}}
              label={"DATA DE CADASTRO"}
              disabled
              type="text"
            />
            
            <TextInput
              value={formatarData(doacao.data_entrega)}
              setValue={()=>{}}
              label={"DATA DA ENTREGA"}
              disabled
              type="text"
            />
          </div>

          <div className="w-full max-w-[720px] grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              value={doacao.receptor}
              setValue={()=>{}}
              label={"RECEPTOR"}
              disabled
              type="text"
            />
            <TextInput
              value={doacao.doador}
              setValue={()=>{}}
              label={"DOADOR"}
              disabled
              type="text"
            />
          </div>

          <div className="w-full max-w-[720px]">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              INFORMAÇÕES DE CONTATO DO RECEPTOR
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                value={doacao.receptor_info.telefone}
                setValue={()=>{}}
                label={"TELEFONE"}
                disabled
                type="text"
              />
              
              <TextInput
                value={doacao.receptor_info.email}
                setValue={()=>{}}
                label={"E-MAIL"}
                disabled
                type="text"
              />
            </div>
            
            <div className="mt-6">
              <TextInput
                value={doacao.receptor_info.endereco}
                setValue={()=>{}}
                label={"ENDEREÇO COMPLETO"}
                disabled
                type="text"
              />
            </div>
          </div>
          <div className="w-full max-w-[720px]">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            INFORMAÇÕES DE CONTATO DO DOADOR
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              value={doacao.doador_info.telefone}
              setValue={()=>{}}
              label={"TELEFONE"}
              disabled
              type="text"
            />
            
            <TextInput
              value={doacao.doador_info.email}
              setValue={()=>{}}
              label={"E-MAIL"}
              disabled
              type="text"
            />
          </div>
          
          <div className="mt-6">
            <TextInput
              value={doacao.doador_info.endereco}
              setValue={()=>{}}
              label={"ENDEREÇO COMPLETO"}
              disabled
              type="text"
            />
          </div>
        </div>
          <div className="w-full max-w-[720px]">
            <h3 className="text-lg font-medium text-gray-700 mb-4">ENDEREÇO DE RETIRADA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                value={doacao.endereco.logradouro}
                setValue={()=>{}}
                label={"LOGRADOURO"}
                disabled
                type="text"
              />
              
              <TextInput
                value={doacao.endereco.numero}
                setValue={()=>{}}
                label={"NÚMERO"}
                disabled
                type="text"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <TextInput
                value={doacao.endereco.cidade}
                setValue={()=>{}}
                label={"CIDADE"}
                disabled
                type="text"
              />
              
              <TextInput
                value={doacao.endereco.estado}
                setValue={()=>{}}
                label={"ESTADO"}
                disabled
                type="text"
              />
              
              <TextInput
                value={doacao.endereco.cep}
                setValue={()=>{}}
                label={"CEP"}
                disabled
                type="text"
                mask="cep"
              />
            </div>
          </div>

          {(perfil === "Admin" || doacao.status === "Finalizada") && (
            <div className="w-full max-w-[720px]">
              <h3 className="text-lg font-medium text-gray-700 mb-4">CONFIRMAÇÕES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ENTREGA CONFIRMADA
                  </label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    doacao.confirmacao_entrega 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {doacao.confirmacao_entrega ? 'Sim' : 'Não'}
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RECEBIMENTO CONFIRMADO
                  </label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    doacao.confirmacao_recebimento 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {doacao.confirmacao_recebimento ? 'Sim' : 'Não'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row justify-between w-full max-w-[720px] pt-[24px]">
            <Botao
              onClick={() => router.back()}
              type="cancel"
              text="VOLTAR"
            />
            
            <div className="flex gap-4">
              {perfil === "Receptor" && (
                <>
                  <Botao
                    onClick={handleReservarDoacao}
                    type="normal"
                    text="RESERVAR DOAÇÃO"
                  />
                  <Botao
                    onClick={handleEntrarContato}
                    type="normal"
                    text="ENTRAR EM CONTATO"
                  />
                </>
              )}
              
              {/*perfil === "Receptor" && doacao.status === 'Reservada' && (
                <Botao
                  onClick={handleConfirmarEntrega}
                  type="normal"
                  text="CONFIRMAR ENTREGA"
                />
              )*/}

              {perfil === "Doador" && (
                <>
                  <Botao
                    onClick={handleEditarDoacao}
                    type="normal"
                    text="EDITAR DOAÇÃO"
                  />
                  <Botao
                    onClick={handleCancelarDoacao}
                    type="normal"
                    text="CANCELAR DOAÇÃO"
                  />
                </>
              )}

              {/*perfil === "Doador" && doacao.status === 'Reservada' && (
                <Botao
                  onClick={handleConfirmarEntrega}
                  type="normal"
                  text="CONFIRMAR ENTREGA"
                />
              )*/}
              
              {/*(doacao.status === 'Disponível' || doacao.status === 'Reservada') && (
                <Botao
                    onClick={handleEntrarContato}
                    type="normal"
                    text="ENTRAR EM CONTATO"
                  />
              )*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoacaoDetalhesPage;