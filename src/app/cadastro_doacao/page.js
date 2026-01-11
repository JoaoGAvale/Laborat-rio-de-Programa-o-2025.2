'use client'
import React, { useState } from "react";
import { TextInput } from "../components/TextInput";
import { useAlert } from "../context/AlertContext";
import { useRouter } from "next/navigation";

export default function RegisterDonationPage() {
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [unidade, setUnidade] = useState("");
    const [validade, setValidade] = useState("");
    const { showAlert } = useAlert();
    const router = useRouter();

    const handleSubmit = async () => { 
        if (!descricao || !quantidade || !unidade || !validade) {
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage: "Preencha todos os campos obrigatórios.",
            });
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id_usuario) {
                throw new Error("Sessão expirada. Faça login novamente.");
            }

            const novaDoacao = {
                descricao: descricao,
                quantidade: parseFloat(quantidade),
                unidade: unidade,
                validade: validade,            
                doador_id: user.id_usuario,
                status: "Disponivel"
            };

            const response = await fetch("http://127.0.0.1:5000/doacao/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novaDoacao),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao salvar no servidor.");
            }

            showAlert({
                isError: false,
                topMessage: "Sucesso!",
                bottomMessage: "Doação cadastrada com sucesso.",
            });

            // Limpar formulário
            setDescricao("");
            setQuantidade("");
            setUnidade("");
            setValidade("");

            // Redirecionar
            setTimeout(() => {
                router.push('/acompanhar_doacoes');
            }, 2000);

        } catch (error) {
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage: error.message,
            });
        }
    };

    const handleCancel = () => {
        // Verifica se há dados preenchidos antes de cancelar
        if (descricao || quantidade || unidade || validade) {
            showAlert({
                isError: false,
                topMessage: "Aviso",
                bottomMessage: "Cadastro cancelado. Os dados preenchidos foram descartados.",
            });
        }
        
        // Limpar formulário
        setDescricao("");
        setQuantidade("");
        setUnidade("");
        setValidade("");

        // Redirecionar para a página inicial
        router.back();
    };

    const isFormValid = descricao && quantidade && unidade && validade;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center font-['PoppinsRegular']">
                    CADASTRAR DOAÇÃO
                </h1>
                
                <div className="space-y-6">
                    {/* Descrição */}
                    <TextInput
                        label="Descrição do Item *"
                        placeholder="Ex: Arroz, Feijão, Leite, etc."
                        value={descricao}
                        setValue={setDescricao}
                        className="mb-4"
                    />

                    {/* Quantidade e Unidade em linha */}
                    <div className="flex gap-4 max-w-[720px]">
                        <div className="flex-1">
                            <TextInput
                                label="Quantidade *"
                                placeholder="Ex: 10"
                                value={quantidade}
                                setValue={setQuantidade}
                                type="number"
                            />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                label="Unidade *"
                                placeholder="Ex: kg, litros, unidades"
                                value={unidade}
                                setValue={setUnidade}
                            />
                        </div>
                    </div>

                    {/* Validade */}
                    <TextInput
                        label="Data de Validade *"
                        placeholder="DD/MM/AAAA"
                        value={validade}
                        setValue={setValidade}
                        type="date"
                    />

                    {/* Botões */}
                    <div className="flex gap-4 justify-center mt-8">
                        <button
                            className="bg-white px-5 border-2 border-green-600 rounded-full w-[200px] h-[50px] text-green-600 cursor-pointer hover:bg-green-50 transition-colors"
                            onClick={handleCancel}
                        >
                            CANCELAR
                        </button>
                        <button
                            className={`bg-green-400 px-5 border-2 border-green-600 rounded-full w-[200px] h-[50px] text-white transition-colors ${
                                !isFormValid 
                                    ? "opacity-50 cursor-not-allowed" 
                                    : "cursor-pointer hover:bg-green-500"
                            }`}
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                        >
                            CADASTRAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}