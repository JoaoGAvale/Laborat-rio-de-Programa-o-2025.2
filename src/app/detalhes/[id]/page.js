'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Botao } from "@/app/components/Botao";
import { TextInput } from "@/app/components/TextInput";
import { useAlert } from "@/app/context/AlertContext";

export default function DoacaoDetalhesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [doacao, setDoacao] = useState(null);
  const [perfil, setPerfil] = useState("");
  const router = useRouter();
  const params = useParams();
  const { showAlert } = useAlert();

  // Simulação de dados - em uma aplicação real, isso viria de uma API
  const mockDoacoes = [
    {
      id_docaco: 1,
      doador_id: 1,
      receptor_id: null,
      deschcao: "Arroz integral orgânico",
      quantidade: 5,
      unidade: "KG",
      validade: "2024-12-31",
      endereco_id: 1,
      status: "Disponível",
      confirmacao_entrega: false,
      confirmacao_recebimento: false,
      data_cadastro: "2024-01-15",
      doador: {
        nome: "João Silva",
        cnpf: "123.456.789-00",
        telefone: "(11) 99999-9999",
        email: "joao.silva@email.com"
      },
      endereco: {
        logradouro: "Rua das Flores",
        numero: "123",
        cep: "01234-567",
        cidade: "São Paulo",
        estado: "SP"
      }
    },
    {
      id_docaco: 2,
      doador_id: 2,
      receptor_id: 3,
      deschcao: "Leite em pó",
      quantidade: 10,
      unidade: "UNIDADE",
      validade: "2024-06-30",
      endereco_id: 2,
      status: "Reservada",
      confirmacao_entrega: false,
      confirmacao_recebimento: false,
      data_cadastro: "2024-01-10",
      doador: {
        nome: "Maria Santos",
        cnpf: "987.654.321-00",
        telefone: "(21) 98888-8888",
        email: "maria.santos@email.com"
      },
      receptor: {
        nome: "Carlos Oliveira",
        telefone: "(21) 97777-7777",
        email: "carlos.oliveira@email.com"
      },
      endereco: {
        logradouro: "Avenida Brasil",
        numero: "456",
        cep: "04567-890",
        cidade: "Rio de Janeiro",
        estado: "RJ"
      }
    },
    {
      id_docaco: 3,
      doador_id: 3,
      receptor_id: 4,
      deschcao: "Feijão carioca",
      quantidade: 8,
      unidade: "KG",
      validade: "2024-08-15",
      endereco_id: 3,
      status: "Finalizada",
      confirmacao_entrega: true,
      confirmacao_recebimento: true,
      data_cadastro: "2024-01-05",
      doador: {
        nome: "Supermercado Preço Bom",
        cnpf: "11.222.333/0001-44",
        telefone: "(31) 3666-6666",
        email: "contato@precobom.com"
      },
      receptor: {
        nome: "Lar dos Idosos",
        telefone: "(31) 3555-5555",
        email: "contato@laridosos.org"
      },
      endereco: {
        logradouro: "Rua das Palmeiras",
        numero: "789",
        cep: "30123-456",
        cidade: "Belo Horizonte",
        estado: "MG"
      }
    }
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      showAlert({
        isError: true,
        topMessage: "Erro!",
        bottomMessage: "O usuário não tem permissão para visualizar esta página."
      });
      router.push("/login");
      return;
    }

    setPerfil(user.perfil);

    // Simular chamada à API
    const fetchDoacao = async () => {
      try {
        setIsLoading(true);
        // Em uma aplicação real:
        // const response = await fetch(`/api/doacoes/${params.id}`);
        // const data = await response.json();
        // setDoacao(data);
        
        // Simulando delay da API
        setTimeout(() => {
          const doacaoEncontrada = mockDoacoes.find(d => d.id_docaco === parseInt(params.id));
          if (doacaoEncontrada) {
            setDoacao(doacaoEncontrada);
          } else {
            showAlert({
              isError: true,
              topMessage: "Erro!",
              bottomMessage: "Doação não encontrada."
            });
          }
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar doação:', error);
        showAlert({
          isError: true,
          topMessage: "Erro!",
          bottomMessage: "Erro ao carregar os dados da doação."
        });
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchDoacao();
    }
  }, [params.id, router, showAlert]);

  const formatarData = (dataString) => {
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
    // Lógica para reservar doação
    showAlert({
      isError: false,
      topMessage: "Sucesso!",
      bottomMessage: "Doação reservada com sucesso."
    });
  };

  const handleConfirmarEntrega = () => {
    // Lógica para confirmar entrega
    showAlert({
      isError: false,
      topMessage: "Sucesso!",
      bottomMessage: "Entrega confirmada com sucesso."
    });
  };

  const handleEntrarContato = () => {
    const contato = perfil === "Doador" ? doacao?.receptor : doacao?.doador;
    if (contato) {
      showAlert({
        isError: false,
        topMessage: "Informações de Contato",
        bottomMessage: `Telefone: ${contato.telefone} | Email: ${contato.email}`
      });
    }
  };

  return isLoading ? (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
      <span className="text-gray-500">Carregando...</span>
    </div>
  ) : !doacao ? (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
      <span className="text-gray-500">Doação não encontrada</span>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center font-['PoppinsRegular'] mb-10">
      <div className="flex flex-col items-center gap-10 w-full">
        
        {/* Título da página */}
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

        {/* Container */}
        <div className="w-full max-w-4xl flex flex-col items-center shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] p-[60px] rounded-md gap-6 bg-white">
          
          {/* Status da Doação */}
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

          {/* Informações Básicas */}
          <TextInput
            value={doacao.deschcao}
            setValue={()=>{}}
            label={"DESCRIÇÃO"}
            disabled
            type="text"
          />

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
            
            {/* Mostra receptor para Doador e doador para Receptor */}
            {perfil === "Doador" && doacao.receptor && (
              <TextInput
                value={doacao.receptor.nome}
                setValue={()=>{}}
                label={"RECEPTOR"}
                disabled
                type="text"
              />
            )}
            
            {perfil === "Receptor" && (
              <TextInput
                value={doacao.doador.nome}
                setValue={()=>{}}
                label={"DOADOR"}
                disabled
                type="text"
              />
            )}
          </div>

          {/* Informações de Contato */}
          {(perfil === "Doador" && doacao.receptor) || (perfil === "Receptor") ? (
            <div className="w-full max-w-[720px]">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                {perfil === "Doador" ? "INFORMAÇÕES DO RECEPTOR" : "INFORMAÇÕES DO DOADOR"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  value={perfil === "Doador" ? doacao.receptor.telefone : doacao.doador.telefone}
                  setValue={()=>{}}
                  label={"TELEFONE"}
                  disabled
                  type="text"
                />
                
                <TextInput
                  value={perfil === "Doador" ? doacao.receptor.email : doacao.doador.email}
                  setValue={()=>{}}
                  label={"E-MAIL"}
                  disabled
                  type="text"
                />
              </div>
            </div>
          ) : null}

          {/* Endereço */}
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

          {/* Confirmações - Mostrar apenas para Admin ou quando relevantes */}
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

          {/* Botões */}
          <div className="flex flex-row justify-between w-full max-w-[720px] pt-[24px]">
            <Botao
              onClick={() => router.back()}
              type="cancel"
              text="VOLTAR"
            />
            
            {/* Botões condicionais baseados no status e perfil */}
            <div className="flex gap-4">
              {perfil === "Receptor" && doacao.status === 'Disponível' && (
                <Botao
                  onClick={handleReservarDoacao}
                  type="normal"
                  text="RESERVAR DOAÇÃO"
                />
              )}
              
              {((perfil === "Doador" && doacao.status === 'Reservada') || 
                (perfil === "Receptor" && doacao.status === 'Reservada')) && (
                <Botao
                  onClick={handleConfirmarEntrega}
                  type="normal"
                  text="CONFIRMAR ENTREGA"
                />
              )}
              
              {doacao.status !== 'Finalizada' && (
                <Botao
                  onClick={handleEntrarContato}
                  type="normal"
                  text="ENTRAR EM CONTATO"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
