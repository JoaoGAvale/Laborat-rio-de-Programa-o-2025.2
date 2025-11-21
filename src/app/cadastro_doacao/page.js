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

    const handleSubmit = () => {
        // Validação básica
        if (!descricao || !quantidade || !unidade || !validade) {
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage: "Erro ao cadastrar doação. Preencha todos os campos obrigatórios.",
            });
            return;
        }

        // Validação de quantidade
        if (isNaN(quantidade) || parseInt(quantidade) <= 0) {
            showAlert({
                isError: true,
                topMessage: "Erro!",
                bottomMessage: "Erro ao cadastrar doação. A quantidade deve ser um número positivo.",
            });
            return;
        }

        // Aqui você implementaria a lógica para salvar a doação
        const doacao = {
            descricao,
            quantidade: parseInt(quantidade),
            unidade,
            validade
        };

        console.log("Doação cadastrada:", doacao);
        
        // Mostrar alerta de sucesso
        showAlert({
            isError: false,
            topMessage: "Sucesso!",
            bottomMessage: "Doação cadastrada com sucesso.",
        });
        
        // Limpar formulário após cadastro
        setDescricao("");
        setQuantidade("");
        setUnidade("");
        setValidade("");

        // Redirecionar para a página inicial após sucesso
        setTimeout(() => {
            router.push('/inicio');
        }, 2000);
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
        router.push('/inicio');
    };

    const isFormValid = descricao && quantidade && unidade && validade;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Cadastrar Doação
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